// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        // Toggle active class on button for animation
        navToggle.classList.toggle('active');
        
        // Toggle active class on menu to show/hide
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===================================
// Blog Data and Rendering
// ===================================
const blogPosts = [
    {
        id: 1,
        title: "Building Sustainable Communities Through Technology",
        excerpt: "Explore how digital tools and platforms are transforming the way communities collaborate and solve local challenges together.",
        date: "Jan 10, 2025",
        author: "Sarah Johnson",
        category: "Technology",
        icon: "🌱"
    },
    {
        id: 2,
        title: "The Future of Social Entrepreneurship",
        excerpt: "Discover emerging trends in social business models and how entrepreneurs are creating profit with purpose in 2025.",
        date: "Jan 8, 2025",
        author: "Michael Chen",
        category: "Business",
        icon: "🚀"
    },
    {
        id: 3,
        title: "Empowering Youth Through Digital Skills",
        excerpt: "Learn about our latest initiatives to provide coding and digital literacy training to underserved communities worldwide.",
        date: "Jan 5, 2025",
        author: "Emma Rodriguez",
        category: "Education",
        icon: "💻"
    },
    {
        id: 4,
        title: "Climate Action: Small Steps, Big Impact",
        excerpt: "How individual actions and community projects are making measurable differences in the fight against climate change.",
        date: "Jan 3, 2025",
        author: "David Kim",
        category: "Environment",
        icon: "🌍"
    },
    {
        id: 5,
        title: "Innovation Labs: Where Ideas Come to Life",
        excerpt: "Inside our collaborative spaces where entrepreneurs, designers, and developers work together to solve real-world problems.",
        date: "Dec 28, 2024",
        author: "Lisa Anderson",
        category: "Innovation",
        icon: "💡"
    },
    {
        id: 6,
        title: "Women in Tech: Breaking Barriers",
        excerpt: "Celebrating the achievements of women leaders in technology and discussing how to create more inclusive work environments.",
        date: "Dec 25, 2024",
        author: "Priya Patel",
        category: "Diversity",
        icon: "👩‍💻"
    }
];

// Function to render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blogContainer');
    
    // Check if we're on the blog page
    if (!blogContainer) return;
    
    // Clear existing content
    blogContainer.innerHTML = '';
    
    // Loop through blog posts and create HTML
    blogPosts.forEach(function(post) {
        // Create blog card element
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        
        // Build the HTML structure
        blogCard.innerHTML = `
            <div class="blog-image">${post.icon}</div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span>${post.date}</span>
                    <span>•</span>
                    <span>${post.author}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="blog-link">Read More →</a>
            </div>
        `;
        
        // Append to container
        blogContainer.appendChild(blogCard);
    });
}

// Call function when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBlogPosts);
} else {
    renderBlogPosts();
}

// ===================================
// Contact Form Validation
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    const successMessage = document.getElementById('successMessage');
    
    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (nameValue.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            clearError(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }
    
    function validateSubject() {
        const subjectValue = subjectInput.value.trim();
        
        if (subjectValue === '') {
            showError(subjectInput, subjectError, 'Subject is required');
            return false;
        } else if (subjectValue.length < 5) {
            showError(subjectInput, subjectError, 'Subject must be at least 5 characters');
            return false;
        } else {
            clearError(subjectInput, subjectError);
            return true;
        }
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        } else if (messageValue.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            return false;
        } else {
            clearError(messageInput, messageError);
            return true;
        }
    }
    
    // Helper functions to show/clear errors
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // Real-time validation on input
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // Check if all fields are valid
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Hide any existing success message
            successMessage.classList.remove('show');
            
            // Simulate form submission (in real app, this would be an API call)
            setTimeout(function() {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 500);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// ===================================
// Smooth Scroll for Internal Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            event.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});