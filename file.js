// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
    ==========================*/
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu on link click (mobile)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });


    /* =========================
       SMOOTH SCROLL
    ==========================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    /* =========================
       PRICING TOGGLE
    ==========================*/
    const pricingSwitch = document.getElementById("pricing-switch");
    const prices = document.querySelectorAll(".price");

    pricingSwitch.addEventListener("change", () => {
        prices.forEach(price => {
            const monthly = price.getAttribute("data-monthly");
            const yearly = price.getAttribute("data-yearly");

            if (pricingSwitch.checked) {
                price.innerHTML = `$${yearly}<span>/mo</span>`;
            } else {
                price.innerHTML = `$${monthly}<span>/mo</span>`;
            }
        });
    });


    /* =========================
       PORTFOLIO FILTER
    ==========================*/
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            // Remove active class
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });


    /* =========================
       TESTIMONIAL SLIDER
    ==========================*/
    const wrapper = document.querySelector(".testimonial-wrapper");
    const slides = document.querySelectorAll(".testimonial-card");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);


    /* =========================
       COUNTER ANIMATION
    ==========================*/
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute("data-target");
                let count = 0;

                const updateCount = () => {
                    const increment = target / 100;

                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));


    /* =========================
       CONTACT FORM VALIDATION
    ==========================*/
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Thank you! Your message has been sent successfully.");
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    /* =========================
       FAQ ACCORDION
    ==========================*/
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            const answer = item.querySelector(".faq-answer");

            // Close other FAQs
            document.querySelectorAll(".faq-answer").forEach(a => {
                if (a !== answer) {
                    a.style.display = "none";
                }
            });

            // Toggle current
            answer.style.display =
                answer.style.display === "block" ? "none" : "block";
        });
    });

});