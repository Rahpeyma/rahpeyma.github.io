// Sample lecture data
const lectures = [
    {
        id: 1,
        title: "Introduction to Quantum",
        category: "quantum",
        categoryName: "Quantum Physics",
        description: "Dive into the mysterious world of quantum entanglement and its implications for quantum computing.",
        // duration: "45 min",
        date: "Oct 12, 2023"
    },
{
    id: 2,
    title: "Neural Networks Fundamentals",
    category: "ai",
    categoryName: "Artificial Intelligence",
    description: "Learn the core principles of neural networks, backpropagation, and deep learning architectures.",
    // duration: "52 min",
    date: "Oct 5, 2023"
},
{
    id: 3,
    title: "Maxwell's Equations Deep Dive",
    category: "em",
    categoryName: "Electromagnetics",
    description: "Comprehensive analysis of Maxwell's equations and their application in modern technology.",
    // duration: "38 min",
    date: "Sep 28, 2023"
},
{
    id: 4,
    title: "String Theory Overview",
    category: "physics",
    categoryName: "Theoretical Physics",
    description: "Introduction to string theory, extra dimensions, and the quest for a theory of everything.",
    // duration: "65 min",
    date: "Sep 21, 2023"
},
{
    id: 5,
    title: "Quantum Computing Algorithms",
    category: "quantum",
    categoryName: "Quantum Physics",
    description: "Explore Shor's algorithm, Grover's algorithm, and other quantum computing breakthroughs.",
    // duration: "58 min",
    date: "Sep 14, 2023"
},
{
    id: 6,
    title: "Ethics in AI Development",
    category: "ai",
    categoryName: "Artificial Intelligence",
    description: "Examining the ethical considerations and societal impacts of artificial intelligence.",
    // duration: "42 min",
    date: "Sep 7, 2023"
},
{
    id: 7,
    title: "Master Equation",
    category: "statistics",
    categoryName: "Statistics",
    description: "Examining the ethical considerations and societal impacts of artificial intelligence.",
    // duration: "42 min",
    date: "Sep 7, 2023"
},
];

// Function to generate lecture cards
function generateLectureCards(lecturesToShow) {
    const grid = document.querySelector('.lectures-grid');
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
            if(lecture.id === 1) {
                window.location.href = 'Intro-Quantum.html';
            }
            if(lecture.id === 2) {
                window.location.href = 'neural-networks.html';
            }
            else {
                // For other lectures, you can add links later
                alert(`Opening lecture: ${lecture.title}`);
            }
        });
        grid.appendChild(card);
    });
}

// Function to generate recent lectures
function generateRecentLectures() {
    const container = document.querySelector('.recent-lectures');
    container.innerHTML = '';

    // Get the 4 most recent lectures
    const recent = lectures.slice(0, 4);

    recent.forEach(lecture => {
        const item = document.createElement('div');
        item.className = 'recent-item';
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    generateLectureCards(lectures);
    generateRecentLectures();

    // Category filtering
    const categories = document.querySelectorAll('.category');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            // Remove active class from all
            categories.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            cat.classList.add('active');

            const category = cat.textContent.trim();
            if(category === 'All Lectures') {
                generateLectureCards(lectures);
            } else {
                const filtered = lectures.filter(lecture => lecture.categoryName === category);
                generateLectureCards(filtered);
            }
        });
    });
});
