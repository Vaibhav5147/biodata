# Marriage Biodata Website

React + Vite site in English / मराठी / हिंदी, hosted on GitHub Pages.

## Edit your details
- `src/data/biodata.en.json` – all details (English). This is the master file.
- `src/data/biodata.mr.json`, `src/data/biodata.hi.json` – Marathi / Hindi text.
  Any field left out here automatically shows the English value (useful for phone, email, income).
- Photos: put JPGs in `public/photos/` and list them in `"photos"` in the English file.
  The **first** photo is the main profile photo. Strip location (EXIF/GPS) data first.
- Section and field names per language: `src/i18n/labels.js`.

## WhatsApp preview
1. Make a 1200×630 JPG (under 300 KB), e.g. your photo with your name, and save it as `public/og-image.jpg`.
2. In `index.html`, replace `YOUR-USERNAME` / `REPO-NAME` and `Your Name`.

## Run locally
```
npm install
npm run dev
```

## Publish on GitHub Pages
1. Create a repo on GitHub, then:
   ```
   git add . && git commit -m "Biodata site"
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   git push -u origin main
   ```
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Site goes live at `https://YOUR-USERNAME.github.io/REPO-NAME/` (every push redeploys).

Share in a specific language with `?lang=mr` or `?lang=hi`.
PDF: click "Download PDF" → choose "Save as PDF" in the print dialog.
