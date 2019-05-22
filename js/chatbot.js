

function cambiarBotonChatbot() {
    if ($("#chatbot-input").val().length > 0) {
        $(".enviar-msg").css("color", "#007bff")
    } else {
        $(".enviar-msg").css("color", "gray")
    }
}

function getMensaje() {
    let msg = $("#chatbot-input").val()
    $('.chatbot-mensajes').append('<div class="d-flex justify-content-end mensaje"><div class="mensaje"><div class= "mensaje-burbuja enviadoPorTi">' + msg + '</div ></div></div>')
    analizarMensaje(msg)
    $("#chatbot-input").val('')
    var chat = document.getElementById("mensajes-chat");
    chat.scrollTop = chat.scrollHeight;
}

let saludos = [
    'hola', 'hi', 'hello', 'buenas tardes', 'buenos dias', 'buenas noches'
]

let frasesSaludo = [
    '¡Hola!',
    '¡Hola! ¿Qué tal?',
    'Hola, buenos días preguntame cualquier cosa',
    'Hola! Preguntame que puedo hacer'
]

function analizarMensaje(msg) {
    let encontrado = false
    for (let saludo in saludos) {
        if (msg.includes(saludos[saludo]) && !encontrado) {
            encontrado = true
            decidirFrase(frasesSaludo)
        }
    }
}

function decidirFrase(frases) {
    let num = Math.floor(Math.random() * (frases.length - 0) + 0)
    console.log(num)
    console.log(frases[num])
    sendMensaje(frases[num])
}

function sendMensaje(msg) {
    $('.chatbot-mensajes').append('<div class="d-flex justify-content-start mensaje"><img src="./img/chatbot_img.png" class="chatbot-img-perfil-msg"><div class="mensaje"><div class= "mensaje-burbuja enviadoPorBot">' + msg + '</div ></div></div>')
    var chat = document.getElementById("mensajes-chat");
    chat.scrollTop = chat.scrollHeight;
}