'use strict'

let oculto = true;

function mostrarChatbot() {
    if (oculto) {
        $('#chatbot').removeClass('hide-chatbot')
        $('span.chatbot').addClass('hide-chatbot')
        $('#icono-chatbot').html("close")
        oculto = false
    } else {
        $('#chatbot').css('animation', 'ocultar-chatbot-d .5s ease-in-out')
        setTimeout(() => {
            ocultarChatbot();
            oculto = true
            $('#chatbot').css('animation', 'mostrar-chatbot-d .5s ease-in-out')
        }, 500)

    }
}


function ocultarChatbot() {
    $('#chatbot').addClass('hide-chatbot')
    $('span.chatbot').removeClass('hide-chatbot')
    $('#icono-chatbot').html("chat_bubble_outline")
}