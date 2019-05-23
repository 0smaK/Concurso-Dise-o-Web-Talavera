let mute = false

function cambiarBotonChatbot() {
    if ($("#chatbot-input").val().length > 0) {
        $(".enviar-msg").css("color", "#007bff")
    } else {
        $(".enviar-msg").css("color", "gray")
    }
}

function getMensaje() {
    let msg = $("#chatbot-input").val()
    if (msg !== "") {
        $('.chatbot-mensajes').append('<div class="d-flex justify-content-end mensaje"><div class="mensaje"><div class= "mensaje-burbuja enviadoPorTi">' + msg + '</div ></div></div>')
        analizarMensaje(msg)
        $("#chatbot-input").val('')
        var chat = document.getElementById("mensajes-chat");
        chat.scrollTop = chat.scrollHeight;
    }
}

let frasesNoEncontrado = ['Lo siento, no te he entendido', 'Lo siento, no te he entendido prueba a preguntar otra cosa o lo mismo pero de forma diferente', 'Lo siento, no te he entendido,</br> puedes preguntarme que puedo hacer']

let saludos = [
    'hola', 'hi', 'hello', 'buenas tardes', 'buenos dias', 'buenas noches'
]

let despedidas = [
    'adios', 'chao', 'bye', 'hasta la proxima', 'hasta otra'
]

let preguntasHabilidad = [
    'sabes', 'puedes', 'habilidad'
]

let accionesMostrar = [
    'mostrar', 'muestra', 'enseña', 'dime', 'cuales'
]

let ComplDirectoHabilidad = [
    'hacer', 'haces', 'algo', 'habilidad tienes'
]

let frasesSaludo = [
    '¡Hola!',
    '¡Hola! ¿Qué tal?',
    'Hola, buenos días preguntame cualquier cosa',
    'Hola! Preguntame que puedo hacer'
]

let frasesDespedida = [
    '¡Adios!',
    'Adios, espero que vuelvas!',
    '¡Hasta luego!',
    '¡Hasta otra!'
]

let frasesQuePuedoHacer = [
    'Aqui tienes algunas sugerencias:<span class="badge badge-pill badge-primary badge-chatbotBoton" onclick="recComer()">Recomiendame un sitio para comer</span><span class="badge badge-pill badge-primary badge-chatbotBoton" onclick="recVisitar()">Que puedo visitar</span><span class="badge badge-pill badge-primary badge-chatbotBoton" onclick="recDormir()">Dime donde puedo dormir</span>'
]

function silenciar() {
    mute = !mute
    if(mute) $('#volumen').html("volume_off")
    else $('#volumen').html("volume_up")
}

function vaciarChat() {
    $('.chatbot-mensajes').empty()
}

function desconectar() {
}

function analizarMensaje(msg) {
    let encontrado = false
    for (let despedida in despedidas) {
        if (msg.includes(despedidas[despedida]) && !encontrado) {
            encontrado = true
            decidirFrase(frasesDespedida)
            setTimeout(function () {
                $('#estado').html('Ausente');
                $('.online').css('background-color', 'orange');
            }, 1500);
        }
    }

    for (let habilidad in preguntasHabilidad) {
        for (let habil in ComplDirectoHabilidad) {
            if (msg.includes(preguntasHabilidad[habilidad]) && ComplDirectoHabilidad[habil] && !encontrado) {
                encontrado = true
                decidirFrase(frasesQuePuedoHacer)
            }
        }
    }
    for (let saludo in saludos) {
        if (msg.includes(saludos[saludo]) && !encontrado) {
            encontrado = true
            decidirFrase(frasesSaludo)
        }
    }

    if (!encontrado) decidirFrase(frasesNoEncontrado)
}

function decidirFrase(frases) {
    let num = Math.floor(Math.random() * (frases.length - 0) + 0)
    console.log(num)
    console.log(frases[num])
    sendMensaje(frases[num])
}

function sendMensaje(msg) {
    $('.online').css('background-color', 'lime');
    $('#estado').html('escribiendo...')
    setTimeout(function () {
        if (!mute) {
            var notificacion = document.getElementById('notificacion')
            notificacion.play()
        }
    }, 450);

    setTimeout(function () {
        $('.chatbot-mensajes').append('<div class="d-flex justify-content-start mensaje"><img src="./img/chatbot_img.png" class="chatbot-img-perfil-msg"><div class="mensaje"><div class= "mensaje-burbuja enviadoPorBot">' + msg + '</div ></div></div>')
        var chat = document.getElementById("mensajes-chat")
        chat.scrollTop = chat.scrollHeight
        $('#estado').html('En línea')
    }, 800);
}