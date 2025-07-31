async function handleDownload(url, button, statusEl) {
  if (!url) {
    statusEl.textContent = "Please enter a video URL.";
    return;
  }

  button.disabled = true;
  button.textContent = "Downloading...";
  statusEl.textContent = "Processing...";

  try {
    const response = await fetch(
      `http://localhost:3000/download-mp3?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) throw new Error("Server error");

    const { title, mimeType, base64Audio } = await response.json();
    const blob = new Blob(
      [Uint8Array.from(atob(base64Audio), (c) => c.charCodeAt(0))],
      { type: mimeType }
    );
    const blobUrl = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: blobUrl,
      filename: "MP3s/" + title,
      saveAs: false,
    });

    statusEl.textContent = "Download started.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error: ${err.message}`;
  } finally {
    button.disabled = false;
    button.textContent = "Download MP3";
  }
}

// Handle download from current tab
document.getElementById("downloadBtn").addEventListener("click", () => {
  const input = document.getElementById("CurrentVideoUrl");
  const status = document.getElementById("status");
  handleDownload(input.value.trim(), event.target, status);
});

// Handle download from clipboard/copy input
document.getElementById("CopyDownloadBtn").addEventListener("click", () => {
  const input = document.getElementById("CopyVideoUrl");
  const status = document.getElementById("status");
  handleDownload(input.value.trim(), event.target, status);
});

// Autofill from current YouTube tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (tab && tab.url.includes("youtube.com/watch")) {
    document.getElementById("CurrentVideoUrl").value = tab.url;
  }
});

// Autofill from clipboard
(async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text && text.includes("youtube.com/watch")) {
      document.getElementById("CopyVideoUrl").value = text;
    }
  } catch (err) {
    console.warn("Clipboard access denied:", err);
  }
})();
