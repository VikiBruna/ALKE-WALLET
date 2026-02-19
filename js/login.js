document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById("darkModeToggle");

  // Activar modo oscuro si estaba guardado
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  toggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
  });

  // Validación simple de login
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "usuario" && password === "1234") {
      if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", 0); // inicializa saldo
      }
      if (!localStorage.getItem("transacciones")) {
        localStorage.setItem("transacciones", JSON.stringify([]));
      }
      window.location.href = "menu.html";
    } else {
      document.getElementById("loginMessage").textContent = "Usuario o contraseña incorrectos";
      document.getElementById("loginMessage").style.color = "red";
    }
  });
});