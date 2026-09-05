# Gallery Setup Guide

## How the Auto-Loading Gallery Works

The gallery now automatically loads images from the `assets/images/` folder and displays them based on metadata defined in `data/gallery-metadata.json`.

### Step 1: Add Your Artwork

1. **Create the assets folder structure** (if not already present):
   ```
   portfolio/
   └── assets/
       └── images/
   ```

2. **Copy your artwork images** into `portfolio/assets/images/`
   - Supported formats: JPG, PNG, WebP
   - Recommended: WebP for faster loading
   - Name them descriptively: `artwork-1.jpg`, `landscape-study.png`, etc.

### Step 2: Update the Metadata

Edit `data/gallery-metadata.json` to describe your artwork:

```json
{
  "artworks": [
    {
      "filename": "my-painting.jpg",
      "title": "My Beautiful Painting",
      "description": "Oil on canvas",
      "category": "digital",
      "year": 2024
    },
    {
      "filename": "another-sketch.png",
      "title": "Sketch Study",
      "description": "Graphite",
      "category": "sketches",
      "year": 2024
    }
  ]
}
```

### Metadata Fields Explained

- **filename** (required): Name of the image file in `assets/images/`
- **title** (required): Display name for the artwork
- **description** (required): Medium or short description
- **category** (required): Group artwork by type (sketches, digital, concept, etc.)
  - Categories are automatically generated as filter buttons
  - Use lowercase, one word
- **year** (optional): Year created (displays as badge)

### Step 3: View in Gallery

1. Save your changes to `gallery-metadata.json`
2. Refresh the gallery page
3. Your artwork appears automatically
4. Filter buttons are auto-generated based on unique categories

---

## Quick Example

**File structure:**
```
portfolio/
├── assets/
│   └── images/
│       ├── sketch-1.jpg
│       ├── digital-painting.jpg
│       └── concept-art.png
└── data/
    └── gallery-metadata.json
```

**Metadata example:**
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
      "filename": "digital-painting.jpg",
      "title": "Ethereal Landscape",
      "description": "Digital painting",
      "category": "digital",
      "year": 2024
    },
    {
      "filename": "concept-art.png",
      "title": "Character Design",
      "description": "Concept art",
      "category": "concept",
      "year": 2024
    }
  ]
}
```

Result:
- Gallery displays 3 items
- Filter buttons: All, Sketches, Digital, Concept
- Clicking items opens lightbox with full image

---

## Image Optimization

### Convert to WebP (Recommended)

WebP images load **30-40% faster** than JPG:

**Using ImageMagick:**
```bash
magick convert image.jpg -quality 80 image.webp
```

**Using FFmpeg:**
```bash
ffmpeg -i image.jpg -quality 80 image.webp
```

Update metadata to use `.webp` filenames.

### Image Size Recommendations

- **Max width**: 2000px
- **Max size**: 500KB per image
- Keep aspect ratio for consistent grid

---

## Features

✅ **Automatic gallery generation** — Just add images  
✅ **Dynamic filter buttons** — Categories auto-generated  
✅ **Lightbox modal** — Click to view full image  
✅ **Lazy loading** — Images load only when visible  
✅ **Responsive grid** — Works on mobile/tablet/desktop  
✅ **Smooth animations** — Hover effects and transitions  

---

## Fallback Behavior

If `data/gallery-metadata.json` is missing or unreachable:
- Gallery displays 8 placeholder items
- Filters work normally
- Click-to-view opens empty modal

To use real images, ensure the JSON file exists and is properly formatted.

---

## Troubleshooting

**Gallery not showing images?**
- Check file paths: Ensure `filename` in JSON matches actual filename in `assets/images/`
- Verify JSON syntax: Use [jsonlint.com](https://jsonlint.com) to validate
- Check browser console: Press F12 → Console for error messages

**Images appear broken?**
- Verify image files exist in `assets/images/`
- Check filename spelling (case-sensitive on some systems)
- Try using absolute paths if relative paths don't work

**Filters not showing all categories?**
- Ensure `category` field is present for each artwork
- Use lowercase, single-word categories
- Refresh page after JSON updates

---

## Next Steps

1. Create `assets/images/` folder
2. Copy your artwork there
3. Update `data/gallery-metadata.json`
4. Refresh gallery page
5. Done! ✨

For more features (admin panel, likes system, etc.), see the main README.
