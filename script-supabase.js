/* Customers Comments Fuunctionality */
// List reviewer names that should show the "Verified Buyer" badge when a review
const VERIFIED_BUYERS = [
    'Sarah', 'Ahmed', 'Emily Davis', 'Ali', 'Matthew Harris', 'Laura Taylor', 'Omar Mohammed', 'Chloe Martin',
];


// Helper: check if a review is verified. Prefer an explicit `verified` flag on
// the stored object; fall back to the static `VERIFIED_BUYERS` list.
function isReviewVerified(item) {
    if (!item) return false;
    if (typeof item.verified === 'boolean') return item.verified;
    const name = (item.reviewer_name || '').trim().toLowerCase();
    return VERIFIED_BUYERS.some(v => v.trim().toLowerCase() === name);
}

// Find the first review card element for a reviewer name (case-insensitive).
function getReviewCardByReviewer(reviewerName) {
    if (!reviewerName) return null;
    const area = document.getElementById('user_clint_rate_area');
    if (!area) return null;
    const cards = Array.from(area.querySelectorAll('.user_card_rate_div'));
    const targetName = reviewerName.trim().toLowerCase();
    for (const card of cards) {
        const h4 = card.querySelector('h4');
        if (h4 && h4.textContent.trim().toLowerCase() === targetName) return card;
    }
    return null;
}

// Add or remove the Verified Buyer badge for a reviewer card by name.
function markVerifiedByName(reviewerName) {
    const card = getReviewCardByReviewer(reviewerName);
    if (!card) return false;
    const existing = card.querySelector('.verified-badge');
    if (existing) return true; // already marked
    const infoDiv = card.querySelector('.card_clint_rate_info_div');
    if (!infoDiv) return false;
    const badge = document.createElement('span');
    badge.className = 'verified-badge';
    badge.textContent = 'Verified Buyer';
    infoDiv.appendChild(badge);
    return true;
}

function unmarkVerifiedByName(reviewerName) {
    const card = getReviewCardByReviewer(reviewerName);
    if (!card) return false;
    const existing = card.querySelector('.verified-badge');
    if (existing) existing.remove();
    return true;
}

document.getElementById("user_comment_form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const button = document.querySelector("#user_comment_form button[type='submit']");
    button.disabled = true;
    button.style.background = "gray";
    button.style.color = "white";
    button.innerText = "Posting...";

    let reviewer_name = document.getElementById("user_comment_username").value.trim();
    let comment = document.getElementById("user_comment_text").value.trim();
    let email = document.getElementById("user_comment_email")?.value.trim() || "";
    let stars = parseInt(document.getElementById("user_comment_stars").value);
    let review_date = new Date().toISOString().split("T")[0];

    const newComment = {
        review_date,
        reviewer_name,
        comment,
        email,
        stars,
    };

    try {
        // Target column name
        const column = "2594";

        // Fetch existing array in that column (assume row with id = 1)
        const { data, error: fetchError } = await supabase.from("all_customers_comments").select(column).eq("id", 1).single();

        if (fetchError) throw fetchError;

        const existingArray = data[column] || [];

        const updatedArray = [newComment, ...existingArray];

        // Update the column with the new array
        const { error: updateError } = await supabase
            .from("all_customers_comments")
            .update({ [column]: updatedArray })
            .eq("id", 1);

        if (updateError) throw updateError;

        document.getElementById("user_comment_form").reset();
        await fetchReviews(); // Optional: refresh UI
        showSuccessNotification();

        // Trigger animation for the newly added review
        setTimeout(() => {
            triggerAnimationForNewElements();
        }, 100);
    } catch (error) {
        console.error("Error inserting comment:", error.message);
    } finally {
        button.disabled = false;
        button.style.background = "#f0f0f0";
        button.style.color = "black";
        button.innerText = "Submit";
    }
});

// Function to trigger animation for newly added elements (optimized)
function triggerAnimationForNewElements() {
    // Get all review cards that have animation classes but haven't been animated yet
    const newAnimatedElements = document.querySelectorAll('.user_card_rate_div.animate-on-scroll:not(.in-view)');

    if (newAnimatedElements.length === 0) return;

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
        const triggerPoint = window.innerHeight * 0.9;

        newAnimatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;

            if (midpoint < triggerPoint) {
                el.classList.add('in-view');
            }
        });
    });
}

