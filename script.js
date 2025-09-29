
// Configuration - Set offer end date as a string (e.g., "29 Sept 2025")
const offerConfig = {
    endDateString: "31 Oct 2025"
};

let countdownEndDate;

// Initialize countdown end date from string
function initializeCountdown() {
    if (offerConfig.endDateString) {
        // Parse date string (supports formats like "29 Sept 2025" or "2025-09-29")
        countdownEndDate = new Date(offerConfig.endDateString);
        if (isNaN(countdownEndDate.getTime())) {
            // Fallback: try parsing as ISO
            countdownEndDate = new Date(Date.parse(offerConfig.endDateString));
        }
    } else {
        // Default: 24 hours from now
        countdownEndDate = new Date();
        countdownEndDate.setTime(countdownEndDate.getTime() + (24 * 60 * 60 * 1000));
    }
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeNavBtn = document.getElementById('closeNavBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

function openMobileNav() {
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

mobileMenuBtn.addEventListener('click', openMobileNav);
closeNavBtn.addEventListener('click', closeMobileNav);
overlay.addEventListener('click', closeMobileNav);

// FAQ toggle functionality with smooth transitions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Countdown timer with configurable offer period


function updateCountdown() {
    const now = new Date();
    const difference = countdownEndDate - now;
    const countdownText = document.querySelector('.countdown-text');
    const countdownElem = document.querySelector('.countdown');
    const endDateString = offerConfig.endDateString || countdownEndDate.toLocaleDateString();
    const offerEndDateSpan = document.getElementById('offerEndDate');
    const daysUnit = document.getElementById('daysUnit');
    const secondsUnit = document.getElementById('secondsUnit');

    // Show offer end date in red under timer
    if (offerEndDateSpan) {
        offerEndDateSpan.textContent = `Offer Ends On: ${endDateString}`;
        offerEndDateSpan.style.color = '#e74c3c';
        offerEndDateSpan.style.fontWeight = 'bold';
    }

    if (difference <= 0) {
        // Show alarm message when timer expires
        countdownText.innerHTML = 'Special Offer is Ending Soon!';
        countdownText.style.color = '#e74c3c';
        countdownText.style.fontWeight = 'bold';
        countdownText.style.fontSize = '1.3rem';
        countdownElem.style.animation = 'pulse 1s infinite';
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        if (daysUnit) daysUnit.style.display = 'none';
        if (secondsUnit) secondsUnit.style.display = 'inline-block';
        return;
    }

    // Calculate time units
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    if (days >= 1) {
        // Show days/hours/minutes, hide seconds
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = '--';
        if (daysUnit) daysUnit.style.display = 'inline-block';
        if (secondsUnit) secondsUnit.style.display = 'none';
        countdownText.innerHTML = `Special offer ends in:`;
    } else {
        // Show hours/minutes/seconds, hide days
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        if (daysUnit) daysUnit.style.display = 'none';
        if (secondsUnit) secondsUnit.style.display = 'inline-block';
        countdownText.innerHTML = `Special offer ends in:`;
    }
}

// Initialize countdown and start timer
initializeCountdown();
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile nav if open
            closeMobileNav();

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Color variants configuration
const colorVariants = {
    black: {
        images: [
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-2.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-3.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp'
        ]
    },
    white: {
        images: [
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp',
            'https://headphonezoo.com/wp-content/themes/headphonezonn-theme-1/foldable-p47-wireless-headphone/foldable-p47-wireless-headphone-1.webp'
        ]
    },
};

// Image Gallery Functionality
class ImageGallery {
    constructor() {
        this.currentIndex = 0;
        this.currentColor = 'black';
        this.images = colorVariants[this.currentColor].images;

        this.mainImage = document.getElementById('mainImage');
        this.mainVideo = document.getElementById('mainVideo');
        this.modalVideo = document.getElementById('modalVideo');
        this.modalImage = document.getElementById('modalImage');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.imageModal = document.getElementById('imageModal');
        this.modalClose = document.getElementById('modalClose');

        this.init();
    }

    init() {
        // Show video initially and hide image if video exists
        if (this.mainVideo) {
            this.isVideoVisible = true;
            this.mainImage.style.display = 'none';
            this.mainVideo.style.display = 'block';
            // Ensure autoplay muted for mobile browsers
            try {
                this.mainVideo.muted = true;
                const playPromise = this.mainVideo.play();
                if (playPromise && typeof playPromise.then === 'function') {
                    playPromise.catch(() => {/* ignore autoplay restrictions */ });
                }
            } catch (_) { }
        } else {
            this.isVideoVisible = false;
        }

        // Thumbnail click handlers
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                if (thumbnail.dataset.type === 'video') {
                    this.showVideo();
                    this.setActiveThumbnailVideo();
                } else {
                    const adjustedIndex = this.hasVideoThumb() ? index - 1 : index;
                    if (adjustedIndex >= 0) {
                        this.setActiveImage(adjustedIndex);
                    }
                }
            });
        });

        // Ensure initial thumbnail active states reflect initial video visibility
        this.updateThumbnails();

        // Gallery navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.previousImage();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextImage();
        });

        // Zoom button
        document.getElementById('zoomBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Modal navigation
        document.getElementById('modalPrevBtn').addEventListener('click', () => {
            this.previousImage();
            this.updateModalImage();
        });

        document.getElementById('modalNextBtn').addEventListener('click', () => {
            this.nextImage();
            this.updateModalImage();
        });

        // Modal close
        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on overlay click
        this.imageModal.addEventListener('click', (e) => {
            if (e.target === this.imageModal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.imageModal.classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        this.updateModalImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        this.updateModalImage();
                        break;
                }
            }
        });

        // Touch/swipe support for mobile
        this.addTouchSupport();
        // Add swipe support for modal media as well
        this.addModalTouchSupport();
        // Enable horizontal wheel scroll for thumbnails for easier desktop navigation
        this.enableThumbnailWheelScroll();

        // Color selection functionality
        this.initColorSelection();

        // If user remains on video, loop playback when it ends
        if (this.mainVideo) {
            this.mainVideo.addEventListener('ended', () => {
                if (this.isVideoVisible) {
                    try { this.mainVideo.currentTime = 0; this.mainVideo.play(); } catch (_) { }
                }
            });
        }
    }

    hideVideoIfVisible() {
        if (this.mainVideo && this.isVideoVisible) {
            try { this.mainVideo.pause(); } catch (_) { }
            this.mainVideo.style.display = 'none';
            this.mainImage.style.display = 'block';
            this.isVideoVisible = false;
        }
    }

    showVideo() {
        if (!this.mainVideo) return;
        this.isVideoVisible = true;
        this.mainImage.style.display = 'none';
        this.mainVideo.style.display = 'block';
        try {
            this.mainVideo.muted = true;
            this.mainVideo.currentTime = 0;
            const p = this.mainVideo.play();
            if (p && typeof p.then === 'function') p.catch(() => { });
        } catch (_) { }
        // Reflect active state on thumbnails
        this.updateThumbnails();
    }

    hasVideoThumb() {
        return Array.from(this.thumbnails).some(t => t.dataset.type === 'video');
    }

    setActiveThumbnailVideo() {
        this.isVideoVisible = true;
        this.updateThumbnails();
    }

    initColorSelection() {
        const colorSelect = document.getElementById('colorSelect');
        if (colorSelect) {
            colorSelect.addEventListener('change', (e) => {
                this.changeColor(e.target.value);
            });
        }
    }

    changeColor(color) {
        this.currentColor = color;
        this.images = colorVariants[color].images;
        this.currentIndex = 0;
        this.hideVideoIfVisible();
        this.updateAllImages();
        this.updateThumbnails();
    }

    updateAllImages() {
        // Update main image
        this.mainImage.src = this.images[this.currentIndex];

        // Update modal image if modal is open
        if (this.imageModal.classList.contains('active')) {
            this.modalImage.src = this.images[this.currentIndex];
        }
    }

    updateThumbnails() {
        const hasVideo = this.hasVideoThumb();
        this.thumbnails.forEach((thumb, index) => {
            const isVideo = thumb.dataset.type === 'video';
            if (isVideo) {
                thumb.classList.toggle('active', !!this.isVideoVisible);
                return;
            }
            const imageIndex = hasVideo ? index - 1 : index;
            if (imageIndex < 0) return;
            const img = thumb.querySelector('img');
            if (img && this.images[imageIndex]) {
                img.src = this.images[imageIndex];
            }
            thumb.setAttribute('data-src', this.images[imageIndex] || '');
            thumb.classList.toggle('active', !this.isVideoVisible && imageIndex === this.currentIndex);
        });
    }

    setActiveImage(index) {
        this.hideVideoIfVisible();
        this.currentIndex = index;
        this.mainImage.src = this.images[index];

        // Update thumbnails to reflect correct active state (accounts for video thumb offset)
        this.updateThumbnails();

        // Update modal image if modal is open
        if (this.imageModal.classList.contains('active')) {
            this.modalImage.src = this.images[index];
        }

        // Add fade effect
        this.mainImage.style.opacity = '0';
        setTimeout(() => {
            this.mainImage.style.opacity = '1';
        }, 150);
    }

    nextImage() {
        // Cycle: video -> image0 -> ... -> lastImage -> video
        if (this.isVideoVisible) {
            this.hideVideoIfVisible();
            this.setActiveImage(0);
            this.updateThumbnails();
            return;
        }
        if (this.currentIndex === this.images.length - 1) {
            this.showVideo();
            return;
        }
        this.setActiveImage(this.currentIndex + 1);
        this.updateThumbnails();
    }

    previousImage() {
        // Cycle backwards: video <- image0 <- ... <- lastImage <- video
        if (this.isVideoVisible) {
            this.hideVideoIfVisible();
            this.setActiveImage(this.images.length - 1);
            this.updateThumbnails();
            return;
        }
        if (this.currentIndex === 0) {
            this.showVideo();
            return;
        }
        this.setActiveImage(this.currentIndex - 1);
        this.updateThumbnails();
    }

    openModal() {
        // If the current slide is the video, show and play the modal video; otherwise
        // show the modal image.
        if (this.isVideoVisible) {
            if (this.modalVideo) {
                this.modalImage.style.display = 'none';
                this.modalVideo.style.display = 'block';
                try { this.modalVideo.currentTime = 0; this.modalVideo.muted = true; this.modalVideo.play(); } catch (_) { }
            }
        } else {
            if (this.modalVideo) {
                try { this.modalVideo.pause(); } catch (_) { }
                this.modalVideo.style.display = 'none';
            }
            this.modalImage.style.display = 'block';
            this.modalImage.src = this.images[this.currentIndex];
        }
        this.imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Ensure modal video is paused and hidden when modal closes
        if (this.modalVideo) {
            try { this.modalVideo.pause(); } catch (_) { }
            this.modalVideo.style.display = 'none';
        }
        // Ensure modal image is shown again for next open
        if (this.modalImage) {
            this.modalImage.style.display = 'block';
        }
    }

    updateModalImage() {
        // When modal is open, update either the image or video depending on which
        // slide is active.
        if (this.imageModal.classList.contains('active')) {
            if (this.isVideoVisible) {
                if (this.modalVideo) {
                    this.modalImage.style.display = 'none';
                    this.modalVideo.style.display = 'block';
                    try { this.modalVideo.currentTime = 0; this.modalVideo.muted = true; this.modalVideo.play(); } catch (_) { }
                }
            } else {
                if (this.modalVideo) {
                    try { this.modalVideo.pause(); } catch (_) { }
                    this.modalVideo.style.display = 'none';
                }
                this.modalImage.style.display = 'block';
                this.modalImage.src = this.images[this.currentIndex];
            }
        }
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        const attachSwipe = (el) => {
            if (!el) return;
            let sx = 0, sy = 0;
            el.addEventListener('touchstart', (e) => {
                sx = e.touches[0].clientX;
                sy = e.touches[0].clientY;
            }, { passive: true });
            el.addEventListener('touchend', (e) => {
                if (!sx) return;
                const ex = e.changedTouches[0].clientX;
                const ey = e.changedTouches[0].clientY;
                const dx = sx - ex;
                const dy = sy - ey;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    if (dx > 0) this.nextImage(); else this.previousImage();
                }
                sx = 0; sy = 0;
            }, { passive: true });
        };

        // Attach to both main image and main video so swiping either navigates
        attachSwipe(this.mainImage);
        attachSwipe(this.mainVideo);
    }

    // Add swipe support for modal image/video
    addModalTouchSupport() {
        const attachModalSwipe = (el) => {
            if (!el) return;
            let sx = 0, sy = 0;
            el.addEventListener('touchstart', (e) => {
                sx = e.touches[0].clientX;
                sy = e.touches[0].clientY;
            }, { passive: true });
            el.addEventListener('touchend', (e) => {
                if (!sx) return;
                const ex = e.changedTouches[0].clientX;
                const ey = e.changedTouches[0].clientY;
                const dx = sx - ex;
                const dy = sy - ey;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    if (dx > 0) {
                        this.nextImage();
                    } else {
                        this.previousImage();
                    }
                    // update modal view after navigation
                    this.updateModalImage();
                }
                sx = 0; sy = 0;
            }, { passive: true });
        };

        attachModalSwipe(this.modalImage);
        attachModalSwipe(this.modalVideo);
    }

    // Allow mouse wheel horizontal scrolling on thumbnail container
    enableThumbnailWheelScroll() {
        const container = document.querySelector('.thumbnail-container');
        if (!container) return;
        container.addEventListener('wheel', (e) => {
            // Only horizontal-scroll the container
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }
}

// Dynamic Numbers System - Updates every 3 days
class DynamicNumbers {
    constructor() {
        this.storageKey = 'dynamicNumbersData';
        this.updateInterval = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
        this.init();
    }

    init() {
        const storedData = this.getStoredData();
        const now = Date.now();

        // Check if we need to update numbers
        if (!storedData || (now - storedData.lastUpdate) >= this.updateInterval) {
            this.updateNumbers();
        } else {
            this.applyStoredNumbers(storedData);
        }
    }

    getStoredData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    storeData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not store dynamic numbers data');
        }
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateNumbers() {
        const numbers = {
            lowStock: this.generateRandomNumber(12, 25),
            reviews: this.generateRandomNumber(260, 290),
            sales: this.generateRandomNumber(140, 180),
            lastUpdate: Date.now()
        };

        this.storeData(numbers);
        this.applyNumbers(numbers);
    }

    applyStoredNumbers(data) {
        this.applyNumbers({
            lowStock: data.lowStock,
            reviews: data.reviews,
            sales: data.sales
        });
    }

    applyNumbers(numbers) {
        // Update low stock number
        const lowStockSpan = document.querySelector('.low-stock');
        if (lowStockSpan) {
            lowStockSpan.textContent = numbers.lowStock;
        }

        // Update reviews number (keeping 4.9/5 rating static)
        const reviewsSpan = document.querySelector('.reviews');
        if (reviewsSpan) {
            reviewsSpan.textContent = `4.9/5 (${numbers.reviews} reviews)`;
        }

        // Update sales number
        const salesSpan = document.querySelector('.sales span');
        if (salesSpan) {
            salesSpan.textContent = numbers.sales;
        }
    }
}

