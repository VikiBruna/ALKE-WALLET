$(document).ready(function() {
  // Mostrar saldo actual
  let saldo = localStorage.getItem("saldo") ? parseFloat(localStorage.getItem("saldo")) : 0;
  $("#saldo").text(`$${saldo}`);

  // Cargar transacciones desde localStorage
  let transacciones = localStorage.getItem("transacciones") ? JSON.parse(localStorage.getItem("transacciones")) : [];

  // Función para mostrar transacciones en tabla estilo banco
  function mostrarTransacciones() {
    $("#transactionTable tbody").empty();

    if (transacciones.length === 0) {
      $("#transactionTable tbody").append(
        `<tr><td colspan="6" class="text-center">No hay transacciones registradas</td></tr>`
      );
    } else {
      transacciones.forEach((t, index) => {
        let abono = t.tipo === "Depósito" ? `+$${t.monto}` : "";
        let cargo = t.tipo === "Envío" ? `-$${t.monto}` : "";

        $("#transactionTable tbody").append(`
          <tr>
            <td>${t.fecha}</td>
            <td>${index + 1}</td>
            <td>${t.tipo} ${t.destinatario ? "a " + t.destinatario : ""}</td>
            <td>${abono}</td>
            <td>${cargo}</td>
            <td>$${t.saldoDespues}</td>
          </tr>
        `);
      });
    }
  }

  // Mostrar historial al cargar
  mostrarTransacciones();

  // Modo oscuro persistente
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }

  $("#darkModeToggle").on("click", function() {
    $("body").toggleClass("dark-mode");
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled");
  });
});