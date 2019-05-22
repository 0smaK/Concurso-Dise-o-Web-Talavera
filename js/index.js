let oculto = true;

function mostrarChatbot() {
    if (oculto) {
        $('#chatbot').removeClass('hide-chatbot')
        $('span.chatbot').addClass('hide-chatbot')
        $('#icono-chatbot').html("close")
        oculto = false
    } else {
        ocultarChatbot();
        oculto = true
    }
}


function ocultarChatbot() {
    $('#chatbot').addClass('hide-chatbot')
    $('span.chatbot').removeClass('hide-chatbot')
    $('#icono-chatbot').html("chat_bubble_outline")
}