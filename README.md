# 🌴 Cancún Phrases

A tiny offline Mexican-Spanish phrasebook for your phone. Tap a card to hear it;
press **▶︎ Study** to play the whole list hands-free (Spanish → English) on the plane.

## Get it on your phone (do this tonight)

1. **Put it online** (gives an https link so it can install + work offline):
   - Easiest: go to **https://app.netlify.com/drop** and drag the whole
     `cancun-phrases` folder onto the page. You get a link in ~10 seconds.
   - Or Cloudflare Pages: dash.cloudflare.com → Workers & Pages → Create → Pages →
     Upload assets → drag the folder.
2. **Open the link in Safari** on your iPhone → tap **Share** → **Add to Home Screen**.
3. **Download a good Spanish voice** (one-time, makes it sound natural, not robotic):
   Settings → Accessibility → Spoken Content → Voices → Spanish →
   **Spanish (Mexico)** → tap the ☁️ to download an **Enhanced/Premium** voice.
4. **Open the app from your home screen once while on Wi-Fi** so it caches for offline.
   Tap a few cards, then press ▶︎ Study to test.

On the plane: open it from the home screen, hit **▶︎ Study**, set the phone down.

## Optional upgrade: real human voice (Google), $0

Even better-sounding Spanish, bundled as audio. Can be done anytime (even from
Mexico on Wi-Fi).

1. Get a Google Cloud API key with **Cloud Text-to-Speech API** enabled.
2. Create `cancun-phrases/.env` with: `GOOGLE_TTS_API_KEY=AIza...`
   (optional: `GOOGLE_TTS_VOICE=es-US-Neural2-C`, `GOOGLE_TTS_RATE=0.95`)
3. Run: `python generate_audio.py`  → creates `audio/*.mp3` + `audio-map.js`.
4. Re-deploy (re-drag the folder) and refresh the app once on Wi-Fi.

The app automatically plays the bundled recordings when present, and falls back to
the phone voice when they aren't.

## Files
- `index.html` — the whole app (UI, phrases, playback, study mode).
- `audio-map.js` — phrase → recording lookup (empty until you run the generator).
- `generate_audio.py` — makes the human-voice recordings.
- `sw.js`, `manifest.webmanifest`, `icon*.png/svg` — offline + installable app shell.

## Edit phrases
Open `index.html`, find `const DATA = {`, and edit the
`["Spanish","English","pho-NE-tic"]` rows. Re-run `generate_audio.py` if you use the
Google voice.
