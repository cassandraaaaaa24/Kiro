/* ============================================================
   Manus Vindictae Portfolio - Main JavaScript
   ============================================================ */

// Gallery data
let galleryData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadGalleryData();
    initializeCustomCursor();
    initializeAmbientAudio();
    initializeFormHandling();
    initializeSmoothScroll();
});

/* ============================================================
   Load Gallery Data from JSON
   ============================================================ */

async function loadGalleryData() {
    try {
        // Check if admin saved data to localStorage
        const localData = localStorage.getItem('galleryMetadata');
        
        if (localData) {
            galleryData = JSON.parse(localData);
            console.log('✓ Loaded gallery from browser storage');
        } else {
            // Fall back to JSON file
            const response = await fetch('data/gallery-metadata.json');
            galleryData = await response.json();
            console.log('✓ Loaded gallery from metadata file');
        }
        
        if (galleryData.artworks) {
            generateGallery(galleryData.artworks);
            generateFilters(galleryData.artworks);
            initializeGalleryInteractions();
        }
    } catch (error) {
        console.log('Gallery metadata not found. Using placeholder gallery.');
        generatePlaceholderGallery();
    }
}

/* ============================================================
   Generate Gallery Items Dynamically
   ============================================================ */

function generateGallery(artworks) {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    artworks.forEach((artwork, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Parse tags (comma-separated or fallback to category)
        const tags = artwork.tags 
            ? artwork.tags.split(',').map(t => t.trim()).join(', ')
            : (artwork.category || 'uncategorized');
        
        item.setAttribute('data-tags', tags);
        item.setAttribute('data-index', index);

        const imagePath = `assets/images/${artwork.filename}`;
        
        item.innerHTML = `
            <img class="gallery-image" src="${imagePath}" alt="${artwork.title}" loading="lazy">
            <div class="gallery-info">
                <h3>${artwork.title}</h3>
                <p>${artwork.description}</p>
                <div class="gallery-meta">
                    <div class="tags-container">
                        ${tags.split(', ').map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
                    </div>
                    <span class="year-badge">${artwork.year}</span>
                </div>
            </div>
        `;

        galleryGrid.appendChild(item);
    });
}

/* ============================================================
   Generate Filter Buttons Dynamically (Smart Tag Aggregation)
   ============================================================ */

function generateFilters(artworks) {
    const filtersContainer = document.getElementById('gallery-filters');
    const MIN_TAG_COUNT = 5; // Threshold for primary tags
    
    // Count tag frequencies (supporting multi-tags)
    const tagCount = {};
    artworks.forEach(artwork => {
        // Parse tags (comma-separated or fallback to category)
        const tags = artwork.tags 
            ? artwork.tags.split(',').map(t => t.trim())
            : (artwork.category ? [artwork.category] : ['uncategorized']);
        
        tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });
    
    // Separate primary and secondary tags
    const primaryTags = Object.keys(tagCount)
        .filter(tag => tagCount[tag] >= MIN_TAG_COUNT)
        .sort((a, b) => tagCount[b] - tagCount[a]);
    
    const secondaryTags = Object.keys(tagCount)
        .filter(tag => tagCount[tag] < MIN_TAG_COUNT)
        .sort();
    
    // Clear existing filters
    filtersContainer.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>';
    
    // Add primary tag buttons
    primaryTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn primary-tag';
        btn.setAttribute('data-filter', tag);
        btn.setAttribute('data-tag-type', 'primary');
        btn.textContent = tag;
        btn.title = `${tagCount[tag]} works`;
        filtersContainer.appendChild(btn);
    });
    
    // Add "More" dropdown if there are secondary tags
    if (secondaryTags.length > 0) {
        const moreBtn = document.createElement('div');
        moreBtn.className = 'filter-more-container';
        
        const moreToggle = document.createElement('button');
        moreToggle.className = 'filter-btn more-toggle';
        moreToggle.innerHTML = `More <span class="more-count">${secondaryTags.length}</span>`;
        
        const moreDropdown = document.createElement('div');
        moreDropdown.className = 'filter-more-dropdown';
        
        secondaryTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn secondary-tag';
            btn.setAttribute('data-filter', tag);
            btn.setAttribute('data-tag-type', 'secondary');
            btn.textContent = `${tag} (${tagCount[tag]})`;
            moreDropdown.appendChild(btn);
        });
        
        // Toggle dropdown on click
        moreToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            moreDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function() {
            moreDropdown.classList.remove('show');
        });
        
        moreBtn.appendChild(moreToggle);
        moreBtn.appendChild(moreDropdown);
        filtersContainer.appendChild(moreBtn);
    }

    // Add filter event listeners
    const filterBtns = filtersContainer.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Close dropdown if open
            const moreDropdown = filtersContainer.querySelector('.filter-more-dropdown');
            if (moreDropdown) moreDropdown.classList.remove('show');

            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items (check if tag is in item's tags)
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    // Check if tag is in the item's tags
                    const itemTags = item.getAttribute('data-tags').split(', ');
                    if (itemTags.includes(filterValue)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Make "All" button functional
    const allBtn = filtersContainer.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close dropdown if open
            const moreDropdown = filtersContainer.querySelector('.filter-more-dropdown');
            if (moreDropdown) moreDropdown.classList.remove('show');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            galleryItems.forEach(item => {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            });
        });
    }
}

