import { convert } from './src/converter.js';
import { SAMPLE_INTERCEPT } from './src/sample.js';

// SVG Icons
const icons = {
  arrowRightLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-400 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400 shrink-0 animate-spin"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  capture: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`
};

// Global collecting timer state
let collectionTimerInterval = null;
let collectionStartTime = null;

// Application State
let state = {
  inputText: '',
  outputText: '',
  perfectCanvasText: '',
  fetchAllCanvases: false,
  isFetchingCanvases: false,
  parsedOutput: null,
  conversionTime: null,
  status: {
    type: 'info',
    message: 'Нажмите «Снять с браузера», выберите «Все канвасы» (fetch Bablosoft) или загрузите JSON отпечатка',
    elapsed: 0
  },
  copied: false
};

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Global hook for clientsafe intercept (direct in-browser live capture)
window.useFp = function (fpRaw) {
  stopCollectingTimer();
  try {
    const rawData = typeof fpRaw === 'string' ? JSON.parse(fpRaw) : fpRaw;
    state.inputText = JSON.stringify(rawData, null, 2);
    convertNow();
  } catch (err) {
    state.status = {
      type: 'error',
      message: 'Ошибка разбора перехваченного отпечатка: ' + err.message
    };
    renderApp();
  }
};

// Intercept XHR send for live clientsafe.js capture
if (typeof XMLHttpRequest !== 'undefined') {
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    if (typeof body === 'string' && (body.includes('"dat"') || body.includes('window_navigator'))) {
      window.useFp(body);
    }
    // return originalSend.apply(this, arguments); // чтобы не отправлять отпечаток никуда.
  };
}

function startCollectingTimer() {
  stopCollectingTimer();
  collectionStartTime = Date.now();
  state.inputText = '';
  state.outputText = '';
  state.parsedOutput = null;
  state.conversionTime = null;
  state.copied = false;
  state.status = {
    type: 'collecting',
    message: 'Начат сбор отпечатка браузера...',
    elapsed: 0
  };
  renderApp();
  const WAIT_LIMIT = 60 *1000
  collectionTimerInterval = setInterval(() => {
    const elapsedSec = ((Date.now() - collectionStartTime) / 1000).toFixed(1);
    if (Date.now() - collectionStartTime >= WAIT_LIMIT) {
      stopCollectingTimer();
      state.status = {
        type: 'error',
        message: 'Ошибка: Таймаут сбора отпечатка (60 с). clientsafe.js не вернул данные'
      };
      renderApp();
      return;
    }

    state.status = {
      type: 'collecting',
      message: `Сбор отпечатка браузера... (${elapsedSec} с)`,
      elapsed: elapsedSec
    };

    // Update status element in place to avoid full rerender/scroll glitch
    const statusBox = document.getElementById('status-container');
    if (statusBox) {
      statusBox.innerHTML = renderStatusContent();
    }
  }, 200);
}

function stopCollectingTimer() {
  if (collectionTimerInterval) {
    clearInterval(collectionTimerInterval);
    collectionTimerInterval = null;
  }
}

function convertNow() {
  if (!state.inputText.trim()) {
    state.status = { type: 'error', message: 'Введите или загрузите JSON перехваченного отпечатка' };
    state.outputText = '';
    state.parsedOutput = null;
    renderApp();
    return;
  }

  const startTime = performance.now();
  try {
    const rawData = JSON.parse(state.inputText);
    const converted = convert(rawData);
    const endTime = performance.now();

    state.conversionTime = (endTime - startTime).toFixed(2);
    state.parsedOutput = converted;
    state.outputText = JSON.stringify(converted, null, 2);
    state.status = {
      type: 'success',
      message: `Успешно сконвертировано за ${state.conversionTime} мс (${Object.keys(converted).length} полей)`
    };
  } catch (err) {
    state.status = {
      type: 'error',
      message: err.message || 'Ошибка валидации JSON отпечатка'
    };
    state.outputText = '';
    state.parsedOutput = null;
  }

  renderApp();
}

