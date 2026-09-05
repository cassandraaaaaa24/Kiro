# Multi-Tag System Guide

## What Changed?

Your portfolio now uses **comma-separated tags** instead of a single category field. This allows each artwork to have **multiple tags**, making filtering more powerful and granular.

---

## Old System vs New System

### Before (Single Category)
```json
{
  "filename": "painting.jpg",
  "title": "My Painting",
  "category": "digital"  ← Only ONE tag
}
```

**Problem:** A painting that's both digital AND a character study can only be tagged as one or the other.

### After (Multiple Tags)
```json
{
  "filename": "painting.jpg",
  "title": "My Painting",
  "tags": "digital, character study, concept"  ← Multiple tags!
}
```

**Benefit:** Artwork appears when filtering by ANY of these tags.

---

## Metadata Format

### Complete Example

```json
{
  "artworks": [
    {
      "filename": "painting-1.jpg",
      "title": "Character Design Study",
      "description": "Digital painting on canvas",
      "tags": "digital, character design, study, concept",
      "year": 2024
    },
    {
      "filename": "sketch-1.png",
      "title": "Quick Sketch",
      "description": "Charcoal sketch",
      "tags": "sketches, study, figure drawing",
      "year": 2024
    },
    {
      "filename": "environment.jpg",
      "title": "Environment Concept",
      "description": "Environmental design",
      "tags": "concept, environment, digital, animation",
      "year": 2024
    }
  ]
}
```

---

## Tag Guidelines

### Formatting Rules

✅ **DO:**
- Use lowercase: `digital`, `character design`, `concept`
- Separate by comma: `"digital, concept, study"`
- Use descriptive names: `"character design"` not `"char des"`
- Include whitespace after comma: `"tag1, tag2, tag3"`

❌ **DON'T:**
- Mix cases: `"Digital, CONCEPT"` (use consistent lowercase)
- Use special characters: `"digital_concept"` or `"digital-concept"`
- Overuse tags: More than 5 per artwork is excessive
- Use vague tags: `"work"`, `"art"` (be specific)

### Tag Examples

**Digital Painting:**
```
"digital, painting, study, landscape"
```

**Character Sketch:**
```
"sketches, character, study, figure drawing"
```

**Concept Art:**
```
"concept, character design, environment, animation"
```

**Mixed Media:**
```
"mixed media, drawing, painting, study"
```

---

## How Tags Work in Gallery

### Frequency-Based Organization

The system **automatically counts tag frequencies** and organizes them:

**Counting Example:**
```
Artworks:
1. "digital, character, study"
2. "digital, painting, concept"
3. "digital, environment, animation"
4. "sketches, study, figure"
5. "sketches, figure, portrait"
6. "sketches, character, study"

Tag Counts:
- digital: 3 ✅ Primary (≥5)
- sketches: 3 ✅ Primary (≥5)
- study: 3 ✅ Primary (≥5)
- character: 2 ❌ Secondary (<5)
- painting: 1 ❌ Secondary (<5)
- concept: 1 ❌ Secondary (<5)
- environment: 1 ❌ Secondary (<5)
- animation: 1 ❌ Secondary (<5)
- figure: 2 ❌ Secondary (<5)
- portrait: 1 ❌ Secondary (<5)
```

**Filter Buttons:**
```
[All] [Digital] [Sketches] [Study] [More 7]
                                   ├── Animation (1)
                                   ├── Character (2)
                                   ├── Concept (1)
                                   ├── Environment (1)
                                   ├── Figure (2)
                                   ├── Painting (1)
                                   └── Portrait (1)
```

### Filtering Behavior

When you click a tag, **only artworks with that tag appear**:

**Example:** Click "Digital"
```
Shows:
✓ Artwork 1 (has "digital" tag)
✓ Artwork 2 (has "digital" tag)
✓ Artwork 3 (has "digital" tag)
✗ Artwork 4 (no "digital" tag)
✗ Artwork 5 (no "digital" tag)
✗ Artwork 6 (no "digital" tag)
```

**Example:** Click "Character"
```
Shows:
✓ Artwork 1 (has "character" tag)
✗ Artwork 2 (no "character" tag)
✗ Artwork 3 (no "character" tag)
✗ Artwork 4 (no "character" tag)
✗ Artwork 5 (no "character" tag)
✓ Artwork 6 (has "character" tag)
```

---

## Gallery Display

### Tag Badges on Artwork

Each artwork displays **all its tags as small badges**:

```
┌─────────────────────────────────┐
│                                 │
│      [Artwork Image]            │
│                                 │
├─────────────────────────────────┤
│ Character Design Study          │
│ Digital painting on canvas      │
│                                 │
│ [digital] [character] [study]   │ ← Tag badges
│ [concept]         2024          │
└─────────────────────────────────┘
```

---

## Backward Compatibility

### Migration from Old Format

If you have old metadata with `"category"` field:

**Old:**
```json
{ "category": "digital" }
```

**New:**
```json
{ "tags": "digital" }
```

**System Supports Both!** The code checks for `tags` first, then falls back to `category`.

---

## Admin Panel Updates

### Adding Artwork with Tags

