document.addEventListener("DOMContentLoaded", function() {
  const depositForm = document.getElementById("depositForm");

  // Mostrar saldo actual
  let saldo = localStorage.getItem("saldo") ? parseFloat(localStorage.getItem("saldo")) : 0;
  document.getElementById("saldo").textContent = `$${saldo}`;

  depositForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let monto = parseFloat(document.getElementById("monto").value);
    if (isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    // Actualizar saldo
    saldo += monto;
    localStorage.setItem("saldo", saldo);

    // Guardar transacción
    let transacciones = localStorage.getItem("transacciones") ? JSON.parse(localStorage.getItem("transacciones")) : [];
    transacciones.push({
      tipo: "Depósito",
      destinatario: "-",
      monto: monto,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    alert(`Depósito realizado: $${monto}`);
    window.location.href = "menu.html";
  });

  // Modo oscuro
  const toggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
  toggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
  });
});