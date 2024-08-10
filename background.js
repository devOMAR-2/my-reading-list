chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "bookmark") {
    const articleUrl = message.url;
    chrome.storage.local.get({ articles: [] }, (result) => {
      const articles = result.articles;
      articles.push(articleUrl);
      chrome.storage.local.set({ articles }, () => {
        sendResponse({ status: "success" });
      });
    });
    return true;
  }
});
