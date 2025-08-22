// Theme toggle functionality
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('bx-moon', 'bx-sun');
}

themeIcon.onclick = function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Typing animation
const typedTextSpan = document.querySelector(".typing-text span");
const textArray = ["Frontend Developer", "Web Designer", "UI/UX Enthusiast"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

// Animate skill bars on scroll
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(progressBar => {
        const width = progressBar.getAttribute('data-width');
        progressBar.style.width = width;
    });
}

// Initialize animations when skills section is in view
const skillsSection = document.querySelector('.skills');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, options);

observer.observe(skillsSection);

// Form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server
    // This is just a simulation
    this.reset();
    alert('Thank you for your message! I will get back to you soon.');
});

// Scroll reveal animation
function reveal() {
    var reveals = document.querySelectorAll(".about, .skills, .projects, .contact");
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Initialize when page loads
reveal();