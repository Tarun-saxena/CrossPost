# CrossPost – Chrome Extension (Manifest V3)

CrossPost is a Chrome extension built using Manifest V3, React, and TypeScript.  
It allows users to select text on a webpage, preview it inside the extension popup, and post it across different platforms.

This project is currently under active development.

---

## Features

- Select text on any webpage
- Automatically preview selected text in the popup
- Foundation for posting content across multiple platforms
- Built with React and TypeScript
- Uses Chrome Extension Manifest V3
- Clean popup UI

---

## How it works

- A content script runs on webpages and tracks selected text
- When the extension popup opens, it requests the cached selection
- The popup displays the selected text
- Posting logic will be added in upcoming versions


---

## Tech Stack

- Chrome Extension (Manifest V3)
- React
- TypeScript
- Vite
- Tailwind CSS

---

## Project Structure

crosspost/
├── extension/
│ ├── manifest.json
│ ├── content/
│ │ └── index.js
│ └── background/
│ └── index.js
├── src/
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── vite.config.ts
└── package.json

---

## Development

Install dependencies:

```bash
npm install
npm run build
chrome://extensions → Load unpacked

Limitations

Content scripts cannot run on Chrome internal pages

Roadmap

Add platform integrations (X, LinkedIn, others)

Inject side panel UI for richer interactions

Store drafts and selections

Add authentication for platforms