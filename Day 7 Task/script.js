"use strict";

const header = document.querySelector("header");
const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");
const contactForm = document.querySelector(".contact-form");
const submitButton = document.querySelector(".contact-form button");
const currentYearElement = document.querySelector("#current-year");
const scrollToTopButton = document.querySelector("#scroll-to-top");
const greetingButton = document.querySelector("#greeting-button");
const greetingMessage = document.querySelector("#greeting-message");



if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}



if (greetingButton && greetingMessage) {
    greetingButton.addEventListener("click", function () {
        const currentHour = new Date().getHours();

        let greeting = "";

        if (currentHour < 12) {
            greeting = "Good morning! Welcome to my portfolio.";
        } else if (currentHour < 18) {
            greeting = "Good afternoon! Welcome to my portfolio.";
        } else {
            greeting = "Good evening! Welcome to my portfolio.";
        }

        greetingMessage.textContent = greeting;
        greetingMessage.classList.add("show-message");

        greetingButton.textContent = "Message Displayed";
        greetingButton.disabled = true;

        setTimeout(function () {
            greetingButton.textContent = "Show Greeting";
            greetingButton.disabled = false;
        }, 2000);
    });
}




navigationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});



function handleScrollToTopVisibility() {
    if (!scrollToTopButton) {
        return;
    }

    if (window.scrollY > 400) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
}

window.addEventListener("scroll", handleScrollToTopVisibility);

if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



function updateHeaderStyle() {
    if (!header) {
        return;
    }

    if (window.scrollY > 20) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
}

window.addEventListener("scroll", updateHeaderStyle);



function updateActiveNavigation() {
    let currentSectionId = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(function (link) {
        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);


if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = contactForm.querySelector(
            'input[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            'input[name="email"]'
        );

        const messageInput = contactForm.querySelector(
            'textarea[name="message"]'
        );

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";

        removeFormMessage();

        if (name === "" || email === "" || message === "") {
            displayFormMessage(
                "Please complete all the required fields.",
                "error"
            );

            return;
        }

        if (!isValidEmail(email)) {
            displayFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        if (submitButton) {
            submitButton.textContent = "Submitting...";
            submitButton.disabled = true;
        }

        setTimeout(function () {
            displayFormMessage(
                `Thank you, ${name}! Your message has been received.`,
                "success"
            );

            contactForm.reset();

            if (submitButton) {
                submitButton.textContent = "Send Message";
                submitButton.disabled = false;
            }
        }, 800);
    });
}


function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


/*
========================================
DISPLAY FORM MESSAGE
========================================
*/

function displayFormMessage(message, type) {
    if (!contactForm) {
        return;
    }

    const messageElement = document.createElement("p");

    messageElement.id = "form-message";
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    contactForm.appendChild(messageElement);
}




function removeFormMessage() {
    const oldMessage = document.querySelector("#form-message");

    if (oldMessage) {
        oldMessage.remove();
    }
}


/*
========================================
REVEAL SECTIONS ON SCROLL
========================================
*/

const revealElements = document.querySelectorAll(
    ".skill-card, .education-card, .contact-form"
);

const observerOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("element-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    observerOptions
);

revealElements.forEach(function (element) {
    element.classList.add("element-hidden");
    revealObserver.observe(element);
});




handleScrollToTopVisibility();
updateHeaderStyle();
updateActiveNavigation();