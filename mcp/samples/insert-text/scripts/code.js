(function (window) {
  window.Asc.plugin.init = function () {
    const button = /** @type {HTMLButtonElement} */ (document.getElementById('insert'));
    const field = /** @type {HTMLTextAreaElement} */ (document.getElementById('text'));

    button.onclick = function () {
      // The function below is sent to the editor as source text and run there, so it cannot see
      // `field` or any other variable of this file. Data goes in through Asc.scope, which is
      // serialized at the moment callCommand is called.
      window.Asc.scope.text = field.value;

      // The plugin has one callback slot for callCommand: a second call before the first answers
      // can take over its callback. Keep one in flight at a time.
      button.disabled = true;
      window.Asc.plugin.callCommand(
        function () {
          const paragraph = Api.CreateParagraph();
          paragraph.AddText(Asc.scope.text);
          // Only plain data can come back out; returning `paragraph` itself would give undefined.
          return Api.GetDocument().InsertContent([paragraph]);
        },
        false,
        true,
        function (inserted) {
          button.disabled = false;
          if (!inserted) console.warn('The paragraph was not inserted');
        },
      );
    };
  };

  // A panel has no buttons of its own; the editor calls this when the panel is closed.
  window.Asc.plugin.button = function () {
    window.Asc.plugin.executeCommand('close', '');
  };
})(window);
