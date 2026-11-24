(function (window) {
  function close() {
    window.Asc.plugin.executeCommand('close', '');
  }

  window.Asc.plugin.init = function () {
    /** @type {HTMLInputElement} */ (document.getElementById('text')).focus();
  };

  // Called for the buttons declared in config.json, by position: 0 is OK, 1 is Cancel. The
  // window's own close button arrives as -1, so anything but OK just closes.
  window.Asc.plugin.button = function (id) {
    if (id !== 0) {
      close();
      return;
    }
    window.Asc.scope.text = /** @type {HTMLInputElement} */ (document.getElementById('text')).value;
    // isClose = false: closing here would end the plugin before the command reports back. The
    // window closes from the callback, once the text is in.
    window.Asc.plugin.callCommand(
      function () {
        const paragraph = Api.GetDocument().GetCurrentParagraph();
        if (paragraph) paragraph.AddText(Asc.scope.text);
      },
      false,
      true,
      close,
    );
  };
})(window);
