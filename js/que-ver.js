'use strict'

function abrirLugar(abrir) {
    if (abrir) {
        $('.mostrar-mas').addClass('full')
        $('.mostrar-mas i').removeClass('fa-chevron-up')
        $('.mostrar-mas i').addClass('fa-chevron-down')
        $('#otros-lugares > .row').html('')
        $('.mostrar-mas').attr("onclick", "abrirLugar(0)")
        setTimeout(() => {
            otrosLugares()
        }, 350)
        $('#otros-lugares').removeClass('d-none')

    } else {
        $('.mostrar-mas').addClass('nofull')
        $('#otros-lugares').addClass('d-none')
        $('.mostrar-mas i').removeClass('fa-chevron-down')
        $('.mostrar-mas i').addClass('fa-chevron-up')
        setTimeout(() => {
            $('.mostrar-mas').removeClass('nofull')
            $('.mostrar-mas').removeClass('full')
            $('#otros-lugares').addClass('d-none')
        }, 375)
        $('.mostrar-mas').attr("onclick", "abrirLugar(1)")
    }
}

$(function () {
    mostrarLugar(lugares['que-ver'][0]['nombre']);
});

function mostrarLugar(nombre) {
    console.log(nombre)
    nombre = nombre == undefined ? "" : nombre
    let lugarSel = ''
    for (let lugar of lugares['que-ver'])
        if (nombre == lugar['nombre']) lugarSel = lugar
    $('#lugar-que-ver').html('')
    let html = `
    <div class="row">
            <div class="col-12 col-lg-4" style="margin:0;padding:0;">
                <div class="imagen-lugar" style="background:url(${lugarSel['imagenes'][0]});background-size: cover;background-position: center;">                 
                    <div class="cover-imagen">
                            <p class="oswal"><i class="fas fa-camera"></i> Más fotos</p>
                    </div>
                </div>
                <div class="info-lugar">
                    <h3 class="oswald text-center" style="padding: 15px;">${lugarSel['nombre']}</h3>
                    <p style="padding:0 20px;">${lugarSel['descripcion']}</p>
                </div>
                <div class="busqueda d-none">
                    <div class="row"></div>
                </div>
            </div>
            <div class="col-12 col-lg-8" style="height:calc(100vh - 64px); margin:0; padding: 0;position: relative;">
                <div class="mostrar-mas text-center" onclick="abrirLugar(1)">
                    <h2 class="montserrat">Explorar otros lugares <i class="fas fa-chevron-up"></i></h2>
                    <div class="container-fluid" id="otros-lugares" class="d-none">
                        <div class="row"></div>
                    </div>
                </div>
                <iframe class="gmap"
                    src="${lugarSel['maps']}"
                    width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </div>
    `
    $('#lugar-que-ver').append(html)
}

function otrosLugares() {
    $('#otros-lugares > .row').html('')
    for (let lugar of lugares['que-ver']) {
        let card =
            `
        <div class="col-12 col-md-6 col-lg-4">
        <div class="card card-plans" onclick="mostrarLugar('${lugar['nombre']}')">
        <img class="card-img-top" style="height:175px; object-fit:cover;" src="${lugar['imagenes'][0] != undefined ? lugar['imagenes'][0] : ""}" alt="${lugar['nombre']}">
        <div class="card-body">
        <h3 class="card-title oswald">${lugar['nombre']}</h3>
        <p align="justify" class="card-text">${lugar['descripcion'].length > 100 ? lugar['descripcion'].slice(0, 100) + "<i style='color:grey'>... Seguir leyendo</i>" : lugar['descripcion']}</p>
        </div>
        </div>
        </div>
        `
        $('#otros-lugares > .row').append(card)
    }
}

function buscarQV() {
    let busqueda = []
    clearTimeout(timer);
    timer = setTimeout(() => {
        let query = $('#buscador').val().toLowerCase()
        for (let lugar of lugares['que-ver']) {
            if (lugar['nombre'].toLowerCase().includes(query) && query != "") {
                busqueda.push(lugar)
            }
            else {
                $(".busqueda .row").html('')
            }
        }
        if (query != "") mostrarBusquedaQV(busqueda)
        else {
            $('.busqueda').addClass('d-none')
            $('.info-lugar').removeClass('d-none')
            agitar(0)
        }
    }, delay);
}

function mostrarBusquedaQV(busqueda) {
    if ($('.busqueda').html() == "") $('.busqueda').append('<div class="row"></div>')
    if ((JSON.stringify(busquedaAux) != JSON.stringify(busqueda)) || ((JSON.stringify(busqueda) != "") && ($('.busqueda .row').html() == ""))) {
        $('.busqueda .row').html('')
        for (let lugar of busqueda) {
            $('.busqueda > .row').append(`<div class="col-12"><div class="card-busqueda" onclick="mostrarLugar(${"'" + lugar['nombre'] + "'"})"><img src="${lugar['imagenes'][0]}" class="float-left" alt=""><div class="float-right"><h5 class="montserrat">${lugar['nombre']}</h5></div></div></div>`)
        }
        let existe = $('.busqueda .row').html() == "" ? false : true
        agitar(existe ? 0 : 1)
        if (existe) {
            $('.busqueda').removeClass('d-none')
            $('.info-lugar').addClass('d-none')
        } else {
            $('.busqueda').addClass('d-none')
            $('.info-lugar').removeClass('d-none')
        }
    }
    busquedaAux = busqueda
}

function mostrarBotonLimpiarQV() {
    if ($("#buscador").val().length > 0) {
        $(".limpiar").removeClass("d-none")
    } else {
        $(".limpiar").addClass("d-none")
        $('.busqueda .row').html('')
    }
}

function limpiarBusquedaQV() {
    $("#buscador").val('')
    $('.busqueda').addClass('d-none')
    $('.info-lugar').removeClass('d-none')
    agitar(0)
    mostrarBotonLimpiarQV()
}
