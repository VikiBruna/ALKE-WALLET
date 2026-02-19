document.addEventListener("DOMContentLoaded", function() {
  // Mostrar saldo desde localStorage
  let saldo = localStorage.getItem("saldo") ? parseFloat(localStorage.getItem("saldo")) : 0;
  document.getElementById("saldo").textContent = `$${saldo}`;

  // Persistencia de modo oscuro
  const toggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
  toggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
  });
});