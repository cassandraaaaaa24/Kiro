# Admin Guide: Gallery Management System

## Overview

Your portfolio now has an **Admin Panel** that makes managing your gallery simple:

1. **No backend needed** — Everything works locally in your browser
2. **Easy metadata management** — Simple JSON editing
3. **Backup/restore** — Export and import your gallery data
4. **Quick updates** — Add artwork with a simple form

---

## Quick Start

### Step 1: Access Admin Panel

Visit `/admin.html` in your browser:
```
http://localhost:8000/admin.html
```

### Step 2: Add Your Artwork

**Option A: Using the Form**
1. Upload images to `assets/images/` on your computer
2. In admin panel, fill the form:
   - **Image Filename**: Name of file in `assets/images/` (e.g., `painting-1.jpg`)
   - **Title**: Display name (e.g., "My Painting")
   - **Description**: Medium or notes (e.g., "Oil on canvas")
   - **Category**: Type (e.g., `sketches`, `digital`, `concept`)
   - **Year**: When created (defaults to 2024)
3. Click "Add Artwork"

**Option B: Editing JSON Directly**
1. Paste JSON in the metadata editor
2. Click "Save Changes"
3. Refresh gallery page

### Step 3: Refresh Gallery

After adding artwork, refresh `/gallery.html` to see updates.

---

## How It Works

### Data Flow

```
Admin Panel → Browser Storage (localStorage) → Gallery Page
```

1. You add/edit artwork in admin panel
2. Data is saved to browser's localStorage
3. Gallery page reads from localStorage on load
4. If localStorage is empty, it uses `data/gallery-metadata.json`

### File Locations

```
portfolio/
├── admin.html                 ← Admin panel
├── gallery.html               ← Gallery (auto-loads data)
├── assets/
│   └── images/                ← Your artwork images
└── data/
    └── gallery-metadata.json  ← Metadata file (fallback)
```

---

## Features Explained

### Export Metadata
**What it does:** Downloads your gallery data as JSON file

**When to use:**
- Back up your gallery data
- Transfer data to another computer
- Share metadata with collaborators

**File format:** `gallery-metadata-2024-01-15.json` (timestamped)

### Import Metadata
**What it does:** Uploads a previously exported JSON file

**When to use:**
- Restore from backup
- Update from another device
- Load shared metadata

**Process:**
1. Click "Import Metadata"
2. Select `.json` file
3. Data loads into admin panel

### Add New Artwork
**Form fields:**

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| Image Filename | ✓ | `painting.jpg` | Must exist in `assets/images/` |
| Title | ✓ | `My Painting` | Display name |
| Description | ✓ | `Oil on canvas` | Medium or short description |
| Category | ✓ | `digital` | Single word, lowercase |
| Year | — | `2024` | Optional, defaults to current year |

**Category tips:**
- Use lowercase, single word: `sketches`, `digital`, `concept`
- Each unique category becomes a filter button
- Can have as many categories as you want

### Edit Metadata (JSON)
**Advanced feature:** Edit raw JSON data

**Use when:**
- Batch editing multiple artworks
- Fixing syntax errors
- Complex modifications

**Important:** JSON must be valid or "Save Changes" will fail

---

## Metadata Format

Each artwork entry must have this structure:

```json
{
  "filename": "my-artwork.jpg",
  "title": "My Artwork Title",
  "description": "Oil on canvas, 50x70cm",
  "category": "digital",
  "year": 2024
}
```

**Full example:**

```json
{
  "artworks": [
    {
      "filename": "sketch-1.jpg",
      "title": "Portrait Study",
      "description": "Charcoal on paper",
      "category": "sketches",
      "year": 2024
    },
    {
      "filename": "digital-1.png",
      "title": "Ethereal Landscape",
      "description": "Digital painting",
      "category": "digital",
      "year": 2024
    },
    {
      "filename": "concept-1.jpg",
      "title": "Character Design",
      "description": "Concept art",
      "category": "concept",
      "year": 2024
    }
  ]
}
```

---

## Common Tasks

### Adding a New Artwork

