let srcFiles = [
  'aardvarkBookmarkletStub.js',
  'aardvarkStrings.js',
  'aardvarkUtils.js',
  'aardvarkDBox.js',
  'aardvarkCommands.js',
  'aardvarkMain.js'
];

let extensionRoot = browser.extension.getURL('/');

browser.browserAction.onClicked.addListener((tab, clickData) => {
  let cnt = 0;
  srcFiles.forEach((filename) => {
    setTimeout(() => {
      browser.tabs.executeScript(tab.id, {
        file: `/${filename}`
      });
    }, cnt * 10);
    cnt++;
  });
});

