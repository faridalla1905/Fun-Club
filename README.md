# Fun Club Easy Update Version

This version is easier to maintain.

## Main rule
You only update:
`data/content.json`

and add photos to:
`assets/news/`

## To add a new news post
1. Upload the photo to `assets/news/`
2. Open `data/content.json`
3. Copy one item inside `"news"`
4. Paste it under the last item
5. Change:
   - date
   - title
   - description
   - image

Example:
```json
{
  "date": "July 2026",
  "title": "Saturday English Practice",
  "description": "Students practiced vocabulary and speaking through games.",
  "image": "assets/news/meeting11.jpg"
}
```

## To change homepage title
Open `data/content.json` and edit the `"hero"` section.

## To update stats
Open `data/content.json` and edit the `"stats"` section.

## To update gallery
Open `data/content.json` and edit the `"gallery"` section.

## Files to upload to GitHub
Upload/replace:
- index.html
- about.html
- programs.html
- gallery.html
- volunteer.html
- contact.html
- impact.html
- styles.css
- script.js
- assets/
- data/
