'use strict'

setTimeout(() => {
    mostrarLugares('alojamientos')
}, 250)

function setFiltro(filtro, tipo) {
    switch (filtro) {
        case 'todos':
            $('.f-filtros').removeClass('active')
            $('#todos').addClass('active')
            $('.todos').removeClass('d-none')
            $('.favs, .vistos').addClass('d-none')
            break;

        case 'favs':
            mostrarMeGustas(tipo)
            $('.f-filtros').removeClass('active')
            $('#favs').addClass('active')
            $('.favs').removeClass('d-none')
            $('.todos, .vistos').addClass('d-none')
            break;

        case 'vistos':
            verHistorial(tipo)
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
                        <span id="${lugar["nombre"].replace(/[\W_]/g, "-")}" onclick="meGusta('${lugar['nombre']}','${tipo}',true)" class="me-gusta"><i class="fa fa-heart"></i>  &nbsp;Me gusta</span>
                    </div>
                </div>
            </div>
        </div>
        `
        $('.todos .row').append(cardHTML)
    }
    let favs = getMeGusta()
    if (favs != null) {
        for (let fav of favs) {
            $(`span#${fav.nombre.replace(/[\W_]/g, "-")}`).addClass('active')
        }
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

function obtenerLinks(lugar){
    let links = ""
    if(lugar['web']!="" && lugar['web']!=undefined) links+=`<a target="_blank" href="${lugar['web']}"><span class="links-plan"><i class="fas fa-link"></i> Visitar web</span></a>`
    if(lugar['mail']!="" && lugar['mail']!=undefined) links += `<a target="_blank" href="mailto:${lugar['mail']}"><span class="links-plan"><i class="fas fa-envelope"></i> Enviar e-mail</span></a>`
    if(lugar['telefono']!="" && lugar['telefono']!=undefined) links += `<span class="links-plan"><i class="fas fa-phone"></i> ${lugar['telefono']}</span>`
    return links
}

function seleccionarImg(img) {
    $('.img-principal').attr('src', img)
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

function mostrarInfo(lugar, tipo) {
    let servicios = obtenerServicios(lugar)
    let links = obtenerLinks(lugar)
    let imagenes = obtenerImagenes(lugar)
    let html = `
        <span class="btn-salir-plan" onclick="salirPlan()">
        <i class="fas fa-times"></i> &nbsp;Salir
    </span>
    <span id="${lugar["nombre"].replace(/[\W_]/g, "-")}" onclick="cambiarCorazon('${lugar['nombre']}');meGusta('${lugar['nombre']}','${tipo}',false)" class="me-gusta-round">
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
            <h2 class="oswald">${lugar['nombre']}</h2>
            <span style="font-size:14px;color:Gray;">${lugar['direccion']}</span>
                <div class="servicios-plan">
                    ${links}
                </div>
                <div class="descripcion-plan">
                <p align="justify">
                ${lugar['descripcion']}
                </p>
                </div>
                <h4 class="oswald">Servicios</h4>
                <div class="servicios-plan">
                   ${servicios}
                </div>
                <h4 class="oswald">Encuentralo en Google Maps!</h4>
                <div class="localizacion-maps text-center">
                    <iframe src="${lugar["maps"]}" width="85%" height="350px" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
        `
    $('#mostrar-plan').html('')
    setTimeout(() => {
        $('#mostrar-plan').append(html)
        setTimeout(() => {
            cambiarCorazones();
        }, 100)
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

    mostrarInfo(lugarSel, tipo)
    addHistorial(nombre, tipo)
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

function salirPlanExc() {
    setTimeout(() => {
        $('#mostrar-plan').addClass("d-none")
        $('body').css('overflow', 'auto')
        $('#mostrar-plan').removeAttr('style')
    }, 20)
}