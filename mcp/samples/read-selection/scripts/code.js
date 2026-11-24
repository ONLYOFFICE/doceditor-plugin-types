(function (window) {
  /** @param {string} text */
  function show(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    /** @type {HTMLElement} */ (document.getElementById('count')).textContent = words
      ? `${words} word${words === 1 ? '' : 's'} selected`
      : 'Select some text';
    /** @type {HTMLElement} */ (document.getElementById('selection')).textContent = text;
  }

  // With initDataType "text" the editor passes the selected text here, and with
  // initOnSelectionChanged it calls init again each time the user finishes a selection - so this
  // one function is the update loop. Clearing the selection with a click does not call init, which
  // is what "Read again" is for. Attach DOM handlers once, not on every call.
  let started = false;
  window.Asc.plugin.init = function (text) {
    show(text || '');
    if (started) return;
    started = true;

    /** @type {HTMLButtonElement} */ (document.getElementById('refresh')).onclick = function () {
      window.Asc.plugin.executeMethod(
        'GetSelectedText',
        [{ Numbering: false, Math: false, NewLineSeparator: '\n', TabSymbol: '\t' }],
        function (selected) {
          show(selected || '');
        },
      );
    };
  };

  // A panel has no buttons of its own; the editor calls this when the panel is closed.
  window.Asc.plugin.button = function () {
    window.Asc.plugin.executeCommand('close', '');
  };
})(window);
