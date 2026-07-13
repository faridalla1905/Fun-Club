# Fun Club Website

A static multi-page website for **Fun Club**, a student-led nonprofit in Dallas, TX helping kids build English skills, confidence, and leadership.

- **No framework, no build step.** Plain HTML, CSS, and vanilla JS.
- **Content-driven.** News, stats, programs, and gallery entries live in `data/content.json` — no HTML editing required for weekly updates.

## Project layout

```
public/
├── index.html            Home
├── about.html            Story, mission, vision, founders
├── programs.html         Full program list
├── gallery.html          Activity gallery
├── volunteer.html        Roles, benefits, expectations, apply
├── contact.html          Contact panel + email button
├── impact.html           Stats page
├── privacy.html          Plain-language privacy policy
├── 404.html              Custom not-found page
├── styles.css            All site styles
├── script.js             Renders dynamic sections from content.json
├── data/
│   └── content.json      Editable content (news, stats, programs, gallery)
├── favicon.ico
└── favicons/             PNG icons (16/32/48/180/192/512) + apple-touch-icon
```

Everything the site needs is under `public/`. That folder **is** the website.

## ⚠️ Important: don't open the HTML files directly

If you double-click `index.html` from your file manager, the page loads over the `file://` protocol. `fetch()` requests to a local JSON file are **blocked** on `file://`, so the news / stats / programs / gallery sections will appear empty.

**Serve the site over `http(s)://` instead.** Any of these works:

- **Netlify Drop** (easiest, no account signup needed): drag the `public/` folder onto <https://app.netlify.com/drop>.
- **GitHub Pages**: push `public/` as the site root of a repo, enable Pages in settings.
- **Local dev server**: from inside `public/`, run `python3 -m http.server 8000` and open <http://localhost:8000>.

## Updating content weekly

Open `public/data/content.json` in any text editor. Edit and save — that's it. No rebuild, no deploy step beyond re-uploading the folder.

### News (`news`)
Add or edit entries at the top of the array. Each entry:
```json
{ "date": "Spring 2026", "tag": "Milestone", "title": "…", "body": "…" }
```

### Stats (`stats`)
```json
{ "value": "180+", "label": "Students supported" }
```

### Programs (`programs` for the Programs page, `programsPreview` for the Home page)
```json
{ "icon": "📚", "title": "English Learning", "body": "…" }
```

### Gallery (`gallery`)
```json
{ "emoji": "📖", "title": "Saturday reading circle", "color": "yellow" }
```
Valid `color` values: `"yellow"`, `"mint"`, `"coral"`, `"sky"`, `"paper"`.

## Publishing

**Recommended: Netlify Drop.** No account required for a first upload, and it gives you a live URL in seconds.

1. Go to <https://app.netlify.com/drop>.
2. Drag the `public/` folder onto the page.
3. Netlify gives you a URL like `https://random-name.netlify.app`. Share it.
4. To update the site later, drag the folder again (create a free Netlify account to keep the same URL between updates).

Other options: GitHub Pages, Cloudflare Pages, or any static host — upload the contents of `public/` as the site root.

## Contact

- Email: funclub2020@gmail.com
- Instagram: [@funclub_2020](https://www.instagram.com/funclub_2020)
- LinkedIn: <https://www.linkedin.com/company/fun-club-2020/>
- Location: Dallas, Texas
