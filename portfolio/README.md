# Manus Vindictae Portfolio

A lightweight, elegant, dark-themed art portfolio website inspired by the aesthetic of "Reverse: 1999 — Manus Vindictae." Features an **auto-loading gallery system** that pulls from your artwork folder.

## 📋 Project Overview

This is a static website built with vanilla HTML, CSS, and JavaScript. No build tools or dependencies required—just open `index.html` in a browser to get started.

**Theme:** Minimal, elegant dark aesthetic  
**Color Palette:** Black, Blue (#1E3A8A), Gold (#D4AF37), Off-White  
**Typography:** Playfair Display (titles) + Inter (body)

## ✨ Key Features (NEW!)

- **Auto-Loading Gallery** — Add images to a folder, they appear automatically
- **Admin Panel** — Manage artwork without coding
- **Dynamic Filters** — Categories auto-generate from metadata
- **Browser Storage** — Changes persist locally
- **Export/Import** — Backup and restore your gallery
- **No Backend** — Works entirely locally

## 🗂️ Project Structure

```
portfolio/
├── index.html          # Landing page
├── gallery.html        # Gallery (auto-loads from JSON)
├── admin.html          # Admin panel (manage artwork)
├── about.html          # About section
├── contact.html        # Contact form
│
├── assets/
│   └── images/         # Your artwork images
│
├── data/
│   └── gallery-metadata.json  # Artwork metadata
│
├── css/
│   ├── styles.css      # Main styles
│   └── admin.css       # Admin panel styles
│
├── js/
│   ├── main.js         # Gallery & site logic
│   └── admin.js        # Admin panel logic
│
└── Documentation/
    ├── START_HERE.md   # Read this first!
    ├── QUICK_START.md  # 5-minute setup
    ├── ADMIN_GUIDE.md  # Admin panel guide
    ├── SYSTEM_OVERVIEW.md
    └── GALLERY_SETUP.md
```

## 🎨 Features

### Core Features
- **Hero Landing Page** — Bold title with tagline and call-to-action
- **Auto-Loading Gallery** — Images load automatically from assets folder
- **Dynamic Filtering** — Filter buttons auto-generate from artwork categories
- **Lightbox Modal** — Click gallery items to view in detail
- **About Page** — Bio with decorative dividers and arcane symbols
- **Contact Page** — Contact form with alternative social links
- **Responsive Design** — Mobile-friendly breakpoints for all screen sizes

### Gallery Management (NEW!)
- **Admin Panel** — User-friendly interface to manage artwork
- **Browser Storage** — Changes persist between sessions
- **Export/Import** — Backup and restore gallery data
- **JSON Editing** — Advanced metadata editing
- **No Backend** — Everything works locally

### Interactive Elements
- **Custom Cursor** — Gold circle-based symbol cursor
- **Hover Effects** — Subtle glow/shadow transitions on interactive elements
- **Smooth Scrolling** — Elegant navigation between sections
- **Ambient Audio Toggle** — Optional background audio (button in bottom-right)
- **Gallery Filtering** — Filter by category with smooth animations

## 🚀 Getting Started

### ⚡ Quick Setup (5 minutes)

**Start here:** Read `START_HERE.md` then follow these steps:

1. **Create the images folder:**
   ```
   portfolio/assets/images/  (folder)
   ```

2. **Copy your artwork images** into `portfolio/assets/images/`

3. **Open the admin panel:**
   ```
   http://localhost:8000/admin.html
   ```

4. **Add artwork metadata** via form or JSON editor

5. **View your gallery:**
   ```
   http://localhost:8000/gallery.html
   ```

### Option 1: Direct Browser Opening
1. Navigate to the `portfolio` folder
2. Right-click `index.html` and select "Open with" → your preferred browser
3. Or simply double-click `index.html`

### Option 2: Local Server (Recommended)
For best results, serve over HTTP:

**Using Python 3:**
```bash
cd portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd portfolio
http-server
```

**Using VS Code Live Server extension:**
- Install the "Live Server" extension
- Right-click `admin.html` and select "Open with Live Server"

## 📝 Customization

### Adding Artwork to Gallery

**New system: No HTML editing needed!**

1. **Save images** to `portfolio/assets/images/`
2. **Go to** `/admin.html`
3. **Add artwork info** via form:
   - Filename: `my-painting.jpg`
   - Title: `My Beautiful Painting`
   - Description: `Oil on canvas`
   - Category: `digital`
4. **Click "Add Artwork"**
5. **Refresh gallery** at `/gallery.html`

**For batch imports:** Edit `data/gallery-metadata.json` directly (advanced users)

For detailed instructions, see `ADMIN_GUIDE.md`

### Customizing Colors

Edit the CSS variables in `css/styles.css` (top of file):
```css
:root {
    --bg-dark: #0A0A0A;           /* Background */
    --accent-blue: #1E3A8A;       /* Blue accent */
    --accent-gold: #D4AF37;       /* Gold accent */
    --text-light: #EAEAEA;        /* Main text */
    --text-muted: #A0A0A0;        /* Muted text */
}
```

### Setting Up Contact Form

Currently, the contact form shows a browser alert. For production:

**Option 1: Formspree**
```html
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
    <!-- form fields -->
</form>
```

**Option 2: Netlify Forms**
```html
<form name="contact" netlify>
    <!-- form fields -->
</form>
```

Visit [formspree.io](https://formspree.io) or [netlify.com/forms](https://netlify.com/forms) for setup.

### Gallery Metadata Format

Edit `data/gallery-metadata.json`:

```json
{
  "artworks": [
    {
      "filename": "painting.jpg",
      "title": "My Painting",
      "description": "Oil on canvas",
      "category": "digital",
      "year": 2024
    }
  ]
}
```

## 🌐 Deployment

### GitHub Pages (Free)
```bash
# Push to GitHub repo
git push origin main

# In GitHub repo settings:
# Settings → Pages → Source: main branch
# Your site will be live at: https://username.github.io/portfolio
```

### Netlify (Free)
1. Drag & drop the `portfolio` folder onto [netlify.com](https://netlify.com)
2. Your site goes live instantly
3. Custom domain support available

### Vercel (Free)
1. Push repo to GitHub
2. Connect on [vercel.com](https://vercel.com)
3. Deploy automatically on each push

## 📸 Image Optimization

For best performance, convert artwork to WebP format:

**Using ImageMagick:**
```bash
magick convert image.png -quality 80 image.webp
```

**Using FFmpeg:**
```bash
ffmpeg -i image.png -quality 80 image.webp
```

Update image sources in HTML to use `.webp` files.

## ⚙️ Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 🎯 Next Steps

1. **Replace placeholder images** with your artwork
2. **Update About page** with your bio
3. **Set up contact form** with Formspree or Netlify
4. **Add ambient audio** (optional)
5. **Deploy** to GitHub Pages, Netlify, or Vercel
6. **Set up custom domain** (optional)

## 📦 File Checklist

- [ ] Added artwork images to `assets/images/`
- [ ] Updated gallery items in `gallery.html`
- [ ] Updated bio in `about.html`
- [ ] Set up contact form handling
- [ ] Added ambient audio (optional)
- [ ] Tested on mobile devices
- [ ] Deployed to hosting service
- [ ] Set up custom domain

## 🛠️ Troubleshooting

**Gallery not showing images?**
- Make sure images are in `assets/images/`
- Check filenames match JSON metadata
- Refresh gallery page (Ctrl+R)
- Check browser console: Press F12 → Console tab

**Admin form not working?**
- Fill all required fields
- Use lowercase for categories
- Check image filename is correct

**Lost data?**
- Export backups regularly in admin panel
- Click "Export Metadata" to save JSON file

**Form not submitting?**
- Set up Formspree or Netlify form handling
- Check browser console for errors

See `ADMIN_GUIDE.md` → Troubleshooting for detailed help.

## � Documentation

- **`START_HERE.md`** — New users start here! (Must read)
- **`QUICK_START.md`** — 5-minute setup guide
- **`ADMIN_GUIDE.md`** — Complete admin panel documentation
- **`SYSTEM_OVERVIEW.md`** — How the gallery system works
- **`GALLERY_SETUP.md`** — Technical gallery details
- **`NEW_SYSTEM_SUMMARY.md`** — What's new in this version

## ✅ File Checklist

Gallery Setup:
- [ ] Created `assets/images/` folder
- [ ] Added artwork images to `assets/images/`
- [ ] Used `/admin.html` to add artwork metadata
- [ ] Tested gallery at `/gallery.html`
- [ ] Exported backup metadata from admin panel

Site Customization:
- [ ] Updated about.html with your bio
- [ ] Customized contact form
- [ ] Tested on mobile devices

Deployment:
- [ ] Set up contact form handling (optional)
- [ ] Deployed to GitHub Pages, Netlify, or Vercel
- [ ] Set up custom domain (optional)
- [ ] Added ambient audio (optional)
