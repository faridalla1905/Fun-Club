# Fun Club Pro Free Website

This version is built to look more like a real organization while staying 100% free.

## Free tools only
- GitHub Pages for hosting
- Google Forms for volunteer applications
- Google Fonts for typography
- GitHub files for daily updates

## Keep only these in the repository
- index.html
- about.html
- programs.html
- gallery.html
- volunteer.html
- contact.html
- impact.html
- events.html
- brand-guide.html
- styles.css
- script.js
- README.md
- assets/
- data/

Delete random HEIC/JPEG files from the root. Photos should go inside:
assets/photos/

## How to update photos daily
1. Put the new photo inside `assets/photos/`
2. Open `data/content.json`
3. Add a new gallery item:
```json
{
  "image": "assets/photos/your-photo-name.jpg",
  "title": "Saturday Learning Session",
  "category": "Education"
}
```
4. Commit changes.

## How to update news
Open `data/content.json` and edit the `news` section.

## How to update events
Open `data/content.json` and edit the `events` section.

## How to update stats
Open `data/content.json` and edit the `stats` section.

## How to publish free with GitHub Pages
1. Go to repository Settings
2. Click Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: /root
6. Save

## To look real without spending money
- Use real photos
- Use honest numbers
- Post weekly updates
- Add a free Google Form
- Use the free GitHub Pages link
- Keep the repo clean
