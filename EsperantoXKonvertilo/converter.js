/**
 * Esperanto X-System Real-time Converter
 * Fully client-side / local conversion logic with PWA Support
 */

(() => {
  'use strict';

  // Mapping from X-system pairs to Esperanto special characters
  const X_SYSTEM_MAP = {
    'cx': 'ĉ', 'cX': 'ĉ', 'Cx': 'Ĉ', 'CX': 'Ĉ',
    'gx': 'ĝ', 'gX': 'ĝ', 'Gx': 'Ĝ', 'GX': 'Ĝ',
    'hx': 'ĥ', 'hX': 'ĥ', 'Hx': 'Ĥ', 'HX': 'Ĥ',
    'jx': 'ĵ', 'jX': 'ĵ', 'Jx': 'Ĵ', 'JX': 'Ĵ',
    'sx': 'ŝ', 'sX': 'ŝ', 'Sx': 'Ŝ', 'SX': 'Ŝ',
    'ux': 'ŭ', 'uX': 'ŭ', 'Ux': 'Ŭ', 'UX': 'Ŭ',
  };

  const X_PATTERN = /[cghjsu][xX]/gi;

  /**
   * Converts X-system text to Esperanto special characters
   * @param {string} text 
   * @returns {string}
   */
  function convertXToEsperanto(text) {
    if (!text) return '';
    return text.replace(X_PATTERN, (match) => X_SYSTEM_MAP[match] || match);
  }

  // DOM Elements
  const inputElem = document.getElementById('inputText');
  const outputElem = document.getElementById('outputText');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const installBtn = document.getElementById('installBtn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  let toastTimeout = null;
  let deferredInstallPrompt = null;

  /**
   * Updates conversion output in real time
   */
  function handleInput() {
    const rawText = inputElem.value;
    outputElem.value = convertXToEsperanto(rawText);
  }

  /**
   * Clears both input and output
   */
  function handleClear() {
    inputElem.value = '';
    outputElem.value = '';
    inputElem.focus();
  }

  /**
   * Shows a toast message
   * @param {string} message 
   */
  function showToast(message) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    toastMessage.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  /**
   * Copies converted text to clipboard
   */
  async function handleCopy() {
    const textToCopy = outputElem.value;
    if (!textToCopy) {
      showToast('コピーする内容がありません');
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-https / older contexts
        outputElem.select();
        document.execCommand('copy');
      }

      // Visual feedback on button
      const copyIcon = copyBtn.querySelector('.copy-icon');
      const checkIcon = copyBtn.querySelector('.check-icon');

      if (copyIcon && checkIcon) {
        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');
        copyBtnText.textContent = '完了!';

        setTimeout(() => {
          copyIcon.classList.remove('hidden');
          checkIcon.classList.add('hidden');
          copyBtnText.textContent = 'コピー';
        }, 1500);
      }

      showToast('クリップボードにコピーしました');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('コピーに失敗しました');
    }
  }

  /**
   * Theme handling (Dark / Light)
   */
  const THEME_KEY = 'esperanto_converter_theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (theme === 'dark') {
      themeIconSun.classList.add('hidden');
      themeIconMoon.classList.remove('hidden');
    } else {
      themeIconSun.classList.remove('hidden');
      themeIconMoon.classList.add('hidden');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  /**
   * PWA Service Worker Registration
   */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('ServiceWorker registered with scope: ', reg.scope);
          })
          .catch((err) => {
            console.warn('ServiceWorker registration failed: ', err);
          });
      });
    }
  }

  /**
   * PWA Install Prompt Handling
   */
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (installBtn) {
      installBtn.classList.remove('hidden');
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('インストールを開始しました');
      }
      deferredInstallPrompt = null;
      installBtn.classList.add('hidden');
    });
  }

  window.addEventListener('appinstalled', () => {
    showToast('アプリが正常にインストールされました！');
    if (installBtn) {
      installBtn.classList.add('hidden');
    }
  });

  // Event Listeners
  inputElem.addEventListener('input', handleInput);
  clearBtn.addEventListener('click', handleClear);
  copyBtn.addEventListener('click', handleCopy);
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Initialize
  initTheme();
  handleInput();
  registerServiceWorker();
})();
