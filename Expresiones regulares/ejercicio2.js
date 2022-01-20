function checkPhone() {
    var cadenaUser = document.querySelector("#phone").value
    var regExp = new RegExp(/^(\+34-)?[0-9]{9}$/)
    var resultado = regExp.test(cadenaUser);
    if (resultado) { alert("Teléfono correcto") }
    else { alert("Teléfono incorrecto, vuelva a introducirlo") }
}

function checkMail() {
    var cadenaUser = document.querySelector("#mail").value
    var regExp = new RegExp(/^[a-z]{1,20}@[a-z]{1,20}.[a-z]{3}$/i)
    var resultado = regExp.test(cadenaUser);
    if (resultado) { alert("Correo correcto") }
    else { alert("Correo incorrecto, vuelva a introducirlo") }
}

function checkFormatDNi () {
    var cadenaUser = document.querySelector("#dni").value
    var regExp = new RegExp(/^[0-9]{8}(-)?[A-Z]$/i)
    return regExp.test(cadenaUser);
}

function checkRealDni() {
    var input = document.querySelector("#dni").value
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    var guion = "-"
    var dni = input.toUpperCase() 
    var nums = parseInt(dni.substring(0, dni.length - 1));
    var letra = letras[nums % letras.length]; // [nums % letras.length] = posicion de la letra del array de la policia
    // Modificada función del algoritmo de la policía para que admita dni con  y sin guion
    return dni.charCodeAt(8) >= "A".charCodeAt(0) && dni.charCodeAt(8) <= "Z".charCodeAt(0) && !isNaN(nums) && letra == dni[8] || (guion == dni[8] && letra == dni[9]);
}

function dniTodo() {
    return checkFormatDNi() && checkRealDni()
}

function checkDni() {
    var dniOk = dniTodo()
     if (dniOk)
     {alert("DNI correcto")}
     else {alert("DNI incorrecto, vuelva a introducirlo")}
}

var boton1 = document.querySelector("#button1")
boton1.addEventListener("click", checkDni, false)

var boton2 = document.querySelector("#button2")
boton2.addEventListener("click", checkPhone, false)

var boton3 = document.querySelector("#button3")
boton3.addEventListener("click", checkMail, false)
