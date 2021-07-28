console.log("Background"),chrome.tabs.onUpdated.addListener((function(e){chrome.tabs.sendMessage(e,"Url changed")}));
//# sourceMappingURL=background.js.map