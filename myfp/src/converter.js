// ─── База шрифтов ────────────────────────────────────────────────────────
import { UAParser } from 'https://cdn.jsdelivr.net/npm/ua-parser-js@2.0.10/+esm';
import { PrecomputedFontData } from './fontid.js';

// ─── Шум ────────────────────────────────────────────────────────────────────
// Длины измерены по эталону: canvas/webgl — по 230 (128 случайных + общий
// хвост 102, в эталоне хвосты идентичны), rectangles — 816, audio — 328,
// battery — 142.
export const randomHex = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');

export const genNoise = () => {
  const tail = randomHex(102);
  return {
    canvas: randomHex(128) + tail,
    webgl: randomHex(128) + tail,
    rectangles: randomHex(816),
    audio: randomHex(328),
    battery: randomHex(142),
  };
};

// ─── Константы ──────────────────────────────────────────────────────────────
export const HEADERS = [
  'Host', 'X-Request-Id', 'X-Real-Ip', 'X-Forwarded-For', 'X-Forwarded-Host',
  'X-Forwarded-Port', 'X-Forwarded-Proto', 'X-Forwarded-Scheme', 'X-Scheme',
  'Content-Length', 'Pragma', 'Cache-Control', 'Authorization', 'Sec-Ch-Ua-Platform',
  'If-Range', 'X-Http-Method-Override', 'Sec-Ch-Ua', 'If-Match', 'Sec-Ch-Ua-Mobile',
  'Max-Forwards', 'X-Requested-With', 'Content-Type', 'Accept-Datetime', 'If-None-Match',
  'X-Csrf-Token', 'Upgrade-Insecure-Requests', 'User-Agent', 'If-Modified-Since', 'Range',
  'If-Unmodified-Since', 'Accept', 'Origin', 'Sec-Fetch-Site', 'Sec-Fetch-Mode',
  'Sec-Fetch-Dest', 'Referer', 'Accept-Encoding', 'Accept-Language', 'Priority',
];

export const NATIVE_CODE = 'function Object() { [native code] }';

export const TOUCH_NOMS = [39, 40, 44, 51, 54, 57, 58, 61, 73, 81, 82, 86, 88, 102, 31, 20, 35];
export const genTouchRadius = () => ({
  touch_radius_nom: TOUCH_NOMS[Math.floor(Math.random() * TOUCH_NOMS.length)],
  touch_radius_denom: 192,
});

// ─── tags ───────────────────────────────────────────────────────────────────
// Правила выведены из 23 пар tags↔ua базы BAS:
//  • Windows — 4 тега, версия = major(os.version): NT 6.3 → "8.1" → "Windows 8",
//    NT 10.0 → "Windows 10" (в т.ч. для Win11 — тега "Windows 11" в базе нет)
//  • Mac / Android / iPhone / Linux — 3 тега, без версии ОС
//  • Ubuntu → Linux
//  • нишевые браузеры BAS не различал: MiuiBrowser-ua → "Chrome",
//    UCBrowser-ua → "Safari" — эмулируется фолбэком по токенам UA

export const OS_FAMILY_TAGS = {
  Windows: 'Microsoft Windows',
  'Mac OS': 'Apple Mac',
  macOS: 'Apple Mac', // новое имя в актуальных версиях ua-parser-js
  Android: 'Android',
  Linux: 'Linux',
  Ubuntu: 'Linux',
  Fedora: 'Linux',
  Debian: 'Linux',
  Gentoo: 'Linux',
};

export const BROWSER_TAGS = {
  Chrome: 'Chrome',
  'Mobile Chrome': 'Chrome',
  Chromium: 'Chrome',
  Edge: 'Edge',
  'Mobile Edge': 'Edge',
  Safari: 'Safari',
  'Mobile Safari': 'Safari',
  Firefox: 'Firefox',
  'Mobile Firefox': 'Firefox',
  'Yandex Browser': 'YaBrowser',
  Yandex: 'YaBrowser',
};