// Function to Fetch and Display Reviews
async function fetchReviews() {
    try {
        const column = "2594";

        const { data, error } = await supabase.from("all_customers_comments").select(column).eq("id", 1).single();

        if (error) throw error;

        const reviews = data[column] || [];

        let user_clint_rate_area = document.getElementById("user_clint_rate_area");
        user_clint_rate_area.innerHTML = "";

        reviews.forEach((item) => {
            const { review_date, reviewer_name, comment, stars } = item;

            if (!comment.trim()) return;

            const div = document.createElement("div");
            div.classList.add("user_card_rate_div", "animate-on-scroll", "from-bottom");
            // Build inner HTML. Place the verified badge inside the star div on the
            // right side so it lines up with the stars.
            const starsHtml = `<span class="star-icons">${"★".repeat(stars)}${"☆".repeat(5 - stars)}</span>`;
            const verifiedHtml = isReviewVerified(item) ? '<span class="verified-badge">Verified Buyer</span>' : '';
            div.innerHTML = `
                <div class="card_clint_rate_date_div"><h3>${review_date}</h3></div>
                <div class="card_clint_rate_info_div">
                    <img src="https://headphonezoo.com/wp-content/themes/headphonezoo-theme-1/headphonezoo.webp" alt="foldable p47 wireless headphone - headphonezoo" title="foldable p47 wireless headphone - headphonezoo">
                    <h4>${reviewer_name}</h4>
                </div>
                <div class="card_clint_rate_comment_div"><h5>${comment}</h5></div>
                <div class="card_clint_rate_star_div">
                    ${starsHtml}
                    ${verifiedHtml}
                </div>
            `;
            user_clint_rate_area.appendChild(div);
        });

        // Trigger animation for newly added elements
        triggerAnimationForNewElements();
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
    }
}

// Function to Show Floating Success Notification
function showSuccessNotification() {
    let notification = document.getElementById("new_comment_success_notification");
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(-50%) translateY(0px)";
    }, 10);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(10px)";
        setTimeout(() => {
            notification.style.display = "none";
        }, 400);
    }, 3000);
}

fetchReviews();

// Add optimized scroll event listener to handle animations for dynamically added reviews
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        triggerAnimationForNewElements();
    }, 16); // ~60fps throttling
}, { passive: true });



















/* Insert new click & return formatted array */
async function insertNewClick(productID) {
    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    const now = new Date();
    const currentMonth = monthNames[now.getMonth()];
    const currentYear = now.getFullYear();

    // 1. Fetch row
    const { data, error } = await supabase
        .from("checkout_click_counter")
        .select("*")
        .eq("product_id", productID)
        .single();

    if (error) {
        console.error("Error fetching data:", error.message);
        return [];
    }

    // 2. Ensure we have an array for this month
    let monthData = data[currentMonth] || [];

    if (typeof monthData === "string") {
        try {
            monthData = JSON.parse(monthData);
        } catch {
            monthData = [];
        }
    }

    // Convert any old object format into strings
    monthData = monthData.map(entry => {
        if (typeof entry === "object" && entry !== null) {
            return `Clicks ${entry.clicks} - ${entry.year}`;
        }
        return entry; // already a string
    });

    // 3. Check if an entry for the current year exists
    let yearIndex = monthData.findIndex(entry => entry.includes(`- ${currentYear}`));

    if (yearIndex !== -1) {
        // Extract current clicks
        let parts = monthData[yearIndex].match(/Clicks (\d+) - (\d+)/);
        let currentClicks = parts ? parseInt(parts[1], 10) : 0;
        let updatedClicks = currentClicks + 1;

        // Update the string
        monthData[yearIndex] = `Clicks ${updatedClicks} - ${currentYear}`;
    } else {
        // Add new entry for this year
        monthData.push(`Clicks 1 - ${currentYear}`);
    }

    // 4. Update Supabase (store as array of strings)
    const { error: updateError } = await supabase
        .from("checkout_click_counter")
        .update({ [currentMonth]: monthData })
        .eq("product_id", productID);

    if (updateError) {
        console.error("Error updating value:", updateError.message);
        return [];
    }

    // 5. Return the updated formatted array
    return monthData;
}