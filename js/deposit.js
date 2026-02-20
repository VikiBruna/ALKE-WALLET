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

  // Inicializar saldo del usuario
  let saldo = localStorage.getItem(`saldo_${usuario}`) 
    ? parseFloat(localStorage.getItem(`saldo_${usuario}`)) 
    : 0;
  $("#saldo").text(`$${saldo}`);

  // Depositar dinero
  $("#depositForm").on("submit", function(event) {
    event.preventDefault();
    let monto = parseFloat($("#monto").val());

    if (isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    let saldoAntes = saldo;
    saldo += monto;
    let saldoDespues = saldo;
    localStorage.setItem(`saldo_${usuario}`, saldo);

    // Guardar transacción detallada del usuario
    let transacciones = localStorage.getItem(`transacciones_${usuario}`) 
      ? JSON.parse(localStorage.getItem(`transacciones_${usuario}`)) 
      : [];
    transacciones.push({
      tipo: "Depósito",
      origen: usuario,
      monto,
      saldoAntes,
      saldoDespues,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem(`transacciones_${usuario}`, JSON.stringify(transacciones));

    alert(`Depósito exitoso: $${monto}`);
    $("#saldo").text(`$${saldo}`);
    $("#monto").val("");
  });

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