// ua-parser знает нишевые браузеры, которых не различал BAS, — для имён вне
// таблицы выбираем тег по токенам UA. Порядок важен: YaBrowser/Edge UA
// содержат и "Chrome/", поэтому проверяются раньше.
export function browserTag(ua, name) {
  if (name in BROWSER_TAGS) return BROWSER_TAGS[name];
  if (/yabrowser/i.test(ua)) return 'YaBrowser';
  if (/edg(?:e|a|ios)\//i.test(ua)) return 'Edge';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/chrome|chromium|crios/i.test(ua)) return 'Chrome';
  if (/safari/i.test(ua)) return 'Safari';
  return name || 'Chrome';
}

export function buildTags(ua) {
  const parserInstance = new UAParser(ua);
  const result = parserInstance.getResult();
  const os = result.os || {};
  const browser = result.browser || {};
  const device = result.device || {};

  const family =
    device.model === 'iPad' ? 'iPad'
      : device.model === 'iPhone' || os.name === 'iOS' ? 'iPhone'
        : OS_FAMILY_TAGS[os.name] ?? os.name ?? 'Microsoft Windows';

  const type = device.type === 'mobile' || device.type === 'tablet' ? 'Mobile' : 'Desktop';

  const tags = [family, browserTag(ua, browser.name), type];
  if (os.name === 'Windows' && os.version) {
    tags.push(`Windows ${parseInt(os.version, 10)}`);
  }

  return tags;
}

// ─── lang ───────────────────────────────────────────────────────────────────
// "ru-RU,ru,en-US,en" → "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
export const toAcceptLanguage = (languages) =>
  (languages || [])
    .filter(Boolean)
    .map((lang, i) => (i === 0 ? lang : `${lang};q=${(1 - i * 0.1).toFixed(1)}`))
    .join(',');

// ─── Хелперы для dat ────────────────────────────────────────────────────────
export const SCREEN_KEY = 'window_screen && window_innerWidth && window_innerHeight';
export const OUTER_KEY = 'window_outerWidth && window_outerHeight';
export const PLUGINS_KEY = 'window_navigator_plugins && window_navigator_mimeTypes';

export const v = (node) => node?.value;

export const raw = (node) =>
  node ? ('value' in node ? node.value : typeof node.toString === 'string' ? node.toString : undefined) : undefined;

export const numericKeys = (obj) => Object.keys(obj || {}).filter((key) => /^\d+$/.test(key)).sort();

// ─── plugins / mimes ────────────────────────────────────────────────────────
// Порядок — по индексам PluginArray/MimeTypeArray из dat (порядок эталона),
// детали — из refs.
export function buildPluginsAndMimes({ dat, refs }) {
  if (!dat?.[PLUGINS_KEY] || !refs) {
    return { plugins: [], mimes: [] };
  }
  const pluginsArr = dat[PLUGINS_KEY].window_navigator_plugins?.value || {};
  const mimesArr = dat[PLUGINS_KEY].window_navigator_mimeTypes?.value || {};

  const plugins = numericKeys(pluginsArr).map((i) => {
    const ref = pluginsArr[i].ref;
    const plugin = refs[ref]?.value || {};
    return {
      ref,
      description: v(plugin.description) || '',
      filename: v(plugin.filename) || '',
      name: v(plugin.name) || '',
      mimes: numericKeys(plugin).map((j) => plugin[j].ref),
    };
  });

  const mimes = numericKeys(mimesArr).map((i) => {
    const ref = mimesArr[i].ref;
    const mime = refs[ref]?.value || {};
    return {
      ref,
      description: v(mime.description) || '',
      suffixes: v(mime.suffixes) || '',
      type: v(mime.type) || '',
      plugin: mime.enabledPlugin ? mime.enabledPlugin.ref : null,
    };
  });

  return { plugins, mimes };
}

// ─── font_data2 ─────────────────────────────────────────────────────────────
// Механика fontid (BAS): среди записей базы с совпадающим именем выбирается
// запись с минимальной дистанцией измерений; значение = aliases + hash через
// запятую; нет одноимённой записи → "". Сверено с эталоном — полное совпадение.

export const CHARACTER_LIST_V1 = [
  39, 45, 47, 67, 69, 160, 168, 169, 175, 181, 184, 236, 261, 307, 357, 416, 480, 538,
  567, 618, 906, 966, 967, 1160, 1306, 1316, 1376, 1519, 1540, 1542, 1568, 2209, 2372,
  2556, 2678, 2800, 3062, 3065, 3171, 3191, 3298, 3396, 3400, 3558, 3806, 3900, 4159,
  4183, 4243, 4245, 4256, 5075, 5109, 6170, 6336, 6741, 7312, 7343, 7350, 7399, 7587,
  7743, 7838, 8208, 8214, 8222, 8226, 8242, 8244, 8252, 8260, 8271, 8279, 8308, 8310,
  8361, 8376, 8377, 8378, 8380, 8382, 8383, 8384, 8528, 8530, 8533, 8725, 8758, 8900,
  9001, 9484, 9676, 9756, 9786, 9792, 9823, 9895, 10220, 11311, 11622, 11631, 11904,
  12316, 12320, 13055, 13255, 13270, 16090, 32176, 40892, 40903, 42656, 43043, 43056,
  43190, 43251, 43454, 43496, 43777, 43968, 64256, 64260, 64289, 65010, 65012, 65081,
  65283, 69920, 70403, 71698, 92160, 94021, 127279, 127387, 127462, 127514, 128725,
  128733, 128759, 131428, 174566, 178360, 178361, 185668, 198441,
];

const readInt32 = (data) => ({
  data: data.slice(6),
  value: parseInt(data.substring(0, 6), 36),
});

const readFloat = (data) => ({
  data: data.slice(6),
  value: parseInt(data.substring(0, 6), 36) / 100000,
});

// "версия" + N×("код глифа" + "ширина") → Map(код → ширина)
export function unpackFontData(packed) {
  if (!packed || typeof packed !== 'string') return { version: 0, widths: new Map() };
  const { data, value: version } = readInt32(packed);
  const widths = new Map();
  let rest = data;
  while (rest && rest.length > 0) {
    const code = readInt32(rest);
    rest = code.data;
    if (!rest || rest.length <= 0) break;
    const width = readFloat(rest);
    rest = width.data;
    widths.set(code.value, width.value);
  }
  return { version, widths };
}

const widthsCache = new Map();
export const getWidths = (packed) => {
  if (!widthsCache.has(packed)) widthsCache.set(packed, unpackFontData(packed).widths);
  return widthsCache.get(packed);
};

export function fontDistance(source, dest) {
  if (!source || !dest) return Infinity;
  const src = getWidths(source);
  const dst = getWidths(dest);
  let distance = 0;
  for (const glyph of CHARACTER_LIST_V1) {
    const s = src.get(glyph);
    const d = dst.get(glyph);
    if (s !== undefined && d !== undefined) distance += Math.abs(s - d);
    else if (s !== undefined || d !== undefined) distance += 72;
  }
  return distance / CHARACTER_LIST_V1.length;
}

const fontDatabase = typeof window !== 'undefined' && window.PrecomputedFontData?.length
  ? window.PrecomputedFontData
  : PrecomputedFontData;

const fontsByName = new Map();
for (const font of fontDatabase) {
  if (font && font.name) {
    if (!fontsByName.has(font.name)) fontsByName.set(font.name, []);
    fontsByName.get(font.name).push(font);
  }
}

export const buildFontData2 = (fontData) =>
  Object.fromEntries(
    Object.keys(fontData || {}).sort().map((name) => {
      let best = null;
      let bestDistance = Infinity;

      for (const font of fontsByName.get(name) ?? []) {
        const distance = fontDistance(fontData[name], font.measurments);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = font;
        }
      }

      return [name, best ? [...(best.aliases ?? []), best.hash].join(',') : ''];
    }),
  );

