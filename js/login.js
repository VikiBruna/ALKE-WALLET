$(document).ready(function() {
  // Inicializar usuarios
  let usuarios = localStorage.getItem("usuarios") 
    ? JSON.parse(localStorage.getItem("usuarios")) 
    : [{username:"usuario",password:"1234"}];

  // Login
  $("#loginForm").on("submit", function(e){
    e.preventDefault();
    let u = $("#username").val().trim(), p = $("#password").val().trim();
    let valido = usuarios.find(x => x.username === u && x.password === p);

    if(valido){
      // Guardar usuario actual
      localStorage.setItem("usuarioActual", u);

      // Inicializar cuenta si no existe
      if (!localStorage.getItem(`saldo_${u}`)) {
        localStorage.setItem(`saldo_${u}`, 0);
        localStorage.setItem(`transacciones_${u}`, JSON.stringify([]));
        localStorage.setItem(`contactos_${u}`, JSON.stringify([]));
      }

      $("#loginMessage").text("Login exitoso").css("color","green");
      window.location.href = "menu.html";
    } else {
      $("#loginMessage").text("Usuario o contraseña incorrectos").css("color","red");
    }
  });

  // Mostrar formulario de registro
  $("#showRegister").on("click", function(){
    $("#registerForm").removeClass("d-none");
    $("#loginForm").addClass("d-none");
    $("#loginMessage").text("");
  });

  // Cancelar registro
  $("#cancelRegister").on("click", function(){
    $("#registerForm").addClass("d-none");
    $("#loginForm").removeClass("d-none");
  });

  // Registro
  $("#registerForm").on("submit", function(e){
    e.preventDefault();
    let u = $("#newUsername").val().trim(), p = $("#newPassword").val().trim();

    if(usuarios.find(x => x.username === u)){
      alert("Ese usuario ya existe");
    } else {
      usuarios.push({username:u,password:p});
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Inicializar cuenta nueva con saldo 0 y datos vacíos
      localStorage.setItem(`saldo_${u}`, 0);
      localStorage.setItem(`transacciones_${u}`, JSON.stringify([]));
      localStorage.setItem(`contactos_${u}`, JSON.stringify([]));

      alert("Usuario registrado exitosamente");
      $("#registerForm").addClass("d-none");
      $("#loginForm").removeClass("d-none");
    }
  });

  // Modo oscuro persistente
  if(localStorage.getItem("darkMode") === "enabled") $("body").addClass("dark-mode");
  $("#darkModeToggle").on("click", function(){
    $("body").toggleClass("dark-mode");
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled");
  });
});