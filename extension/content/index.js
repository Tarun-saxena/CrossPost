let lastSelectedText = "";

document.addEventListener("selectionchange", () => {
  const text = window.getSelection()?.toString().trim();
  if (text) {
    lastSelectedText = text;}
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTED_TEXT") {
    sendResponse({ text: lastSelectedText });
  }
});

