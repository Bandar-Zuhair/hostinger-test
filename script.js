// Configuration - Easy to adjust offer period
const offerConfig = {
    // Set the offer end date (year, month (0-11), day, hour)
    endDate: new Date(2025, 8, 30, 23, 59, 59), // September 30, 2025 at 23:59:59
    // Alternatively, set hours from now:
    // hoursFromNow: 48 // Uncomment this and set hours if you prefer this method
};

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
    let endDate;
    
    if (offerConfig.endDate) {
        endDate = offerConfig.endDate;
    } else if (offerConfig.hoursFromNow) {
        endDate = new Date();
        endDate.setHours(endDate.getHours() + offerConfig.hoursFromNow);
    } else {
        // Default to 24 hours from now
        endDate = new Date();
        endDate.setHours(endDate.getHours() + 24);
    }
    
    const now = new Date();
    const difference = endDate - now;
    
    if (difference <= 0) {
        document.querySelector('.countdown-text').textContent = 'Special offer has ended!';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// CTA button click handler
document.querySelector('.cta-button').addEventListener('click', function() {
    alert('Thank you for your interest! This would redirect to the checkout page in a live environment.');
    // In a real implementation, this would redirect to your WooCommerce product page
    // window.location.href = '/checkout';
});