// Initialize image gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
    new DynamicNumbers(); // Initialize dynamic numbers system
    new ScrollAnimator(); // Initialize optimized scroll animations

    // Sync sticky bar prices with main prices
    const oldPrice = document.querySelector('.old-price')?.textContent?.trim();
    const newPrice = document.querySelector('.new-price')?.textContent?.trim();
    const stickyOld = document.getElementById('stickyOldPrice');
    const stickyNew = document.getElementById('stickyNewPrice');
    if (stickyOld && oldPrice) stickyOld.textContent = oldPrice;
    if (stickyNew && newPrice) stickyNew.textContent = newPrice;
});













/* Optimized Elements Animation On Scroll */
class ScrollAnimator {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.triggerPoint = window.innerHeight * 0.9;
        this.isThrottled = false;
        this.init();
    }

    init() {
        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback to scroll events with throttling
            this.setupScrollListener();
        }

        // Initial check
        this.checkAnimations();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });

        this.animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    setupScrollListener() {
        const throttledCheck = () => {
            if (!this.isThrottled) {
                requestAnimationFrame(() => {
                    this.checkAnimations();
                    this.isThrottled = false;
                });
                this.isThrottled = true;
            }
        };

        window.addEventListener('scroll', throttledCheck, { passive: true });
        window.addEventListener('resize', throttledCheck, { passive: true });
    }

    checkAnimations() {
        this.triggerPoint = window.innerHeight * 0.9;

        this.animatedElements.forEach(el => {
            if (el.classList.contains('in-view')) return;

            const rect = el.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;

            if (midpoint < this.triggerPoint) {
                el.classList.add('in-view');
            }
        });
    }
}












// CTA button click handler
document.querySelector('.cta-button').addEventListener('click', async function () {
    const color = document.getElementById('colorSelect')?.value || '';
    let checkoutUrl = `/checkout/?add-to-cart=2594&quantity=1`;

    if (color) {
        checkoutUrl += `&selected_color=${encodeURIComponent(color)}`;
    }

    try {
        // Wait until Supabase update is done
        await insertNewClick(2594);

        // Only then redirect
        window.location.href = checkoutUrl;
    } catch (err) {
        console.error("Error logging click:", err);
        // Still redirect even if logging fails
        window.location.href = checkoutUrl;
    }
});

// Sticky bar Buy Now button handler (mobile)
const stickyBtn = document.getElementById('stickyBuyNowBtn');
if (stickyBtn) {
    stickyBtn.addEventListener('click', async function () {
        const color = document.getElementById('colorSelect')?.value || '';
        let checkoutUrl = `/checkout/?add-to-cart=2594&quantity=1`;

        if (color) {
            checkoutUrl += `&selected_color=${encodeURIComponent(color)}`;
        }

        try {
            await insertNewClick(2594);
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error("Error logging click:", err);
            window.location.href = checkoutUrl;
        }
    });
}
