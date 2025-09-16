# Anudeep Portfolio — Local Run (Mac)

## Quick start (no installs)
1. Open the `portfolio-mac` folder.
2. Double‑click **index.html** to open in your browser.
   - Make sure you're online so Tailwind CDN can load.
   - If you're offline, the page still renders with a minimal fallback.

## Run a tiny local server (recommended)
```bash
cd portfolio-mac
python3 -m http.server 5173
# then open http://localhost:5173 in your browser
```

## Optional: Fully offline Tailwind (local build)
If you want 100% offline styling:
```bash
# inside portfolio-mac
npm init -y
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# create ./src/input.css containing:
#   @tailwind base;
#   @tailwind components;
#   @tailwind utilities;

# edit tailwind.config.js and set:
#   content: ["./*.html"]

# build once (or use --watch during editing):
npx tailwindcss -i ./src/input.css -o ./tailwind.css --minify
```

Then link `tailwind.css` in each HTML instead of the CDN script.
