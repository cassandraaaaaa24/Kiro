# Migration Guide: Single Category → Multi-Tag System

## Quick Summary

The portfolio has been updated to use **comma-separated multi-tags** instead of a single category field.

**Good news:** You don't have to change anything right now! The system is backward compatible.

---

## Before vs After

### Old Format (Still Works!)
```json
{
  "filename": "artwork.jpg",
  "title": "My Artwork",
  "category": "digital",
  "year": 2024
}
```

### New Format (Recommended)
```json
{
  "filename": "artwork.jpg",
  "title": "My Artwork",
  "tags": "digital, painting, study",
  "year": 2024
}
```

---

## Do I Need to Update?

### No, Not Immediately

The system supports both formats:
- ✅ Old `"category"` field still works
- ✅ New `"tags"` field is preferred
- ✅ You can mix both in the same gallery
- ✅ No breaking changes

### Yes, When...

Update to the new format when:
- You want **better filtering** with multiple tags
- You're adding **new artwork** to your portfolio
- You want to showcase the **best practices** for the competition
- You want each artwork to appear in **multiple categories**

---

## Migration Steps

### Step 1: Backup Your Current Metadata

**Before making changes:**

1. Go to `/admin.html`
2. Click "Export Metadata"
3. Save the JSON file safely

This way you can always revert if needed!

---

### Step 2: Update One Artwork (Test)

**Pick one artwork to update first:**

**Before:**
```json
{
  "filename": "painting-1.jpg",
  "title": "Digital Study",
  "description": "Oil painting study",
  "category": "digital",
  "year": 2024
}
```

**After:**
```json
{
  "filename": "painting-1.jpg",
  "title": "Digital Study",
  "description": "Oil painting study",
  "tags": "digital, painting, study",
  "year": 2024
}
```

**Steps:**
1. Go to `/admin.html`
2. Click in the JSON editor (scroll down)
3. Find the artwork in the JSON
4. Replace `"category": "digital"` with `"tags": "digital, painting, study"`
5. Remove the old category line
6. Click "Save Changes"
7. Refresh `/gallery.html`
8. Verify it works!

---

### Step 3: Update the Rest

Once the first one works, you have options:

#### Option A: Quick Update (Copy-Paste)

1. In the JSON editor, select all old data:
   ```json
   "category": "digital",
   ```

2. Replace with new format:
   ```json
   "tags": "digital, painting",
   ```

3. Do this for each artwork

#### Option B: Rewrite (Fresh Start)

1. Copy your current JSON
2. Paste into a text editor
3. Replace all `"category"` with `"tags"`
4. Add additional tags manually for each artwork
5. Paste the updated JSON back into admin panel

#### Option C: Delete & Re-add

1. Clear all artworks from JSON
2. Add them fresh with multi-tags via the admin form
3. Fastest if you don't have many artworks

---

## Tag Naming Convention

### When Migrating, Use These Tags

For each artwork, provide 3-5 tags:

**Medium (how):**
- digital
- traditional
- mixed media
- watercolor
- oil painting
- sketch
- illustration

**Subject (what):**
- character
- landscape
- portrait
- still life
- environment
- abstract
- figure

**Type (why):**
- study
- concept
- finished
- fanart
- commission
- sketch
- animation

**Example Migration:**

```
OLD:
"category": "digital"

NEW:
"tags": "digital, character design, concept art"

OR

"tags": "digital, painting, portrait, study"

OR

"tags": "digital, animation, environment, fanart"
```

---

## Common Migration Scenarios

### Scenario 1: Small Gallery (5 artworks)

**Time:** 5 minutes
**Effort:** Manual update

1. Go to `/admin.html`
2. Edit JSON directly
3. Change each entry manually
4. Save and refresh

### Scenario 2: Medium Gallery (20 artworks)

**Time:** 15 minutes
**Effort:** Semi-automated

1. Export current metadata
2. Open in text editor
3. Find & Replace `"category"` with `"tags"`
4. Manually add additional tags for each
5. Import updated JSON

### Scenario 3: Large Gallery (50+ artworks)

**Time:** 30+ minutes
**Effort:** Batch processing

1. Export metadata
2. Use find & replace tool
3. Add bulk tag data
4. Verify in admin panel
5. Import to live gallery

---

## Verification Checklist

After migration, verify:

- [ ] All artworks display in gallery
- [ ] Filter tags appear in gallery
- [ ] Clicking a tag filters correctly
- [ ] Multiple tags per artwork work
- [ ] "More" dropdown shows secondary tags
- [ ] Mobile view works correctly
- [ ] No console errors (F12)

---

## JSON Editor Find & Replace

### Quick Find & Replace Example

**Use this in your text editor (VS Code, Notepad++, etc.):**

Find:
```
"category": "digital"
```

Replace with:
```
"tags": "digital, painting, study"
```

Do this for each unique category value.

---

## Rollback If Needed

If something goes wrong:

1. Go to `/admin.html`
2. Click "Import Metadata"
3. Select your backup JSON file
4. Click "Save Changes"
5. Back to old format!

---

## Recommended Migration Path

### For Competition Submission:

**Week 1:** Keep old format, add new artwork as multi-tags
- New artworks: Use multi-tag format
- Old artworks: Can stay as single category

**Week 2:** Gradually update old artworks to multi-tags
- Update 5 per day
- No rush, do it gradually

**Week 3:** Verify everything works
- All artworks display correctly
- Filtering works properly
- Mobile responsive

**Submission:** All artworks have multi-tags
- Better demonstration of system
- More professional
- Better filtering

---

## Backward Compatibility

### This Still Works:

```json
{
  "filename": "old-artwork.jpg",
  "title": "Old Format",
  "category": "digital",
  "year": 2024
}
```

The system automatically converts it to tags internally.

### This Works Too:

```json
{
  "filename": "new-artwork.jpg",
  "title": "New Format",
  "tags": "digital, painting",
  "year": 2024
}
```

You can mix both in the same gallery!

---

## FAQ

**Q: Do I HAVE to migrate?**  
A: No. Old format still works. But multi-tags are better for filtering and presentation.

**Q: Will I lose data if I update?**  
A: No. Just backup first (export metadata) and you're safe.

**Q: How long does migration take?**  
A: 5 minutes for small galleries, 30+ for large ones.

**Q: Can I do it gradually?**  
A: Yes! New artworks can use multi-tags while old ones keep single category.

**Q: Will it break my gallery?**  
A: No. System supports both formats simultaneously.

**Q: Should I do this before competition?**  
A: Yes. Multi-tags look more professional and show better design thinking.

---

## Need Help?

### Stuck on JSON format?

Check the examples:
- `MULTI_TAG_GUIDE.md` - Detailed tag examples
- `data/gallery-metadata.json` - See actual format

### Still not working?

1. Check browser console: F12 → Console
2. Verify JSON is valid: [jsonlint.com](https://jsonlint.com)
3. Clear browser cache and refresh
4. Try importing a backup and starting over

---

## Summary

| Aspect | Status |
|--------|--------|
| **Backward Compatible** | ✅ Yes |
| **Required** | ❌ No |
| **Recommended** | ✅ Yes |
| **Easy to Update** | ✅ Yes |
| **Time to Migrate** | ⏱️ 5-30 min |
| **Can Rollback** | ✅ Yes |

**Next steps:**
1. Backup your metadata (export from admin)
2. Try updating one artwork
3. Verify it works
4. Update the rest gradually

You've got this! 🎨