async function captureCurrentBrowser() {
  if (typeof window.ProcessFingerprintInternal !== 'function') {
    state.status = {
      type: 'error',
      message: 'Библиотека clientsafe.js не загружена или заблокирована браузером'
    };
    renderApp();
    return;
  }

  // Полный сброс предыдущих результатов конвертации
  stopCollectingTimer();
  state.inputText = '';
  state.outputText = '';
  state.parsedOutput = null;
  state.conversionTime = null;
  state.copied = false;

  let perfcanvasParam = null;

  // Если отмечена галка "все канвасы" -> запрашиваем с https://fingerprints.bablosoft.com/perfectcanvas
  if (state.fetchAllCanvases) {
    state.status = {
      type: 'collecting',
      message: 'Запрос базы PerfectCanvas с fingerprints.bablosoft.com/perfectcanvas...',
      elapsed: 0
    };
    renderApp();

    try {
      const resp = await fetch('https://fingerprints.bablosoft.com/perfectcanvas', {
        headers: { 'Accept': 'application/json' }
      });
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
      }
      const fetchedJson = await resp.json();
      state.perfectCanvasText = JSON.stringify(fetchedJson, null, 2);
      perfcanvasParam = fetchedJson;
    } catch (fetchErr) {
      console.warn('Не удалось загрузить perfectcanvas с сервера:', fetchErr);
      state.status = {
        type: 'error',
        message: 'Ошибка загрузки PerfectCanvas с bablosoft.com: ' + fetchErr.message + ' (используется null)'
      };
      renderApp();
      perfcanvasParam = null;
    }
  } else {
    // Проверяем perfectcanvas из текстового поля:
    // Если пусто или некорректно -> null
    // Если валидный JSON и format: { success: true, result: [...] } с непустым result -> передаем объект
    const trimmed = (state.perfectCanvasText || '').trim();
    if (trimmed) {
      try {
        const parsed = JSON.parse(trimmed);
        if (
          parsed !== null &&
          typeof parsed === 'object' &&
          parsed.success &&
          Array.isArray(parsed.result) &&
          parsed.result.length !== 0
        ) {
          perfcanvasParam = parsed;
        } else {
          perfcanvasParam = null;
        }
      } catch (err) {
        perfcanvasParam = null;
      }
    }
  }

  try {
    localStorage.clear();
    startCollectingTimer();
    window.ProcessFingerprintInternal(false, null, perfcanvasParam);
  } catch (err) {
    stopCollectingTimer();
    state.status = {
      type: 'error',
      message: 'Ошибка вызова ProcessFingerprintInternal: ' + err.message
    };
    renderApp();
  }
}

function renderStatusContent() {
  const isSuccess = state.status.type === 'success';
  const isCollecting = state.status.type === 'collecting';
  const isError = state.status.type === 'error';
  const isInfo = state.status.type === 'info' || state.status.type === 'idle';

  let borderClass = 'bg-slate-900/90 border-slate-800 text-slate-300';
  let icon = icons.info;

  if (isSuccess) {
    borderClass = 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300';
    icon = icons.checkCircle;
  } else if (isCollecting) {
    borderClass = 'bg-amber-950/40 border-amber-600/70 text-amber-300 animate-pulse';
    icon = icons.clock;
  } else if (isError) {
    borderClass = 'bg-rose-950/40 border-rose-800/80 text-rose-300';
    icon = icons.alertCircle;
  } else if (isInfo) {
    borderClass = 'bg-indigo-950/30 border-indigo-900/60 text-slate-300';
    icon = icons.info;
  }

  return `
    <div class="status-bar ${borderClass}">
      <div class="flex items-center gap-2">
        ${icon}
        <span class="font-medium">${state.status.message || 'Готов к работе'}</span>
      </div>
      ${
        state.parsedOutput
          ? `<div class="flex items-center gap-1.5 flex-wrap">
              <span class="badge-chip bg-emerald-900/40 text-emerald-300 border-emerald-700/60">
                ${state.parsedOutput.tags?.[0] || 'Unknown OS'}
              </span>
              <span class="badge-chip bg-indigo-900/40 text-indigo-300 border-indigo-700/60">
                ${state.parsedOutput.tags?.[1] || 'Browser'}
              </span>
              <span class="badge-chip bg-slate-800 text-slate-300 border-slate-700">
                ${state.parsedOutput.tags?.[2] || 'Desktop'}
              </span>
              ${
                state.parsedOutput.tags?.[3]
                  ? `<span class="badge-chip bg-slate-800 text-slate-300 border-slate-700">
                      ${state.parsedOutput.tags[3]}
                    </span>`
                  : ''
              }
            </div>`
          : ''
      }
    </div>
  `;
}

