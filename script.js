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
    try {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      
      const category = button.dataset.category;
      if (!category) throw new Error("Category not found");

      channelLogos.forEach((logo) => {
        logo.style.display = (category === "all" || logo.dataset.category === category) ? "block" : "none";
      });
    } catch (error) {
      console.error("Error filtering channels:", error);
      // Fallback to showing all channels
      channelLogos.forEach(logo => logo.style.display = "block");
    }
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

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
  
  // Disconnect observer if all elements are loaded
  if (document.querySelectorAll('.fade-in').length === document.querySelectorAll('.feature-card, .price-card, .channel-logo').length) {
    observer.disconnect();
  }
}, observerOptions);

document
  .querySelectorAll(".feature-card, .price-card, .channel-logo")
  .forEach((el) => {
    observer.observe(el);
  });

// Add this function to handle WhatsApp redirects
function redirectToWhatsApp(message = '') {
    const phoneNumber = '212723457934';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Update all pricing buttons
document.querySelectorAll('.price-card .btn-primary, .trial-button, .whatsapp-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const planName = button.closest('.price-card')?.querySelector('h3')?.textContent || 'General';
        const message = `Hi, I'm interested in the ${planName} plan. Can you provide more information?`;
        redirectToWhatsApp(message);
    });
});
