let loadedTabs: number[] = []

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'contentScriptLoaded') {
    loadedTabs.push(sender.tab?.id!)
  }
})

function showContent(tab: chrome.tabs.Tab | undefined) {
  setTimeout(() => {
    chrome.tabs.sendMessage(tab?.id!, { action: 'showContent' })
  }, 100) // wait for 100ms before sending the message
}

chrome.action.onClicked.addListener((tab) => {
  if (loadedTabs.includes(tab.id!)) {
    // Content script is already present, just send the message
    showContent(tab)
  } else {
    // Inject the content script
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id! },
        files: ['content.js'],
      },
      () => showContent(tab)
    )
  }
})

chrome.contextMenus.create({
  id: 'searchMaps',
  title: "Search Maps for '%s'",
  contexts: ['selection'],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'searchMaps') {
    if (loadedTabs.includes(tab?.id!)) {
      // Content script is already present, just send the message
      showContent(tab)
    } else {
      // Inject the content script
      chrome.scripting.executeScript(
        {
          target: { tabId: tab?.id! },
          files: ['content.js'],
        },
        () => showContent(tab)
      )
    }
  }
})
