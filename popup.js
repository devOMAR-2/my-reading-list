document.addEventListener("DOMContentLoaded", () => {
  const articlesList = document.getElementById("articles");

  chrome.storage.local.get({ articles: [] }, async (result) => {
    const articles = result.articles;

    if (articles.length === 0) {
      const noArticlesMessage = document.createElement("p");
      noArticlesMessage.textContent = "No bookmarked articles yet.";
      noArticlesMessage.className = "no-articles";
      articlesList.appendChild(noArticlesMessage);
      return;
    }

    for (const url of articles) {
      let title = await getTitleFromCache(url);

      if (!title) {
        try {
          title = await fetchTitle(url);
          await storeTitleInCache(url, title);
        } catch (error) {
          console.error("Error fetching title:", error);
          title = url;
        }
      }

      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = url;
      link.textContent = title;
      link.title = title;
      link.target = "_blank";

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-button";
      removeButton.addEventListener("click", () =>
        removeArticle(url, listItem)
      );

      listItem.appendChild(link);
      listItem.appendChild(removeButton);
      articlesList.appendChild(listItem);
    }
  });

  async function getTitleFromCache(url) {
    return new Promise((resolve) => {
      chrome.storage.local.get({ titles: {} }, (result) => {
        resolve(result.titles[url]);
      });
    });
  }

  async function storeTitleInCache(url, title) {
    return new Promise((resolve) => {
      chrome.storage.local.get({ titles: {} }, (result) => {
        const titles = result.titles;
        titles[url] = title;
        chrome.storage.local.set({ titles }, () => {
          resolve();
        });
      });
    });
  }

  async function fetchTitle(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.querySelector("title").innerText || url;
  }

  function removeArticle(url, listItem) {
    chrome.storage.local.get({ articles: [] }, (result) => {
      let articles = result.articles;
      articles = articles.filter((article) => article !== url);
      chrome.storage.local.set({ articles }, () => {
        listItem.remove();

        if (articles.length === 0) {
          const noArticlesMessage = document.createElement("p");
          noArticlesMessage.textContent = "No bookmarked articles yet.";
          noArticlesMessage.className = "no-articles";
          articlesList.appendChild(noArticlesMessage);
        }
      });
    });
  }
});
