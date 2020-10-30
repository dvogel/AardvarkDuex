let extensionRoot = browser.extension.getURL('/');

browser.browserAction.onClicked.addListener((tab, clickData) => {
  browser.tabs.executeScript(tab.id, {
    code: `window.aardvark = { isBookmarklet: true, resourcePrefix: "${extensionRoot}" };`
  });

  setTimeout(() => {
    browser.tabs.executeScript(tab.id, {
      file: '/aardvarkCombined.js'
    });
  }, 0);
});

