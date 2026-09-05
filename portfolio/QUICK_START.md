# Quick Start: 5-Minute Setup

## TL;DR - Get Started Now

### 1. Add Your Images
```
Drag your artwork into: portfolio/assets/images/
```

### 2. Describe Them
Go to `/admin.html` and either:

**Easy Way (Form):**
```
1. Fill out form with artwork details
2. Click "Add Artwork"
3. Repeat for each piece
```

**Fast Way (JSON):**
```
1. Paste JSON in editor
2. Click "Save Changes"
3. Done!
```

### 3. View Your Gallery
Visit `/gallery.html` (refresh if needed)

✓ Your artwork appears automatically  
✓ Filter buttons auto-generate  
✓ Lightbox works out of the box  

---

## File Structure
```
portfolio/
├── assets/images/              ← Add your artwork here
├── admin.html                  ← Manage artwork (go here!)
├── gallery.html                ← View artwork
└── data/
    └── gallery-metadata.json   ← Metadata (auto-updated by admin)
```

---

## Admin Panel Quick Reference

| Action | Steps |
|--------|-------|
| **Add artwork** | Fill form → Click "Add Artwork" |
| **Edit artwork** | Edit JSON directly → Click "Save Changes" |
| **Delete artwork** | Remove from JSON → Click "Save Changes" |
| **Backup gallery** | Click "Export Metadata" |
| **Restore backup** | Click "Import Metadata" → Choose file |
| **Refresh gallery** | Visit `/gallery.html` and refresh (Ctrl+R) |

---

## Metadata Format (Copy & Paste)

```json
{
  "artworks": [
    {
      "filename": "my-image.jpg",
      "title": "My Artwork Title",
      "description": "Medium and details",
      "category": "sketches",
      "year": 2024
    },
    {
      "filename": "another-image.png",
      "title": "Another Artwork",
      "description": "Oil on canvas",
      "category": "digital",
      "year": 2024
    }
  ]
}
```

**Fields:**
- `filename`: Name of image in `assets/images/`
- `title`: What it's called
- `description`: Medium/details
- `category`: Type (sketches, digital, concept, etc.)
- `year`: When you made it

---

## Common Tasks

### Add 1 Artwork
1. Save image to `assets/images/image.jpg`
2. Go to `/admin.html`
3. Fill form: Filename, Title, Description, Category
4. Click "Add Artwork"
5. Go to `/gallery.html` → Refresh

### Add 5+ Artworks
1. Save all images to `assets/images/`
2. Go to `/admin.html`
3. Edit JSON directly (paste multiple entries)
4. Click "Save Changes"
5. Go to `/gallery.html` → Refresh

### Change Filter Categories
Edit `category` in JSON. New categories auto-generate as filter buttons.

### Delete Artwork
Remove entry from JSON and click "Save Changes".

### Backup Everything
Click "Export Metadata" in admin panel. Save the JSON file.

---

## Troubleshooting

**Gallery not showing images?**
- Images must be in `assets/images/`
- Filenames must match JSON exactly
- Try refreshing the page
- Check browser console (F12) for errors

**Admin form not working?**
- Fill all fields marked with *
- Use lowercase for categories
- Check filename matches actual image file

**Changes not appearing?**
- Click "Save Changes" in admin
- Refresh gallery page (Ctrl+R)

**Lost my data?**
- Export a backup: Click "Export Metadata"
- Save the JSON file for next time

---

## Next Pages to Read

1. **`SYSTEM_OVERVIEW.md`** — How the system works
2. **`ADMIN_GUIDE.md`** — Detailed admin panel guide
3. **`GALLERY_SETUP.md`** — Gallery technical details
4. **`README.md`** — General portfolio info

---

## Deploy to Live Site

When ready to share:

1. **Export metadata** from admin panel
2. **Push to GitHub** with all files
3. **Deploy to Netlify/Vercel** (auto-builds)
4. **Share your portfolio URL!**

---

## That's It! 🎨

You now have:
- ✓ Auto-loading gallery
- ✓ Admin panel to manage artwork
- ✓ Beautiful dark theme with gold/blue accents
- ✓ Fully responsive design
- ✓ Lightbox for viewing artwork

Enjoy creating! ✨
