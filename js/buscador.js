'use strict'

setTimeout(() => {
    limpiarBusqueda()
    mostrarBotonLimpiar()
}, 100)

function mostrarBotonLimpiar() {
    if ($("#buscador").val().length > 0) {
        $(".limpiar").removeClass("d-none")
    } else {
        $(".limpiar").addClass("d-none")
        $('.busqueda').html('')
    }
}

function limpiarBusqueda() {
    $("#buscador").val('')
    agitar(0)
    mostrarBotonLimpiar()
}

let timer, delay = 200;

function buscar(tipo) {
    let busqueda = []
    clearTimeout(timer);
    timer = setTimeout(() => {
        let query = $('#buscador').val().toLowerCase()
        for (let lugar of lugares[tipo])
            lugar['nombre'].toLowerCase().includes(query) && query != "" ? busqueda.push(lugar) : $("#busqueda").html('')
        if (query != "") mostrarBusqueda(busqueda, tipo)
        else agitar(0)
    }, delay);
}

let busquedaAux = []
function mostrarBusqueda(busqueda, tipo) {
    if ((JSON.stringify(busquedaAux) != JSON.stringify(busqueda)) || ((JSON.stringify(busqueda) != "") && ($('.busqueda').html() == ""))) {
        $('.busqueda').html('')
        for (let lugar of busqueda) {
            $('.busqueda').append(`<div class="card-busqueda" onclick="abrirPlan(${"'" + tipo + "'"},${"'" + lugar['nombre'] + "'"})"><img src="${lugar['imagenes'][0]}" class="float-left" alt=""><div class="float-right"><h4 class="montserrat">${lugar['nombre']}</h4></div></div>`)
        }
        agitar($('.busqueda').html() == "" ? 1 : 0)
    }
    busquedaAux = busqueda
}

function agitar(flag) {
    if (flag) {
        $('input.buscador').addClass('agitar')
        $('.buscador .limpiar').addClass('agitar')
        $('.buscador .buscar').addClass('agitar')
        $('input.buscador').css('border', '1px solid red')
        $('input.buscador').css('color', 'crimson')
    } else {
        $('input.buscador').removeClass('agitar')
        $('.buscador .limpiar').removeClass('agitar')
        $('.buscador .buscar').removeClass('agitar')
        $('input.buscador').css('border', '1px solid white')
        $('input.buscador').css('color', 'black')
    }
}

function scrollBusqueda(derecha) {
    if (derecha) {
        $('.busqueda').animate({
            scrollLeft: "+=30px"
        }, 5);
    } else {
        $('.busqueda').animate({
            scrollLeft: "-=30px"
        }, .5);
    }
}

jQuery(function ($) {
    if ($('.busqueda').html() != "") {
        let ratonX
        $('.busqueda').mousemove((event) => {
            ratonX = event.pageX;
            if (ratonX > $('.busqueda').width() * (75 / 100)) scrollBusqueda(true)
            else if (ratonX < $('.busqueda').width() * (25 / 100)) scrollBusqueda(false)
        })
    }
})