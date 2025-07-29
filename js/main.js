// Elite Academy - Main JavaScript File

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with simple animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }

  // Initialize scroll indicator
  initScrollIndicator();

  // Initialize mobile menu enhancements
  initMobileMenu();

  // Initialize auto-play carousel
  initCarousel();
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background =
        "#092254";
      navbar.style.backdropFilter = "blur(15px)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background =
        "#092254";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "none";
    }
  }
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const nextSection =
        document.querySelector(".hero-section").nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    // Hide scroll indicator when user scrolls
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
      }
    });
  }
}

// Gallery filtering
const galleryFilters = document.querySelectorAll(".gallery-tabs .btn");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    // Remove active class from all filters
    galleryFilters.forEach((f) => f.classList.remove("active"));
    // Add active class to clicked filter
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.style.display = "block";
        // Re-trigger AOS animation
        setTimeout(() => {
          if (typeof AOS !== "undefined") {
            AOS.refresh();
          }
        }, 100);
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Lightbox functionality
function openLightbox(button) {
  const galleryItem = button.closest(".gallery-item");
  const img = galleryItem.querySelector("img");
  const title = galleryItem.querySelector("h5").textContent;
  const description = galleryItem.querySelector("p").textContent;

  document.getElementById("lightboxImage").src = img.src;
  document.getElementById("lightboxTitle").textContent = title;
  document.getElementById("lightboxDescription").textContent = description;

  const lightboxModal = new bootstrap.Modal(
    document.getElementById("lightboxModal")
  );
  lightboxModal.show();
}

// Video player functionality
function playVideo(videoId) {
  const videoModal = new bootstrap.Modal(document.getElementById("videoModal"));
  const videoPlayer = document.getElementById("videoPlayer");

  // Sample video embed (replace with actual video URLs)
  const videoEmbeds = {
    "campus-tour":
      '<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
    "student-life":
      '<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
  };

  document.getElementById("videoModalTitle").textContent =
    videoId === "campus-tour"
      ? "Virtual Campus Tour"
      : "Student Life Experience";
  videoPlayer.innerHTML = videoEmbeds[videoId] || "<p>Video not available</p>";

  videoModal.show();
}

// Testimonial video player
function playTestimonial(testimonialId) {
  const testimonialModal = new bootstrap.Modal(
    document.getElementById("testimonialModal")
  );
  const testimonialPlayer = document.getElementById("testimonialPlayer");

  // Sample testimonial embeds
  const testimonialEmbeds = {
    testimonial1:
      '<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
    testimonial2:
      '<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
    testimonial3:
      '<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
  };

  testimonialPlayer.innerHTML =
    testimonialEmbeds[testimonialId] ||
    "<p>Video testimonial not available</p>";
  testimonialModal.show();
}

// Course modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const courseModal = document.getElementById("courseModal");
  if (courseModal) {
    courseModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const course = button.getAttribute("data-course");
      const courseNameInput = document.getElementById("courseName");

      if (courseNameInput) {
        courseNameInput.value = course;
      }
    });
  }
});

// Mobile menu enhancement
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.getComputedStyle(navbarToggler).display !== "none") {
          navbarToggler.click();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navbarCollapse.contains(e.target) &&
        !navbarToggler.contains(e.target)
      ) {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      }
    });
  }
}

// Auto-play carousel
function initCarousel() {
  const carousel = document.querySelector("#toppersCarousel");
  if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 5000,
      ride: "carousel",
    });
  }
}

// Modal event handlers
document.addEventListener("DOMContentLoaded", function () {
  // Clear video when modal is closed
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", function () {
      const videoPlayer = modal.querySelector(
        "#videoPlayer, #testimonialPlayer"
      );
      if (videoPlayer) {
        videoPlayer.innerHTML = "";
      }
    });
  });
});

// Loading animation
function showLoading(element) {
  element.classList.add("loading");
}

function hideLoading(element) {
  element.classList.remove("loading");
}

// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = counter.textContent.replace(/\d+/, target);
        clearInterval(timer);
      } else {
        counter.textContent = counter.textContent.replace(
          /\d+/,
          Math.floor(current)
        );
      }
    }, 20);
  });
}

// Intersection Observer for counter animation
document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".stat-card");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(statsSection);
  }
});

// Smooth reveal animations for elements
function revealOnScroll() {
  const reveals = document.querySelectorAll("[data-aos]");

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("aos-animate");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Enhanced button hover effects
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");

  if (heroBackground) {
    const rate = scrolled * -0.5;
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Export for use in other files
window.EliteAcademy = {
  showLoading,
  hideLoading,
  openLightbox,
  playVideo,
  playTestimonial,
  animateCounters,
};

// Premium Sidebar Functions
function openSidebar() {
  const sidebar = document.getElementById("premiumSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  sidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  const sidebar = document.getElementById("premiumSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "hidden";
}

// Close sidebar on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSidebar();
  }
});

// Touch events for mobile sidebar
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("premiumSidebar");
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  if (sidebar) {
    sidebar.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    sidebar.addEventListener("touchmove", function (e) {
      if (!isDragging) return;

      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;

      if (diffX > 0) {
        sidebar.style.transform = `translateX(${diffX}px)`;
      }
    });

    sidebar.addEventListener("touchend", function (e) {
      if (!isDragging) return;

      const diffX = currentX - startX;

      if (diffX > 100) {
        closeSidebar();
      } else {
        sidebar.style.transform = "translateX(0)";
      }

      isDragging = false;
      sidebar.style.transform = "";
    });
  }
});

// Make functions globally available
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
