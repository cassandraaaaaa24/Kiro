# Smart Tag System Guide

## What Changed?

Your gallery now uses an **intelligent tag aggregation system** that keeps filter buttons clean and organized.

---

## How It Works

### Tag Classification

The system automatically classifies tags into two categories:

#### **Primary Tags** (5+ images)
- Get their own dedicated button
- Displayed prominently
- Highlighted in gold
- Easy to see and click

#### **Secondary Tags** (1-4 images)
- Grouped in a "More" dropdown
- Keeps the interface clean
- Shows count next to category name
- Accessible via dropdown menu

---

## Visual Example

### Before (All tags in one row)
```
[All] [Digital, concept] [Digital, fanart, genshin] [Sketches] [Concept, animation]
```
❌ Cluttered, hard to scan, too many buttons

### After (Smart aggregation)
```
[All] [Digital] [Sketches] [Concept] [More 4]
      ↓
      [Fanart (2)]
      [Animation (1)]
      [Genshin (1)]
      [Other (1)]
```
✅ Clean, organized, easy to use

---

## Configuration

### Changing the Threshold

Edit `js/main.js` to change when tags become primary:

```javascript
const MIN_TAG_COUNT = 5; // Change this number
```

**Examples:**
- `MIN_TAG_COUNT = 3` → Tags with 3+ images become primary
- `MIN_TAG_COUNT = 5` → Tags with 5+ images become primary (default)
- `MIN_TAG_COUNT = 10` → Only very common tags are primary

---

## Metadata Structure (No Changes!)

Your JSON metadata stays the same:

```json
{
  "artworks": [
    {
      "filename": "painting-1.jpg",
      "title": "My Painting",
      "description": "Oil on canvas",
      "category": "digital",
      "year": 2024
    },
    {
      "filename": "sketch-1.png",
      "title": "Quick Sketch",
      "description": "Charcoal",
      "category": "sketches",
      "year": 2024
    }
  ]
}
```

Everything works exactly the same. The smart tagging is automatic!

---

## Features

### ✅ Automatic Sorting
- Primary tags sorted by frequency (most common first)
- Secondary tags sorted alphabetically
- Always updated based on current gallery

### ✅ Smart Counting
- Each tag shows how many images have it
- Primary tags show count on hover
- Secondary tags show count inline

### ✅ Responsive Dropdown
- "More" dropdown expands/collapses smoothly
- Closes when clicking elsewhere
- Shows category counts

### ✅ Visual Distinction
- Primary tags: Gold border, prominent styling
- Secondary tags: Subtle styling in dropdown
- Active tag: Gold background

---

## Examples

### Example 1: Small Gallery (Few Images)
```
Artworks:
- Digital painting (3)
- Sketches (2)
- Concept (1)

Result:
[All] [More 3]
      ├── Digital painting (3)
      ├── Sketches (2)
      └── Concept (1)
```

### Example 2: Medium Gallery (Mixed)
```
Artworks:
- Digital (6)
- Sketches (5)
- Concept (2)
- Animation (1)

Result:
[All] [Digital] [Sketches] [More 2]
                            ├── Concept (2)
                            └── Animation (1)
```

### Example 3: Large Gallery (Many Images)
```
Artworks:
- Digital (15)
- Sketches (10)
- Concept (8)
- Animation (4)
- Fanart (2)
- Animation Studies (1)

Result:
[All] [Digital] [Sketches] [Concept] [More 2]
                                     ├── Animation (4)
                                     ├── Fanart (2)
                                     └── Animation Studies (1)
```

---

## Benefits

✅ **Clean Interface** — No tag explosion  
✅ **Better UX** — Easy to find common categories  
✅ **Scalable** — Works with 10 or 1000 images  
✅ **Smart** — Automatic categorization  
✅ **Professional** — Polished, organized look  

---

## Customization Options

### Option 1: Lower Threshold
Make more tags primary by lowering the threshold:
```javascript
const MIN_TAG_COUNT = 3; // More tags as primary
```

**Pros:** More categories visible  
**Cons:** Filter bar gets longer

### Option 2: Higher Threshold
Make fewer tags primary by raising the threshold:
```javascript
const MIN_TAG_COUNT = 10; // Fewer tags as primary
```

**Pros:** Very clean interface  
**Cons:** Most tags in "More" dropdown

### Option 3: No Dropdown (Show All)
Remove the "More" dropdown completely:
```javascript
const MIN_TAG_COUNT = 1; // All tags become primary
```

**Pros:** All categories visible  
**Cons:** Returns to potentially cluttered interface

---

## Troubleshooting

### "More" dropdown not showing?
- Check that you have secondary categories
- Ensure JSON metadata is valid
- Refresh the page

### Tags not filtering correctly?
- Verify category names match in metadata
- Check browser console for errors (F12)
- Ensure no typos in category field

### Tag counts are wrong?
- Count is automatic based on metadata
- Ensure each artwork has a category
- Verify no duplicate entries

---

## For Competition Submission

When submitting your portfolio:

1. **Keep the smart tagging enabled** — It looks professional
2. **Have 5+ images in your main category** — Shows the primary tag
3. **Document your tag strategy** — Optional explanation
4. **Test the dropdown** — Ensure it works smoothly

This feature demonstrates:
- ✅ Thoughtful UX design
- ✅ Smart JavaScript logic
- ✅ Professional interface
- ✅ Scalable solution

---

## Technical Details

### How It Works

1. **Count Frequencies**
   - Scan all artworks
   - Count how many use each category
   - Store in `categoryCount` object

2. **Classify Tags**
   - Tags with 5+ images → Primary
   - Tags with 1-4 images → Secondary
   - Sort appropriately

3. **Generate Buttons**
   - Create primary tag buttons directly
   - Create "More" dropdown for secondary tags
   - Add interactivity and filtering

4. **Handle Filtering**
   - Same filtering logic as before
   - Works with primary or secondary tags
   - No changes needed to gallery display

### Performance

- **Fast:** No external calls or dependencies
- **Lightweight:** Pure JavaScript, no libraries
- **Responsive:** Smooth transitions and animations
- **Scalable:** Works with any number of images

---

## Future Enhancements

Possible improvements (if needed):

- 🔜 Subcategories (nested tags)
- 🔜 Tag search functionality
- 🔜 Tag statistics/analytics
- 🔜 Custom tag weights
- 🔜 Tag recommendations

For now, the current system is optimal for portfolios!

---

## Summary

Your gallery now has a **smart, professional tag system** that:
- ✅ Automatically categorizes tags by frequency
- ✅ Keeps the interface clean and organized
- ✅ Provides a polished user experience
- ✅ Scales beautifully as your portfolio grows
- ✅ Requires zero configuration

**No changes needed to your workflow** — it just works!