/* ============================================================
   Initialize Gallery Interactions (Lightbox, Likes)
   ============================================================ */

function initializeGalleryInteractions() {
    const modal = document.getElementById('gallery-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const artwork = galleryData.artworks[index];
            const imagePath = `assets/images/${artwork.filename}`;
            
            document.getElementById('modal-title').textContent = artwork.title;
            document.getElementById('modal-description').textContent = artwork.description;
            document.getElementById('modal-image').src = imagePath;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

/* ============================================================
   Placeholder Gallery (Fallback)
   ============================================================ */

function generatePlaceholderGallery() {
    const placeholders = [
        { title: 'Untitled Sketch I', description: 'Ink on paper', category: 'sketches' },
        { title: 'Digital Study', description: 'Digital painting', category: 'digital' },
        { title: 'Character Concept', description: 'Concept art', category: 'concept' },
        { title: 'Untitled Sketch II', description: 'Charcoal study', category: 'sketches' },
        { title: 'Ethereal Forms', description: 'Digital painting', category: 'digital' },
        { title: 'Environment Design', description: 'Concept art', category: 'concept' },
        { title: 'Gesture Studies', description: 'Mixed media', category: 'sketches' },
        { title: 'Temporal Resonance', description: 'Digital painting', category: 'digital' }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    placeholders.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', item.category);
        div.innerHTML = `
            <div class="gallery-placeholder">
                <div class="placeholder-icon">◆</div>
            </div>
            <div class="gallery-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        galleryGrid.appendChild(div);
    });

    generateFilters(placeholders);
}


/* ============================================================
   Custom Cursor (Enhanced)
   ============================================================ */

function initializeCustomCursor() {
    const body = document.body;
    let mouseX = 0;
    let mouseY = 0;

    // Optional: Add interactive cursor effect
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Change cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%229%22 fill=%22none%22 stroke=%22%23D4AF37%22 stroke-width=%222%22/%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%223%22 fill=%22%23D4AF37%22/%3E%3C/svg%3E") 12 12, pointer';
        });

        el.addEventListener('mouseleave', function() {
            body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%22none%22 stroke=%22%23D4AF37%22 stroke-width=%221.5%22/%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%222%22 fill=%22%23D4AF37%22/%3E%3C/svg%3E") 10 10, auto';
        });
    });
}

/* ============================================================
   Ambient Audio Toggle
   ============================================================ */

function initializeAmbientAudio() {
    // This is a placeholder for ambient audio functionality
    // To fully implement, add an audio element to HTML and create toggle UI
    
    const audioToggle = document.getElementById('audio-toggle');
    if (!audioToggle) {
        // Create audio toggle button if it doesn't exist
        createAudioToggle();
    }
}

function createAudioToggle() {
    // Create audio toggle button and styles dynamically
    const audioBtn = document.createElement('button');
    audioBtn.id = 'audio-toggle';
    audioBtn.className = 'audio-toggle';
    audioBtn.textContent = '🔊';
    audioBtn.setAttribute('aria-label', 'Toggle ambient audio');
    audioBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(30, 58, 138, 0.3);
        border: 2px solid #D4AF37;
        color: #EAEAEA;
        cursor: pointer;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Create audio element (currently muted for demo)
    const audio = document.createElement('audio');
    audio.id = 'ambient-audio';
    audio.loop = true;
    audio.volume = 0.3;
    // Note: Add your actual audio file URL here
    // audio.src = 'assets/audio/ambient.mp3';
    document.body.appendChild(audio);

    // Toggle audio on button click
    let isPlaying = false;
    audioBtn.addEventListener('click', function() {
        if (!isPlaying) {
            audio.play().catch(e => console.log('Audio play prevented:', e));
            audioBtn.textContent = '🔊';
            isPlaying = true;
        } else {
            audio.pause();
            audioBtn.textContent = '🔇';
            isPlaying = false;
        }
    });

    // Hover effects
    audioBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
        this.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.3)';
    });

    audioBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
        this.style.boxShadow = 'none';
    });

    document.body.appendChild(audioBtn);
}

/* ============================================================
   Form Handling
   ============================================================ */

function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // For now, just show a message
        // In production, this would send to a backend or service like Formspree
        alert(`Thank you for reaching out, ${name}!\n\nYour message has been received. We'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

/* ============================================================
   Smooth Scroll (Enhanced)
   ============================================================ */

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================================
   Utility: Add animation styles to head if not exists
   ============================================================ */

function injectAnimationStyles() {
    if (document.getElementById('animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

injectAnimationStyles();

console.log('✦ Manus Vindictae Portfolio initialized ✦');
