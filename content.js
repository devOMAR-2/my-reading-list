const bookmarkButton = document.createElement("button");
bookmarkButton.textContent = "Bookmark this article";
bookmarkButton.style.position = "fixed";
bookmarkButton.style.top = "10px";
bookmarkButton.style.right = "10px";
bookmarkButton.style.zIndex = 1000;
bookmarkButton.style.padding = "10px 20px";
bookmarkButton.style.backgroundColor = "#007bff";
bookmarkButton.style.color = "#fff";
bookmarkButton.style.border = "none";
bookmarkButton.style.borderRadius = "5px";
bookmarkButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.15)";
bookmarkButton.style.cursor = "pointer";
bookmarkButton.style.fontSize = "16px";
bookmarkButton.style.fontFamily = "Arial, sans-serif";
bookmarkButton.style.transition = "background-color 0.3s";

bookmarkButton.addEventListener("mouseenter", () => {
  bookmarkButton.style.backgroundColor = "#0056b3";
});

bookmarkButton.addEventListener("mouseleave", () => {
  bookmarkButton.style.backgroundColor = "#007bff";
});

bookmarkButton.addEventListener("click", () => {
  const articleUrl = window.location.href;
  chrome.runtime.sendMessage(
    { type: "bookmark", url: articleUrl },
    (response) => {
      if (response.status === "success") {
        bookmarkButton.textContent = "Bookmarked";
        bookmarkButton.disabled = true;
        bookmarkButton.style.backgroundColor = "#28a745";
      }
    }
  );
});

document.body.appendChild(bookmarkButton);

const currentPageUrl = window.location.href;
chrome.storage.local.get({ articles: [] }, (result) => {
  const articles = result.articles;
  if (articles.includes(currentPageUrl)) {
    bookmarkButton.textContent = "Bookmarked";
    bookmarkButton.disabled = true;
    bookmarkButton.style.backgroundColor = "#28a745";
  }
});
