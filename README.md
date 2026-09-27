# My Reading List

A lightweight Chrome extension for saving articles and webpages to read later.

[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/my-reading-list/pbbfenbhgbiekmbancmmmihcoodljjek)

Built with plain JavaScript and Chrome's local storage API — no account, backend, or external database required.

## Features

- Save the current page with one click
- Keep your reading list stored locally in Chrome
- Automatically display page titles
- Cache fetched titles for faster access
- Prevent duplicate bookmarks
- Open saved pages directly from the extension popup
- Remove items from your reading list at any time
- Built for Chrome Extension Manifest V3

## How It Works

My Reading List adds a small bookmark action to webpages. Saved URLs are stored using `chrome.storage.local` and displayed through the extension popup.

When the popup is opened, the extension resolves and caches page titles to keep the list easy to scan.

## Installation

### Chrome Web Store

The easiest way to install My Reading List is from the [Chrome Web Store](https://chromewebstore.google.com/detail/my-reading-list/pbbfenbhgbiekmbancmmmihcoodljjek).

### Manual Installation

1. Clone or download this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the project directory.

## Tech

- JavaScript
- HTML
- Chrome Extensions API
- Manifest V3
- `chrome.storage.local`

## Privacy

My Reading List stores your saved URLs locally in your browser. It does not require an account or a backend service and does not collect user data.

## License

This project is open source and available under the repository's license.
