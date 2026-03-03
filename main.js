document.addEventListener("DOMContentLoaded", function () {
  /* ================= LOGIN ================= */

  const form = document.querySelector(".login-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (!storedEmail || !storedPassword) {
        alert("No registered user found. Please register first.");
        return;
      }

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful!");
        window.location.href = "main.html";
      } else {
        alert("Invalid Email or Password");
      }
    });
  }

  /* ================= HAMBURGER MENU ================= */

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
      }
    });

    // Close when clicking link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });
    });
  }

  /* ================= PROFILE SYSTEM ================= */

  const authArea = document.getElementById("auth-area");
  const storedName = localStorage.getItem("name");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (authArea && storedName && isLoggedIn) {
    const firstLetter = storedName.charAt(0).toUpperCase();

    authArea.innerHTML = `
      <div class="profile-menu" id="profileMenu">
        <div class="profile-avatar">${firstLetter}</div>
        <span>${storedName}</span>
        <div class="profile-dropdown">
          <a href="#">My Profile</a>
          <a href="#" id="logoutBtn">Logout</a>
        </div>
      </div>
    `;

    const profileMenu = document.getElementById("profileMenu");

    profileMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      profileMenu.classList.toggle("active");
    });

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        localStorage.removeItem("isLoggedIn");

        alert("Logged Out!");
        window.location.href = "login.html";
      });
    }

    // Close profile dropdown when clicking outside
    document.addEventListener("click", function () {
      profileMenu.classList.remove("active");
    });
  }
});
