/* ============================================================
   Admin Panel JavaScript
   ============================================================ */

let galleryMetadata = { artworks: [] };

document.addEventListener('DOMContentLoaded', function() {
    loadMetadata();
    initializeAdminEvents();
});

/* ============================================================
   Load Metadata
   ============================================================ */

async function loadMetadata() {
    try {
        const response = await fetch('data/gallery-metadata.json');
        galleryMetadata = await response.json();
        updateMetadataEditor();
    } catch (error) {
        console.error('Error loading metadata:', error);
        galleryMetadata = { artworks: [] };
        document.getElementById('metadata-editor').value = JSON.stringify(galleryMetadata, null, 2);
    }
}

/* ============================================================
   Update Metadata Editor
   ============================================================ */

function updateMetadataEditor() {
    const editor = document.getElementById('metadata-editor');
    editor.value = JSON.stringify(galleryMetadata, null, 2);
}

/* ============================================================
   Initialize Admin Events
   ============================================================ */

function initializeAdminEvents() {
    // Export metadata
    document.getElementById('export-btn').addEventListener('click', exportMetadata);

    // Import metadata
    document.getElementById('import-btn').addEventListener('click', function() {
        document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', importMetadata);

    // Add artwork form
    document.getElementById('add-artwork-form').addEventListener('submit', addArtwork);

    // Save metadata
    document.getElementById('save-metadata-btn').addEventListener('click', saveMetadata);
}

/* ============================================================
   Export Metadata
   ============================================================ */

function exportMetadata() {
    const dataStr = JSON.stringify(galleryMetadata, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gallery-metadata-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showStatus('✓ Metadata exported successfully', 'success');
}

/* ============================================================
   Import Metadata
   ============================================================ */

function importMetadata(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            
            if (imported.artworks && Array.isArray(imported.artworks)) {
                galleryMetadata = imported;
                updateMetadataEditor();
                showStatus('✓ Metadata imported successfully', 'success');
            } else {
                throw new Error('Invalid format: missing artworks array');
            }
        } catch (error) {
            showStatus('✗ Error importing metadata: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

/* ============================================================
   Add Artwork via Form
   ============================================================ */

function addArtwork(event) {
    event.preventDefault();

    const filename = document.getElementById('artwork-filename').value.trim();
    const title = document.getElementById('artwork-title').value.trim();
    const description = document.getElementById('artwork-description').value.trim();
    const category = document.getElementById('artwork-category').value.trim().toLowerCase();
    const year = parseInt(document.getElementById('artwork-year').value) || new Date().getFullYear();

    if (!filename || !title || !description || !category) {
        showStatus('✗ All fields are required', 'error');
        return;
    }

    const newArtwork = {
        filename: filename,
        title: title,
        description: description,
        category: category,
        year: year
    };

    galleryMetadata.artworks.push(newArtwork);
    updateMetadataEditor();

    // Clear form
    document.getElementById('add-artwork-form').reset();
    document.getElementById('artwork-year').value = new Date().getFullYear();

    showStatus(`✓ Added "${title}" to gallery`, 'success');
}

/* ============================================================
   Save Metadata
   ============================================================ */

function saveMetadata() {
    const editor = document.getElementById('metadata-editor');
    
    try {
        const parsed = JSON.parse(editor.value);
        
        if (!parsed.artworks || !Array.isArray(parsed.artworks)) {
            throw new Error('Invalid format: must have artworks array');
        }

        galleryMetadata = parsed;

        // Save to localStorage (persists in browser)
        localStorage.setItem('galleryMetadata', JSON.stringify(galleryMetadata));

        showStatus('✓ Changes saved to browser storage', 'success');
        
        // Notify user to refresh gallery
        setTimeout(() => {
            alert('Metadata saved! Refresh the gallery page to see your changes.');
        }, 500);

    } catch (error) {
        showStatus('✗ Invalid JSON: ' + error.message, 'error');
    }
}

/* ============================================================
   Status Messages
   ============================================================ */

function showStatus(message, type) {
    const statusEl = document.getElementById('save-status');
    statusEl.textContent = message;
    statusEl.className = `save-status ${type}`;

    setTimeout(() => {
        statusEl.className = 'save-status hidden';
    }, 4000);
}

/* ============================================================
   Tips
   ============================================================ */

console.log(`
╔════════════════════════════════════════════════════════════╗
║          Manus Vindictae Admin Panel                       ║
╚════════════════════════════════════════════════════════════╝

📝 Setup Instructions:
  1. Add your artwork images to: assets/images/
  2. Use the form or edit JSON to add artwork info
  3. Click "Save Changes"
  4. Refresh the gallery page

💾 Backup:
  - Click "Export Metadata" to download your data
  - Save the file as backup

📤 Restore:
  - Click "Import Metadata" to upload from file

⚠️  Important:
  - Data is stored in browser localStorage
  - For permanent storage, export and save files
  - To sync with live site, you'll need to manually
    update data/gallery-metadata.json

Need help? Check GALLERY_SETUP.md for more info.
`);
