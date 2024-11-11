// Loading Animation
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }, 1000);
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

// Fix: Debounce scroll event for better performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

window.addEventListener(
  "scroll",
  debounce(() => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "flex";
    } else {
      backToTopButton.style.display = "none";
    }
  }, 150),
);

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Channel Categories
const categoryButtons = document.querySelectorAll(".category");
const channelLogos = document.querySelectorAll(".channel-logo");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.dataset.category;

    channelLogos.forEach((logo) => {
      if (category === "all" || logo.dataset.category === category) {
        logo.style.display = "block";
      } else {
        logo.style.display = "none";
      }
    });
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add "All" category button
const allCategoryButton = document.createElement("button");
allCategoryButton.classList.add("category");
allCategoryButton.dataset.category = "all";
allCategoryButton.textContent = "All Channels";
document.querySelector(".channel-categories").prepend(allCategoryButton);

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "50px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".feature-card, .price-card, .channel-logo")
  .forEach((el) => {
    observer.observe(el);
  });
