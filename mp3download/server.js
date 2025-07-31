const express = require("express");
const { exec } = require("child_process");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { join } = require("path");
const { tmpdir } = require("os");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/download-mp3", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send("No URL provided");

  const id = uuid();
  const outputPath = join(tmpdir(), `${id}.mp3`);

  const getInfoCmd = `yt-dlp -j "${videoUrl}"`;
  exec(getInfoCmd, (err, stdout) => {
    if (err) {
      console.error("Metadata fetch error:", err);
      return res.status(500).send("Metadata fetch failed");
    }

    let metadata;
    try {
      metadata = JSON.parse(stdout);
    } catch (parseErr) {
      return res.status(500).send("Metadata parse error");
    }

    const rawTitle = metadata.title || "audio";
    const title = rawTitle.replace(/[\\/:*?"<>|]/g, "").slice(0, 80);
    const thumbnail = metadata.thumbnail || "";

    const command = `yt-dlp --embed-thumbnail --add-metadata -x --audio-format mp3 -o "${outputPath}" "${videoUrl}"`;
    exec(command, (err) => {
      if (err) {
        console.error("yt-dlp error:", err);
        return res.status(500).send("Download failed");
      }

      fs.readFile(outputPath, (err, buffer) => {
        if (err) return res.status(500).send("File read failed");
        const base64Audio = buffer.toString("base64");
        const mimeType = "audio/mp3";

        res.json({
          title: title + ".mp3",
          mimeType,
          base64Audio,
          // thumbnail,
        });

        fs.unlink(outputPath, () => {});
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
