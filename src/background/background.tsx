console.log('Background')
chrome.tabs.onUpdated.addListener(function (tabID) {
  chrome.tabs.sendMessage(tabID, 'Url changed')
})
