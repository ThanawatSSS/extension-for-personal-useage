chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "downloadMP3",
    title: "Download MP3 from Video",
    contexts: ["link"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "downloadMP3") {
    const videoUrl = info.linkUrl;
    fetch(
      `http://localhost:3000/download-mp3?url=${encodeURIComponent(videoUrl)}`
    )
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: blobUrl,
          filename: "audio.mp3",
        });
      });
  }
});
