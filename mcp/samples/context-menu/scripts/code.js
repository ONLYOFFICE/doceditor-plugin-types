(function (window) {
  const UPPERCASE = 'makeUppercase';

  window.Asc.plugin.init = function () {};

  // The editor asks every plugin listening for this event before it shows the menu, and waits
  // for each one's AddContextMenuItem. Answer every time - with no items when there is nothing to
  // offer - or the menu opens late. Both onContextMenuShow and onContextMenuClick are listed under
  // "events" in config.json: attachContextMenuClickEvent below only remembers the handler, it does
  // not subscribe the plugin to clicks.
  window.Asc.plugin.attachEvent('onContextMenuShow', function (options) {
    const items = [];
    if (options.type === 'Selection') {
      items.push({ id: UPPERCASE, text: { en: 'Make uppercase', de: 'In Großbuchstaben' } });
    }
    // info.guid is always there once the plugin has started; Asc.plugin.guid is filled in later.
    window.Asc.plugin.executeMethod('AddContextMenuItem', [{ guid: window.Asc.plugin.info.guid, items: items }]);
  });

  window.Asc.plugin.attachContextMenuClickEvent(UPPERCASE, function () {
    window.Asc.plugin.executeMethod('GetSelectedText', [], function (text) {
      if (text) window.Asc.plugin.executeMethod('PasteText', [text.toUpperCase()]);
    });
  });

  window.Asc.plugin.button = function () {};
})(window);