function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const inputSize = new Blob([state.inputText]).size;
  const outputSize = state.outputText ? new Blob([state.outputText]).size : 0;
  const inputLines = state.inputText ? state.inputText.split('\n').length : 0;
  const outputLines = state.outputText ? state.outputText.split('\n').length : 0;

  root.innerHTML = `
    <div class="app-layout">
      <!-- Main Content Container -->
      <main class="main-container">
        <!-- Header Card -->
        <header class="header-card">
          <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div class="h-8 w-8 flex items-center justify-center bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 rounded-lg shrink-0">
              ${icons.arrowRightLeft}
            </div>
            <div class="flex flex-col justify-center min-w-0">
              <h1 class="font-bold text-sm sm:text-base text-slate-100 tracking-tight whitespace-nowrap leading-tight">
                Bablosoft FP Convert
              </h1>
              <div class="text-[11px] sm:text-xs font-mono text-indigo-300 leading-tight tracking-tight">
                clientsafe.js → server
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button id="btn-capture" class="btn-header-outline" title="Снять отпечаток с текущего браузера вживую через clientsafe.js">
              ${icons.capture}
              <span class="hidden sm:inline">Снять с браузера</span>
            </button>
            <button id="btn-convert-top" class="btn-header-primary" title="Запустить конвертацию отпечатка">
              ${icons.play}
              <span class="hidden sm:inline">Конвертировать</span>
            </button>
          </div>
        </header>

        <!-- Status Notification Container (Always Visible) -->
        <div id="status-container">
          ${renderStatusContent()}
        </div>

        <!-- Wide perfectcanvas Field with Resizable Textarea & All Canvases Checkbox -->
        <div class="perfect-canvas-box">
          <div class="flex items-center justify-between gap-2">
            <label for="perfectcanvas-input" class="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
              <span class="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
              PERFECTCANVAS
              <span class="text-[11px] font-normal text-slate-400 lowercase font-mono hidden md:inline">(JSON precomputed canvas)</span>
            </label>

            <div class="flex items-center gap-2.5">
              <span class="text-[11px] text-slate-500 hidden md:inline">
                По умолчанию: <code class="text-indigo-300">null</code>
              </span>
              <label class="flex items-center gap-1.5 cursor-pointer bg-slate-950/80 border border-slate-800 hover:border-slate-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium text-slate-200 transition select-none">
                <input
                  type="checkbox"
                  id="chk-fetch-all-canvases"
                  class="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer w-4 h-4 accent-indigo-600"
                  ${state.fetchAllCanvases ? 'checked' : ''}
                />
                <span class="text-xs">Все канвасы</span>
              </label>
            </div>
          </div>
          
          <textarea
            id="perfectcanvas-input"
            rows="1"
            class="w-full bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1 font-mono text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 transition resize-y min-h-[28px] h-[28px] max-h-[220px]"
            placeholder='Оставьте пустым для null, или введите {"success": true, "message": "", "result": [...]}'
            spellcheck="false"
          >${escapeHtml(state.perfectCanvasText)}</textarea>
        </div>

        <!-- Editors Grid -->
        <div class="editor-grid">
          <!-- Left: Input Intercept JSON -->
          <div class="editor-card" id="drop-zone">
            <div class="editor-header">
              <div class="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
                <span class="card-title shrink-0">
                  <span class="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0"></span>
                  <span>Исходный<span class="editor-title-suffix"> отпечаток</span></span>
                </span>
                ${
                  state.inputText
                    ? `<span class="editor-header-extra text-xs text-slate-400 font-mono tracking-tight items-center gap-1.5 overflow-hidden">
                         <span class="text-slate-600 select-none">·</span>
                         <span class="truncate">${formatBytes(inputSize)} · ${inputLines} строк</span>
                       </span>`
                    : `<span class="editor-header-extra text-[11px] text-slate-500 italic items-center gap-1.5 overflow-hidden">
                         <span class="text-slate-600 select-none">·</span>
                         <span class="truncate">Ожидание ввода / захвата</span>
                       </span>`
                }
              </div>

              <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <input type="file" id="file-input" accept=".json" class="hidden" />
                <button id="btn-upload" class="btn-secondary" title="Загрузить JSON файл">
                  ${icons.upload}
                  <span>Файл</span>
                </button>
                <button id="btn-sample" class="btn-secondary" title="Загрузить тестовый образец">
                  ${icons.sparkles}
                  <span>Образец</span>
                </button>
                <button id="btn-clear" class="btn-ghost" title="Очистить поле">
                  ${icons.trash}
                </button>
              </div>
            </div>

            <textarea
              id="input-editor"
              class="code-area"
              placeholder="Вставьте JSON перехваченного отпечатка clientsafe.js, загрузите файл или нажмите «Снять с браузера»..."
              spellcheck="false"
            >${escapeHtml(state.inputText)}</textarea>
          </div>

          <!-- Right: Output fp_server JSON -->
          <div class="editor-card">
            <div class="editor-header">
              <div class="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
                <span class="card-title shrink-0">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0"></span>
                  <span>Серверный<span class="editor-title-suffix"> отпечаток</span></span>
                </span>
                ${
                  state.outputText
                    ? `<span class="editor-header-extra text-xs text-slate-400 font-mono tracking-tight items-center gap-1.5 overflow-hidden">
                         <span class="text-slate-600 select-none">·</span>
                         <span class="truncate">${formatBytes(outputSize)} · ${outputLines} строк</span>
                       </span>`
                    : `<span class="editor-header-extra text-[11px] text-slate-500 italic items-center gap-1.5 overflow-hidden">
                         <span class="text-slate-600 select-none">·</span>
                         <span class="truncate">Ожидание конвертации</span>
                       </span>`
                }
              </div>

              <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  id="btn-copy"
                  class="btn-secondary ${!state.outputText ? 'opacity-50 pointer-events-none' : ''}"
                  title="Копировать JSON в буфер обмена"
                >
                  ${state.copied ? icons.check : icons.copy}
                  <span>${state.copied ? 'Скопировано' : 'Копировать'}</span>
                </button>
                <button
                  id="btn-download"
                  class="btn-primary ${!state.outputText ? 'opacity-50 pointer-events-none' : ''}"
                  title="Скачать fp_server.json"
                >
                  ${icons.download}
                  <span>Скачать</span>
                </button>
              </div>
            </div>

            <textarea
              id="FP"
              class="code-area"
              readonly
              placeholder="Результат конвертации появится здесь после нажатия кнопки «Конвертировать»..."
              spellcheck="false"
            >${escapeHtml(state.outputText)}</textarea>
          </div>
        </div>
      </main>
    </div>
  `;

  attachEventListeners();
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function attachEventListeners() {
  const inputEditor = document.getElementById('input-editor');
  const perfectCanvasInput = document.getElementById('perfectcanvas-input');
  const chkFetchAllCanvases = document.getElementById('chk-fetch-all-canvases');
  const btnConvertTop = document.getElementById('btn-convert-top');
  const btnCapture = document.getElementById('btn-capture');
  const btnSample = document.getElementById('btn-sample');
  const btnClear = document.getElementById('btn-clear');
  const btnUpload = document.getElementById('btn-upload');
  const fileInput = document.getElementById('file-input');
  const btnCopy = document.getElementById('btn-copy');
  const btnDownload = document.getElementById('btn-download');
  const dropZone = document.getElementById('drop-zone');

  if (inputEditor) {
    inputEditor.addEventListener('input', (e) => {
      state.inputText = e.target.value;
    });
  }

  if (perfectCanvasInput) {
    perfectCanvasInput.addEventListener('input', (e) => {
      state.perfectCanvasText = e.target.value;
    });
  }

  if (chkFetchAllCanvases) {
    chkFetchAllCanvases.addEventListener('change', (e) => {
      state.fetchAllCanvases = e.target.checked;
    });
  }

  if (btnConvertTop) {
    btnConvertTop.addEventListener('click', () => {
      convertNow();
    });
  }

  if (btnCapture) {
    btnCapture.addEventListener('click', () => {
      captureCurrentBrowser();
    });
  }

  if (btnSample) {
    btnSample.addEventListener('click', () => {
      stopCollectingTimer();
      state.inputText = JSON.stringify(SAMPLE_INTERCEPT, null, 2);
      state.outputText = '';
      state.parsedOutput = null;
      state.conversionTime = null;
      state.copied = false;
      state.status = {
        type: 'info',
        message: 'Загружен тестовый образец. Нажмите «Конвертировать» или проверьте параметры'
      };
      renderApp();
      convertNow();
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      stopCollectingTimer();
      state.inputText = '';
      state.outputText = '';
      state.parsedOutput = null;
      state.conversionTime = null;
      state.copied = false;
      const inputEl = document.getElementById('input-editor');
      if (inputEl) inputEl.value = '';
      const outputEl = document.getElementById('FP');
      if (outputEl) outputEl.value = '';
      state.status = {
        type: 'info',
        message: 'Поля очищены. Нажмите «Снять с браузера» или загрузите JSON отпечатка'
      };
      renderApp();
    });
  }

  if (btnUpload && fileInput) {
    btnUpload.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          state.inputText = ev.target?.result || '';
          state.status = { type: 'info', message: `Файл ${file.name} загружен` };
          renderApp();
          convertNow();
        };
        reader.readAsText(file);
      }
    });
  }

  // Drag & Drop
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-indigo-500');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-indigo-500');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-indigo-500');
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          state.inputText = ev.target?.result || '';
          state.status = { type: 'info', message: `Файл ${file.name} загружен` };
          renderApp();
          convertNow();
        };
        reader.readAsText(file);
      }
    });
  }

  if (btnCopy && state.outputText) {
    btnCopy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(state.outputText);
        state.copied = true;
        renderApp();
        setTimeout(() => {
          state.copied = false;
          renderApp();
        }, 2000);
      } catch {
        const out = document.getElementById('FP');
        if (out) {
          out.select();
          document.execCommand('copy');
          state.copied = true;
          renderApp();
          setTimeout(() => {
            state.copied = false;
            renderApp();
          }, 2000);
        }
      }
    });
  }

  if (btnDownload && state.outputText) {
    btnDownload.addEventListener('click', () => {
      const blob = new Blob([state.outputText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fp_server_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

// Initial render
window.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