1. Save image to `assets/images/` (e.g., `portrait.jpg`)
2. Go to admin panel
3. Fill form or add to JSON editor
4. Click "Save Changes"
5. Refresh gallery page

### Editing an Artwork

1. Edit JSON directly in textarea
2. Change title, description, or category
3. Click "Save Changes"
4. Refresh gallery page

### Deleting an Artwork

1. Find artwork in JSON editor
2. Delete the entire object (including commas)
3. Click "Save Changes"
4. Refresh gallery page

### Rearranging Artworks

1. Edit JSON in textarea
2. Reorder the artwork objects
3. Click "Save Changes"
4. Refresh gallery page

### Changing Category

1. Edit JSON
2. Change `"category": "old"` to `"category": "new"`
3. Click "Save Changes"
4. New filter button appears automatically

---

## Backup & Recovery

### How to Backup

1. Click "Export Metadata" button
2. File downloads: `gallery-metadata-YYYY-MM-DD.json`
3. Store safely (cloud drive, USB, etc.)

### How to Restore

1. Open admin panel
2. Click "Import Metadata"
3. Select your backup `.json` file
4. Data loads into admin panel
5. Click "Save Changes" to confirm

### Multiple Backups

Keep multiple backups with different timestamps:
- `gallery-metadata-2024-01-15.json`
- `gallery-metadata-2024-02-20.json`
- `gallery-metadata-2024-03-10.json`

This way you can revert to an older version if needed.

---

## Persistent Storage

### How Data is Stored

- **Short term:** Browser's localStorage (survives page refresh)
- **Long term:** Export to `.json` file and save

### When Data is Lost

Data in localStorage is lost if:
- Browser cache is cleared
- Browser cookies/storage are deleted
- Using private/incognito browsing
- Switching browsers or devices

### Important: Deploy to Live Site

**When you deploy to Netlify/GitHub Pages:**

1. Keep `data/gallery-metadata.json` updated with your latest data
2. Or export from admin and manually update the file
3. Push changes to your repository
4. Site updates automatically

**Why?** Deployed site reads from the JSON file, not browser localStorage.

---

## Troubleshooting

### Changes not appearing on gallery?

- ✓ Click "Save Changes" in admin panel
- ✓ Refresh gallery page (Ctrl+R or Cmd+R)
- ✓ Check browser console for errors (F12)
- ✓ Verify image filenames match exactly

### Import/Export not working?

- ✓ Ensure JSON file is valid (use [jsonlint.com](https://jsonlint.com))
- ✓ Check file format is `.json`
- ✓ Try a different browser
- ✓ Clear browser cache and try again

### Admin form won't submit?

- ✓ Fill all required fields (marked with *)
- ✓ Check filename matches an image in `assets/images/`
- ✓ Use lowercase categories
- ✓ Check browser console for errors

### Gallery shows placeholders instead of images?

- ✓ Verify images exist in `assets/images/`
- ✓ Check filenames match metadata exactly (case-sensitive)
- ✓ Ensure image file extensions are correct (.jpg, .png, etc.)
- ✓ Try refreshing page

---

## Tips & Best Practices

✓ **Export often** — Keep regular backups  
✓ **Use descriptive titles** — Help visitors understand your work  
✓ **Consistent categories** — Stick to a few main types  
✓ **Organize by year** — Add year badges for chronological viewing  
✓ **Optimize images** — Use WebP for faster loading  
✓ **Test before publish** — Check gallery before deploying  

---

## Advanced: Manual Metadata Updates

If you prefer editing files directly:

1. Open `data/gallery-metadata.json` in your text editor
2. Edit artwork entries
3. Save the file
4. Refresh gallery page

**Important:** Must be valid JSON or gallery won't load.

Validate at: [jsonlint.com](https://jsonlint.com)

---

## Next Steps

1. ✓ Add images to `assets/images/`
2. ✓ Fill in artwork info in admin panel
3. ✓ Export metadata backup
4. ✓ Refresh gallery to verify
5. ✓ Share with others!

For more details, see:
- `GALLERY_SETUP.md` — Gallery structure
- `README.md` — General setup