// ─── attr ───────────────────────────────────────────────────────────────────
export function buildAttr({ dat, pixelRatio }) {
  const nav = dat.window_navigator.window_navigator.value;
  const screen = dat[SCREEN_KEY].window_screen.value;
  const outer = dat[OUTER_KEY];

  return {
    'navigator.vendorSub': v(nav.vendorSub),
    'navigator.productSub': v(nav.productSub),
    'navigator.vendor': v(nav.vendor),
    'navigator.appCodeName': v(nav.appCodeName),
    'navigator.appName': v(nav.appName),
    'navigator.appVersion': v(nav.appVersion),
    'navigator.platform': v(nav.platform),
    'navigator.product': v(nav.product),
    'navigator.pdfViewerEnabled': v(nav.pdfViewerEnabled) ? 1 : 0,
    'navigator.userAgent': v(dat.window_navigator_userAgent.window_navigator_userAgent),
    'screen.availHeight': v(screen.availHeight),
    'screen.availWidth': v(screen.availWidth),
    'screen.width': v(screen.width),
    'screen.height': v(screen.height),
    'screen.colorDepth': v(screen.colorDepth),
    'screen.pixelDepth': v(screen.pixelDepth),
    'screen.availLeft': v(screen.availLeft),
    'screen.availTop': v(screen.availTop),
    'outerHeight': v(outer.window_outerHeight),
    'outerWidth': v(outer.window_outerWidth),
    'hardwareConcurrency': v(
      dat.window_navigator_hardwareConcurrency.window_navigator_hardwareConcurrency,
    ),
    'maxTouchPoints': v(nav.maxTouchPoints),
    'deviceMemory': v(nav.deviceMemory),
    'window.devicePixelRatio': pixelRatio.value,
  };
}

