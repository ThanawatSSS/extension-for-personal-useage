# 🎮💵 CS2Prices & 🎵📥 MP3Download Chrome Extension
This is a dual-purpose Chrome Extension that includes:

- CS2Prices – View your CS2 (Counter-Strike 2) Steam inventory with real-time market prices.
- MP3Download – Quickly download MP3 audio from YouTube videos, using either the current tab or a copied link.

## 🚀 Features
### 🔫 CS2Prices
- Fetches your Steam CS2 inventory using your Steam API Key and Steam ID.
- Displays each item's name and current lowest market price from the Steam Community Market.

### 🎧 MP3Download
- Download MP3 from a YouTube URL by:
- Auto-filling from the current browser tab
- Reading from clipboard
- Manually pasting the URL
- Communicates with a local backend server (http://localhost:3000) that handles the actual MP3 extraction and encoding.
- Automatically initiates a download via the Chrome Downloads API.

## 🛠 Installation
1. Clone or Download this Repo
```bash
git clone https://github.com/your-username/cs2prices-mp3download-extension.git
```
2. Enable Developer Mode in Browsers:
- Go to setting and in extension menu toggle Developer mode on (top right)

3. Load Unpacked Extension:
- Click Load unpacked
- Select the directory containing this extension

## 🔧 Configuration
### For CS2Prices:
Edit the following constants in your script:

```js
const steamId = "YOUR_STEAM_ID";
const apiKey = "YOUR_STEAM_API_KEY";
```
You can obtain an API key from [Steam Developer](https://steamcommunity.com/dev/apikey)

### For MP3Download:
Ensure a local backend server is running at http://localhost:3000/download-mp3.
Ensure you running the server.js before download files run in foldeer ...\extension\mp3download
```cmd
node server.js
```

## ⚠️ Disclaimer
- This extension is for personal use only.
- It is not affiliated with or endorsed by Steam or YouTube.
- Use of third-party MP3 downloaders may violate YouTube’s Terms of Service.
