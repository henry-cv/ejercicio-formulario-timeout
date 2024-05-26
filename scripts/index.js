// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};

// ACTIVIDAD

// Paso a paso:

// 1) Escuchar el evento necesario para reaccionar cuando la persona
// haga click en el botón iniciar sesión.

// 2) El proceso de inicio de sesión deberá tener una demora de 3 segundos.
// Deberás agregar la función correspondiente para simular dicha demora.

// 3) Durante el tiempo indicado anteriormente, se deberá mostrar el mensaje "Iniciando sesión..."

// 4) A partir de los inputs ingresados en el formulario, se deberan realizar las siguientes validaciones:
// 1) Que el primer input sea un email válido.
// 2) Que la contraseña tenga al menos 5 caracteres.
// 3) Que los datos ingresados corresponden a una
// persona que se encuentre registrada en la base de datos.
// En caso de que alguna de las validaciones no sea exitosa,
// se deberá mostrar un mensaje de error que diga "Alguno de los datos ingresados son incorrectos"

// 5) En caso de que los datos ingresados sean correctos, se deberá ocultar el formulario y mostrar
// un mensaje de bienvenida al sitio.

/*
TIPS:
  - Puedes averiguar acerca de la manera de validar el formato de un email utilizando Javascript, buscando
    en internet frases como "Validar email con Javascript o similar".

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y
    estilos predefinidos para ayudarte a completar la actividad.

  - También te dejamos algunos mensajes que te pueden ser de utilidad:

   Mensaje de error => <small>Alguno de los datos ingresados son incorrectos</small>

   Mensaje de bienvenida => "<h1> Bienvenido al sitio 😀 </h1>";

   ¡Manos a la obra!
 */
function leerEmail(email) {
  return /^[\w \_\.]{4,}@[a-z]{3,}\.[a-z]{2,3}$/.test(email);
}
function leerClave(password) {
  return password.length > 4;
}
const $email = document.getElementById("email-input");
$email.setAttribute("autocomplete", true);
$email.setAttribute("required", true);

const $password = document.getElementById("password-input");
$password.setAttribute("required", true);

const loader = document.getElementById("loader");
const divErrores = document.getElementById("error-container");
const btnLogin = document.querySelector("button.login-btn");

btnLogin.addEventListener("click", () => {
  const errores = [];
  const emailValue = $email.value;
  const passwordValue = $password.value;

  if (!leerEmail(emailValue)) {
    errores.push(`Email incorrecto.`);
  }
  if (!leerClave(passwordValue)) {
    errores.push(`Contraseña no aceptada.`);
  }
  const renderizarError = () => {
    divErrores.innerHTML = "";
    let error = document.createElement("small");
    error.textContent = "Alguno de los datos ingresados son incorrectos";
    divErrores.appendChild(error);
    divErrores.classList.remove("hidden");
    /* $email.value = "";
    $password.value = ""; */
    return;
  };
  if (errores.length > 0) {
    renderizarError();
  } else {
    divErrores.classList.add("hidden");
    loader.classList.remove("hidden");
    let espera = setTimeout(() => {
      loader.classList.add("hidden");
      const titulo = document.querySelector("main>h1");
      const form = document.querySelector("form");
      form.classList.remove("hidden");
      if (validarCuenta(emailValue, passwordValue)) {
        form.classList.add("hidden");
        titulo.textContent = "Bienvenido al sitio 😀";
      } else {
        renderizarError();
      }
    }, 3000);
    //clearTimeout(espera);
  }
});
function validarCuenta(email, password) {
  const encontrado = baseDeDatos.usuarios.find(
    (usuario) => usuario.email === email
  );
  if (encontrado == undefined || encontrado == null) {
    return false;
  }
  return encontrado.email === email && encontrado.password == password;
}

/* console.log("ahora con claves incorrectas");
console.log(
  `user: "steve@jobs.com","Steve", ${validarCuenta("steve@jobs.com", "Steve1")}`
);
console.log(
  `user: "shanna@melissa.tv","Ervin5", ${validarCuenta(
    "shanna@melissa.tv",
    "Ervin3"
  )}`
);
console.log(
  `user: "nathan@yesenia.net","Floppy376", ${validarCuenta(
    "nathan@yesenia.net",
    "Floppy398"
  )}`
);
console.log(
  `user: "julianne.oconner@kory.org","MysuperPassword22", ${validarCuenta(
    "julianne.oconner@kory.org",
    "MysuperPassword22"
  )}`
);
 */