**Via Form:**
1. Go to `/admin.html`
2. Fill "Tags" field: `"digital, concept, character"`
3. Click "Add Artwork"
4. Refresh gallery

**Via JSON Editor:**
1. Go to `/admin.html`
2. Edit JSON directly
3. Change `"category": "X"` to `"tags": "X, Y, Z"`
4. Click "Save Changes"

### Example in Admin

```json
{
  "filename": "my-art.jpg",
  "title": "My Artwork",
  "description": "A beautiful painting",
  "tags": "digital, painting, study, character design",
  "year": 2024
}
```

---

## Real-World Examples

### Example 1: Digital Painter

**Portfolio Size:** 8 paintings

```
Artwork 1: "digital, painting, landscape"
Artwork 2: "digital, painting, portrait"
Artwork 3: "digital, painting, still life"
Artwork 4: "digital, painting, abstract"
Artwork 5: "digital, painting, fantasy"
Artwork 6: "digital, study, color theory"
Artwork 7: "digital, study, anatomy"
Artwork 8: "digital, concept art"

Tag Counts:
- digital: 8 ✅ Primary
- painting: 5 ✅ Primary
- study: 2 ❌ Secondary
- concept art: 1 ❌ Secondary
- landscape: 1 ❌ Secondary
- portrait: 1 ❌ Secondary
- still life: 1 ❌ Secondary
- abstract: 1 ❌ Secondary
- fantasy: 1 ❌ Secondary
- color theory: 1 ❌ Secondary
- anatomy: 1 ❌ Secondary

Filters:
[All] [Digital] [Painting] [More 9]
```

### Example 2: Concept Artist

**Portfolio Size:** 12 pieces

```
Artwork 1: "concept, character, digital"
Artwork 2: "concept, character, digital"
Artwork 3: "concept, character, digital"
Artwork 4: "concept, environment, digital"
Artwork 5: "concept, environment, digital"
Artwork 6: "concept, animation, digital"
Artwork 7: "sketches, character, study"
Artwork 8: "sketches, figure drawing"
Artwork 9: "sketches, gesture study"
Artwork 10: "digital, illustration"
Artwork 11: "digital, illustration"
Artwork 12: "digital, matte painting"

Tag Counts:
- digital: 10 ✅ Primary
- concept: 6 ✅ Primary
- sketches: 3 ❌ Secondary
- character: 3 ❌ Secondary
- animation: 1 ❌ Secondary
- environment: 2 ❌ Secondary
- study: 2 ❌ Secondary
- figure drawing: 1 ❌ Secondary
- gesture study: 1 ❌ Secondary
- illustration: 2 ❌ Secondary
- matte painting: 1 ❌ Secondary

Filters:
[All] [Digital] [Concept] [More 9]
```

---

## Tag Strategy Tips

### Keep It Organized

**Good approach:**
- Use 3-5 tags per artwork
- Reuse common tags across many works
- Be consistent with naming
- Use specific, descriptive tags

**Avoid:**
- Too many unique tags (>20 total)
- One-off tags (only used once)
- Vague tags like "work" or "art"
- Inconsistent naming ("Digital" vs "digital")

### Smart Tag Selection

**For each artwork, ask:**
1. What medium? (digital, traditional, mixed)
2. What subject? (character, landscape, portrait)
3. What type? (study, finished, concept)
4. What style? (animation, illustration, concept art)
5. Any special notes? (fanart, commission, series)

**Example: A fanart character study**
```
"fanart, character study, digital painting, portrait"
```

---

## Troubleshooting

### Tags not appearing as filters?

- **Check count:** You need 5+ artworks with the same tag for it to be primary
- **Check spelling:** Tags are case-sensitive ("Digital" ≠ "digital")
- **Check JSON:** Ensure tags field exists and is properly formatted
- **Refresh:** Clear browser cache and refresh page

### Artwork not showing when filtering?

- **Check tags:** Verify the artwork has the tag you're filtering for
- **Check spelling:** Exact match required (including spaces)
- **Check JSON:** Ensure data-tags attribute is set correctly
- **Try different tag:** Filter by a different tag to verify functionality

### Too many tags in "More"?

- **Add more artworks** with common tags
- **Consolidate tags** - combine similar tags
- **Raise threshold:** Edit `js/main.js` line 51 to `const MIN_TAG_COUNT = 10;`

---

## Performance Notes

- ✅ No performance impact with multi-tags
- ✅ Filtering is instant
- ✅ Scales to 100+ tags
- ✅ Works on mobile

---

## For Competition Submission

**Multi-tag system demonstrates:**
- ✅ More sophisticated metadata design
- ✅ Better understanding of user experience
- ✅ More powerful JavaScript logic
- ✅ Professional portfolio practices

**Your artwork gets better visibility** because it can match multiple filter queries!

---

## Summary

**Old System:**
```
"category": "digital"  ← One tag per artwork
```

**New System:**
```
"tags": "digital, painting, study, character"  ← Multiple tags!
```

**Benefits:**
- ✅ More descriptive metadata
- ✅ Better filtering options
- ✅ Artwork appears in multiple categories
- ✅ More professional approach
- ✅ Scales better with growing portfolio

**No extra complexity** — just comma-separated values!
