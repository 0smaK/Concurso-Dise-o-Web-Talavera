'use strict'

setTimeout(() => {
    mostrarLugares('alojamientos')
}, 250)

function setFiltro(filtro) {
    switch (filtro) {
        case 'todos':
            $('.f-filtros').removeClass('active')
            $('#todos').addClass('active')
            $('.todos').removeClass('d-none')
            $('.favs, .vistos').addClass('d-none')
            break;

        case 'favs':
            $('.f-filtros').removeClass('active')
            $('#favs').addClass('active')
            $('.favs').removeClass('d-none')
            $('.todos, .vistos').addClass('d-none')
            break;

        case 'vistos':
            $('.f-filtros').removeClass('active')
            $('#vistos').addClass('active')
            $('.vistos').removeClass('d-none')
            $('.favs, .todos').addClass('d-none')
            break;

        default:
            break;
    }
}

function mostrarLugares(tipo) {
    $('.todos .row').html('')
    for (let lugar of lugares[tipo]) {
        let cardHTML = `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card card-plans" onclick="abrirPlan(${"'" + tipo + "'"},${"'" + lugar['nombre'] + "'"})">
                <img class="card-img-top" style="height:175px; object-fit:cover;" src="${lugar['imagenes'][0]}" alt="${lugar['nombre']}">
                <div class="card-body">
                    <h3 class="card-title oswald">${lugar['nombre']}</h3>
                    <p align="justify" class="card-text">${lugar['descripcion'].length > 275 ? lugar['descripcion'].slice(0, 275) + "<i style='color:grey'>... Seguir leyendo</i>" : lugar['descripcion']}</p>
                    <div class="text-center">
                        <span class="me-gusta"><i class="fa fa-heart"></i>  &nbsp;Me gusta</span>
                    </div>
                </div>
            </div>
        </div>
        `
        $('.todos .row').append(cardHTML)
    }
}

function obtenerServicios(lugar) {
    let servicios = ""
    for (let servicio of lugar['servicios']) {
        if (typeof servicio !== 'undefined') {
            let servicioMin = servicio.toLowerCase()
            if (servicioMin.includes('wifi')) servicios += `<span class="servicios-plan"><i class="fas fa-wifi"></i> ${servicio}</span>`
            else if (servicioMin.includes('parking')) servicios += `<span class="servicios-plan"><i class="fas fa-parking"></i> ${servicio}</span>`
            else if (servicioMin.includes('aire acondicionado')) servicios += `<span class="servicios-plan"><i class="far fa-snowflake"></i> ${servicio}</span>`
            else if (servicioMin.includes('restaurante')) servicios += `<span class="servicios-plan"><i class="fas fa-utensils"></i> ${servicio}</span>`
            else if (servicioMin.includes('bar')) servicios += `<span class="servicios-plan"><i class="fas fa-glass-martini-alt"></i> ${servicio}</span>`
            else servicios += `<span class="servicios-plan">${servicio}</span>`
        }
    }
    return servicios
}

function seleccionarImg(img){
    console.log(img)
    $('.img-principal').attr('src',img)
}

function obtenerImagenes(lugar) {
    let imagenes = ""
    for (let imagen of lugar['imagenes']) {
        if (typeof imagen !== 'undefined') {
            imagenes += `<img src="${imagen}" alt="foto de ${lugar["nombre"]}" onclick="seleccionarImg('${imagen}')">`
        }
    }
    return imagenes
}

function mostrarInfo(lugar) {
    let servicios = obtenerServicios(lugar)
    let imagenes = obtenerImagenes(lugar)
    let html = `
        <span class="btn-salir-plan" onclick="salirPlan()">
        <i class="fas fa-times"></i> &nbsp;Salir
    </span>
    <span class="me-gusta-round">
        <i class="far fa-heart"></i>
    </span>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 col-lg-5 text-center">
                <img class="img-principal" src="${lugar['imagenes'][0]}" alt="">
                <div class="imagenes-plan text-center">
                    ${imagenes}
                </div>
            </div>
            <div class="col-md-12 col-lg-7">
                <h3 class="oswald">${lugar['nombre']}</h3>
                <div class="servicios-plan">
                   ${servicios}
                </div>
                <div class="descripcion-plan">
                    <p align="justify">
                        ${lugar['descripcion']}
                    </p>
                </div>
            </div>
        </div>
    </div>
        `
    $('#mostrar-plan').html('')
    setTimeout(() => {
        $('#mostrar-plan').append(html)
    }, 250)
}

function abrirPlan(tipo, nombre) {
    let height = $(window).height() - 64;
    height += "px"
    $('#mostrar-plan').css('height', height);
    $('body').css('overflow', 'hidden')
    let lugarSel
    for (let lugar of lugares[tipo]) {
        if (lugar['nombre'] == nombre) {
            lugarSel = lugar
        }
    }
    $('#mostrar-plan').removeClass("d-none")
    $('.salir-plan').css('animation', 'mostrarplan 0.5s ease-in-out')
    setTimeout(() => {
        $('#mostrar-plan').css('overflow-y', 'auto')
    }, 500)

    mostrarInfo(lugarSel)
}

function salirPlan() {
    $('.btn-salir-plan').addClass('desplazar-i')
    $('#mostrar-plan').addClass('salir-plan')
    setTimeout(() => {
        $('.salir-plan').css('animation', 'salirPlan .5s ease-in')
    }, 350)
    setTimeout(() => {
        $('#mostrar-plan').addClass("d-none")
        $('.btn-salir-plan').removeClass('desplazar-i')
        $('#mostrar-plan').removeClass('salir-plan')
        $('body').css('overflow', 'auto')
        $('#mostrar-plan').removeAttr('style')
    }, 850)
}