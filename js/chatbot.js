'use strict'

/**
 * Talabot -Chatbot- por Óscar Muñoz Cano
 * No utiliza NLP (natural language processing) ni ningun tipo de "inteligencia artifical"
 * Compara lo introducido con posibilidades de diferentes arrays in en funcion de su resultado dice una cosa el bot u otra
 * 
 * Ejemplo de frases introducidas por el usuario que el bot soportaria; (NOTA: no hace falta una correcta ortografia/gramatica de la oracion)
 * 
 * "Dime donde puedo dormir"
 * "¿El qué puedo visitar?"
 * "me aburro!!! que puedo hacer???"
 * "donde puedo comer? tengo hambre"
 * "hola, que tal!"
 * "adios!!!!"
 * "que puedes hacer??"
 */

let mute = false
/**
 * Acceso al DOM para cambio de diseño
 */
function cambiarBotonChatbot() {
    if ($("#chatbot-input").val().length > 0) {
        $(".enviar-msg").css("color", "#007bff")
    } else {
        $(".enviar-msg").css("color", "gray")
    }
}
/**
 * Recibe un mensaje al introducir intro en el chatbot
 */
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

/**
 * igual que getMensaje pero enviando el msg por argumentos
 * @param {string} msg 
 */
function setMsg(msg) {
    $('.chatbot-mensajes').append('<div class="d-flex justify-content-end mensaje"><div class="mensaje"><div class= "mensaje-burbuja enviadoPorTi">' + msg + '</div ></div></div>')
    analizarMensaje(msg)
    $("#chatbot-input").val('')
    var chat = document.getElementById("mensajes-chat");
    chat.scrollTop = chat.scrollHeight;
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

let intensifPregunta = [
    'puedo', 'donde'
]

let accionesMostrar = [
    'mostrar', 'muestra', 'enseña', 'dime', 'cuales', 'recomienda', 'que puedo'
]

let restaurantesOpt = [
    'cenar', 'comer', 'comida', 'hambre', 'gastronomia', 'merendar', 'merienda', 'desayun', 'ceno'
]

let hotelesOpt = [
    'hotel', 'dormir', 'alojamiento', 'sueño', 'alojar'
]

let visitasOpt = [
    'ver', 'lugares', 'turismo', 'visitar'
]

let ocioOpt = [
    'ocio', 'aburro', 'hacer'
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

let frasesHotel = [
    `Te recomiendo alojarte en ${getHotel()}`,
    `Si tienes sueño puedes preguntar por una habitación en ${getHotel()}`
]

let frasesRestaurante = [
    `¿Tienes hambre? echa un vistazo a ${getRestaurante()}`,
    `Si estás en Talavera y tienes hambre puedes pasarte por ${getRestaurante()}`
]

let frasesOcio = [
    `¿Aburrido? echa un vistazo a ${getOcio()}`,
    `¿Quieres pasarlo bien con tus amigos? mira esto: ${getOcio()}`
]

let frasesVisitar = [
    `Puedes visitar ${getVisitar()}`,
    `Visita ${getVisitar()}`
]

let frasesQuePuedoHacer = [
    `Aqui tienes algunas sugerencias:<span class="badge badge-pill badge-primary badge-chatbotBoton" onclick="setMsg('Recomiendame un sitio para comer')">Recomiendame un sitio para comer</span><span class="badge badge-pill badge-primary badge-chatbotBoton" onclick="setMsg('¿Qué puedo visitar?')">Que puedo visitar</span><span class="badge badge-pill badge-primary badge-chatbotBoton" onclick="setMsg('¿Dónde puedo dormir?')">Dime donde puedo dormir</span>`
]
/**
 * Silencia el chatbot
 */
function silenciar() {
    mute = !mute
    if (mute) $('#volumen').html("volume_off")
    else $('#volumen').html("volume_up")
}
/**
 * Vacia el historial de chats
 */
function vaciarChat() {
    $('.chatbot-mensajes').empty()
}

/**
 * Analiza el mensaje para mostrar una cosa u otra
 * @param {string} msg 
 */
function analizarMensaje(msg) {
    let encontrado = false

    for (let mostrar in accionesMostrar) {
        for (let intens in intensifPregunta) {
            if ((msg.includes(accionesMostrar[mostrar]) || msg.includes(intensifPregunta[intens])) && !encontrado) {
                for (let visitar in visitasOpt) {
                    if (msg.includes(visitasOpt[visitar]) && !encontrado) {
                        encontrado = true
                        decidirFrase(frasesVisitar)
                    }
                }
                for (let hotel in hotelesOpt) {
                    if (msg.includes(hotelesOpt[hotel]) && !encontrado) {
                        encontrado = true
                        decidirFrase(frasesHotel)
                    }
                }
                for (let restaurante in restaurantesOpt) {
                    if (msg.includes(restaurantesOpt[restaurante]) && !encontrado) {
                        encontrado = true
                        decidirFrase(frasesRestaurante)
                    }
                }
                for (let ocio in ocioOpt) {
                    if (msg.includes(ocioOpt[ocio]) && !encontrado) {
                        encontrado = true
                        decidirFrase(frasesOcio)
                    }
                }

            }
        }
    }

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
/**
 * Elige frase aleatoria dentro de un conjunto de frases
 * @param {string} frases 
 */
function decidirFrase(frases) {
    let num = Math.floor(Math.random() * (frases.length - 0) + 0)
    sendMensaje(frases[num])
}

/**
 * Envia el mensaje
 * @param {string} msg 
 */
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
/**
 * Getters para obtener lugares, puede ser refactorizado pasando el tipo de lugar por argumento y tener una funcion en vez de 4
 */
function getHotel() {
    let r = Math.floor(Math.random() * lugares['alojamientos'].length)
    return lugares['alojamientos'][r]['nombre']
}

function getRestaurante() {
    let r = Math.floor(Math.random() * lugares['restaurantes'].length)
    return lugares['restaurantes'][r]['nombre']
}

function getOcio() {
    let r = Math.floor(Math.random() * lugares['ocio'].length)
    return lugares['ocio'][r]['nombre']
}

function getVisitar() {
    let r = Math.floor(Math.random() * lugares['que-ver'].length)
    return lugares['que-ver'][r]['nombre']
}
