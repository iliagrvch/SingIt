var prevUrl = ''

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  console.log(prevUrl)
  if (
    !prevUrl.includes('youtube.com/watch') &&
    details.url.includes('youtube.com/watch')
  ) {
    console.log('refreshing')
    chrome.tabs.reload()
  }

  prevUrl = details.url
})
