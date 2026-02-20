$(document).ready(function() {
  // Obtener usuario actual
  let usuario = localStorage.getItem("usuarioActual");

  if (!usuario) {
    // Si no hay usuario conectado, redirigir al login
    window.location.href = "login.html";
    return;
  }

  // Mostrar nombre del usuario
  $("#usuarioNombre").text(usuario);

  // Mostrar saldo del usuario
  let saldo = localStorage.getItem(`saldo_${usuario}`) 
    ? parseFloat(localStorage.getItem(`saldo_${usuario}`)) 
    : 0;
  $("#saldo").text(`$${saldo}`);

  // Botón de cerrar sesión
  $("#logoutBtn").on("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("usuarioActual");
    window.location.href = "login.html";
  });

  // Modo oscuro persistente
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }

  $("#darkModeToggle").on("click", function() {
    $("body").toggleClass("dark-mode");
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled");
  });
});