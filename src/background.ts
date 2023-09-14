// Clicking the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    files: ['content.js'],
  })
})

// Create a context menu item
chrome.contextMenus.create({
  id: 'searchMaps',
  title: "Search Maps for '%s'",
  contexts: ['selection'],
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'searchMaps') {
    chrome.scripting.executeScript({
      target: { tabId: tab?.id! },
      files: ['content.js'],
    })
  }
})