// ─── Конвертация ────────────────────────────────────────────────────────────
export const buildPerfectCanvas = (arr) =>
  Object.fromEntries((arr || []).filter((i) => i?.id && i?.result).map((i) => [i.id, i.result]));

export function convert(intercept) {
  if (!intercept || typeof intercept !== 'object') {
    throw new Error('Входные данные должны быть объектом');
  }
  const { dat } = intercept;
  if (!dat) throw new Error("Отсутствует обязательное поле: 'dat'");

  const nav = dat.window_navigator?.window_navigator?.value;
  if (!nav) throw new Error("Отсутствует обязательное поле: 'window_navigator'");

  const screenDat = dat[SCREEN_KEY];
  if (!screenDat) throw new Error(`Отсутствует обязательное поле: '${SCREEN_KEY}'`);

  const screen = screenDat.window_screen?.value;
  if (!screen) throw new Error("Отсутствует обязательное поле: 'window_screen'");

  const connection = nav.connection?.value;
  if (!connection) throw new Error("Отсутствует обязательное поле: 'connection'");

  const rawUa = dat.window_navigator_userAgent?.window_navigator_userAgent || nav.userAgent;
  if (!rawUa) throw new Error("Отсутствует обязательное поле: 'userAgent'");

  const ua = v(rawUa);
  const { plugins, mimes } = buildPluginsAndMimes(intercept);
  const languages = raw(nav.languages)?.split(',') ?? [raw(nav.language)];


  return {
    valid: true,
    plugins,
    mimes,
    ua,
    tags: buildTags(ua),
    dnt: intercept.dnt,
    width: v(screenDat.window_innerWidth),
    height: v(screenDat.window_innerHeight),
    ...genNoise(),
    has_battery_api: intercept.hasBatteryApi,
    has_battery_device: intercept.hasBatteryDevice,
    webgl_properties: intercept.webgl,
    audio_properties: intercept.audio,
    fonts: intercept.fonts,
    headers: HEADERS,
    lang: toAcceptLanguage(languages),
    native_code: NATIVE_CODE,
    css: intercept.css,
    font_data2: buildFontData2(intercept.font_data),
    media: intercept.media,
    speech: intercept.speech,
    bluetooth: intercept.bluetooth,
    features: intercept.features,
    heap: intercept.heap,
    storage: intercept.storage,
    codecs: intercept.codecs,
    keyboard: intercept.keyboard2 ?? intercept.keyboard ?? [],
    webgpu: intercept.webgpu2,
    useragentdata: intercept.useragentdata,
    webrtc_codecs: intercept.webrtc_codecs,
    systemcolors: intercept.systemcolors,
    systemfonts: intercept.systemfonts,
    customfeatures: intercept.customfeatures,
    hls: intercept.hls,
    ChromeApp: intercept.chrome?.app ? 'Enable' : 'Disable',
    ChromeRuntime: intercept.chrome?.runtime ? 'Enable' : 'Disable',
    connection: {
      effectiveType: v(connection.effectiveType),
      rtt: v(connection.rtt),
      downlink: v(connection.downlink),
      saveData: v(connection.saveData),
    },
    attr: buildAttr(intercept),
    orientation: {
      angle: v(screen.orientation?.value?.angle),
      type: v(screen.orientation?.value?.type),
    },
    doNotTrack: v(nav.doNotTrack) ?? null,
    ...genTouchRadius(),
    perfectcanvas: buildPerfectCanvas(intercept.canvas_precomputed),
  };
}

export const convertInterceptToServerFP = convert;
