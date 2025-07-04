// scripts.js - Enhanced with Recent Lectures sidebar

// Helper function to parse date strings
function parseLectureDate(dateStr) {
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    
    const parts = dateStr.split(' ');
    const month = months[parts[0]];
    const day = parseInt(parts[1].replace(',', ''));
    const year = parseInt(parts[2]);
    
    return new Date(year, month, day);
}

// Sample lecture data
const lectures = [
    {
        id: 1,
        title: "Introduction to Quantum",
        category: "quantum",
        categoryName: "Quantum Physics",
        description: "Basic Quantum principles from classical Mechanics to Quantum Mechanics.",
        // duration: "45 min",
        date: "Oct 12, 2023",
        page: "Intro-Quantum.html"
    },
    {
        id: 2,
        title: "Modern Quantum Mechanics",
        category: "quantum",
        categoryName: "Quantum Physics",
        description: "Modern Quantum Mechanics is a classic graduate level textbook, covering the main quantum mechanics concepts in a clear, organized, and engaging manner.",
        // duration: "58 min",
        date: "Oct 16, 2023",
        page: "QuantumTH.html"
    },
   
];

// Function to sort lectures by date (newest first)
function sortLecturesByDate(lectures) {
    return [...lectures].sort((a, b) => {
        const dateA = parseLectureDate(a.date);
        const dateB = parseLectureDate(b.date);
        return dateB - dateA;
    });
}

// Function to generate lecture cards
function generateLectureCards(lecturesToShow) {
    const grid = document.querySelector('.lectures-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    lecturesToShow.forEach(lecture => {
        const card = document.createElement('div');
        card.className = 'lecture-card';
        card.innerHTML = `
            <div class="card-img ${lecture.category}"></div>
            <div class="card-content">
                <span class="lecture-category ${lecture.category}-cat">${lecture.categoryName}</span>
                <h3>${lecture.title}</h3>
                <p>${lecture.description}</p>
                <div class="lecture-meta">
                    <span><i class="far fa-calendar"></i> ${lecture.date}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = lecture.page;
        });
        grid.appendChild(card);
    });
}

// Function to generate recent lectures in sidebar
function generateRecentLectures() {
    const container = document.querySelector('.recent-lectures');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sort lectures by date and get the 4 most recent
    const sortedLectures = sortLecturesByDate(lectures);
    const recent = sortedLectures.slice(0, 4);
    
    recent.forEach(lecture => {
        const item = document.createElement('a');
        item.className = 'recent-item';
        item.href = lecture.page;
        item.innerHTML = `
            <div class="recent-img ${lecture.category}"></div>
            <div class="recent-content">
                <h4>${lecture.title}</h4>
                <span class="category ${lecture.category}-cat">${lecture.categoryName}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// Function to generate related lectures (for lecture pages)
function generateRelatedLectures() {
    const container = document.querySelector('.related-lectures');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Get lectures in the same category as the current lecture
    const currentLectureId = 2; // This would normally come from the page
    const currentLecture = lectures.find(l => l.id === currentLectureId);
    const related = lectures
        .filter(l => l.category === currentLecture.category && l.id !== currentLectureId)
        .slice(0, 3);
    
    related.forEach(lecture => {
        const item = document.createElement('a');
        item.className = 'related-item';
        item.href = lecture.page;
        item.innerHTML = `
            <div class="related-img ${lecture.category}"></div>
            <div class="related-content">
                <h4>${lecture.title}</h4>
                <span class="category">${lecture.categoryName}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const sortedLectures = sortLecturesByDate(lectures);
    generateLectureCards(sortedLectures);
    generateRecentLectures();
    generateRelatedLectures();
    
    // Category filtering
    const categories = document.querySelectorAll('.category');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            // Remove active class from all
            categories.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            cat.classList.add('active');
            
            const category = cat.textContent.trim();
            if (category === 'All Lectures') {
                generateLectureCards(sortedLectures);
            } else {
                const filtered = lectures.filter(lecture => lecture.categoryName === category);
                generateLectureCards(filtered);
            }
        });
    });
    
    // Mobile sidebar functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-book-open"></i> Lectures';
    document.body.appendChild(mobileMenuBtn);
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-sidebar-overlay';
    document.body.appendChild(overlay);
    
    const sidebar = document.querySelector('.sidebar');
    
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close sidebar when clicking on links
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
    
    // Auto-close sidebar when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});