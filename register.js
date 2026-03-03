document.addEventListener("DOMContentLoaded", function () {
  /* ================= REGISTER ================= */

  const form = document.querySelector(".register-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("reg-name");
      const email = document.getElementById("reg-email");
      const password = document.getElementById("reg-password");
      const confirm = document.getElementById("reg-confirm");

      if (!name || !email || !password || !confirm) {
        alert("Input ID mismatch!");
        return;
      }

      if (password.value !== confirm.value) {
        alert("Passwords do not match");
        return;
      }

      localStorage.setItem("name", name.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);

      alert("Registered Successfully!");
      window.location.href = "login.html";
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

    // Close when clicking any nav link
    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });
    });
  }
});
