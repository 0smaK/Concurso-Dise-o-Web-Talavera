'use strict'

let lugaresFAV = []

$(document).ready(() => {
    let favs = getMeGusta()
    if (favs == null) favs = []
    for (let fav of favs) {
        cambiarCorazon(fav.nombre)
    }
})

/**
 * Recibe los me gusta del local storage
 */
function getMeGusta() {
    return JSON.parse(localStorage.getItem("lugaresFAV")) == null ? [] : JSON.parse(localStorage.getItem("lugaresFAV"))  
}

/**
 * Establece en localstorage tus me gusta
 * @param {object} lugaresFAV 
 */
function setMeGusta(lugaresFAV) {
    localStorage.setItem("lugaresFAV", JSON.stringify(lugaresFAV))
}

/**
 * nombre existe en megusta?
 * @param {string} nombre 
 */
function existeEnMeGusta(nombre) {
    let favs = getMeGusta()
    let existe = false
    if (favs != null) {
        for (let fav of favs) {
            if (fav.nombre === nombre) existe = true
        }
    }
    return existe
}

/**
 * Da like a un lugar
 * @param {string} nombre 
 * @param {string} tipo 
 * @param {boolean} fuera 
 */
function meGusta(nombre, tipo, fuera) {
    if (fuera) salirPlanExc()
    let lugaresFav = []
    if (!existeEnMeGusta(nombre)) {
        $(`span#${nombre.replace(/[\W_]/g, "-")}`).addClass('active')
        lugaresFAV = getMeGusta()
        if (lugaresFAV == null) lugaresFAV = []
        setTimeout(() => {
            lugaresFAV.push({ "nombre": nombre, "tipo": tipo })
            setMeGusta(lugaresFAV)
        }, 200)
    } else {
        $(`span#${nombre.replace(/[\W_]/g, "-")}`).removeClass('active')
        lugaresFAV = getMeGusta()
        if (lugaresFAV == null) lugaresFAV = []
        if (existenMeGustas(tipo)) {
            if (lugaresFav.filter(fav => { return fav.nombre === nombre})) {
                lugaresFAV.splice(lugaresFAV.findIndex(fav => fav.nombre === nombre), 1)
                localStorage.removeItem("lugaresFAV")
                setMeGusta(lugaresFAV)
                mostrarMeGustas(tipo)
            }
        }
    }
}

/**
 * Mostrar todos los me gusta
 * @param {string} tipo 
 */
function mostrarMeGustas(tipo) {
    $('.favs .con-likes').removeClass('d-none')
    $('.favs .no-likes').addClass('d-none')
    let favs = getMeGusta()
    if (favs == null) favs = []
    if (!existenMeGustas(tipo)) mostrarNoTienesMeGusta()
    $('.favs .row').html('')
    for (let fav of favs.reverse()) {
        for (let lugar of lugares[tipo]) {
            if (fav.nombre == lugar["nombre"]) {
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
                $('.favs .row').append(cardHTML)
                $(`span#${fav.nombre.replace(/[\W_]/g, "-")}`).addClass('active')
            }
        }
    }
}

/**
 * Si no tienes me gusta..... mostrar un texto
 */
function mostrarNoTienesMeGusta() {
    $('.favs .con-likes').addClass('d-none')
    $('.favs .no-likes').removeClass('d-none')
}

/**
 * Cambia el color del boton de me gusta
 * @param {string} nombre 
 */
function cambiarCorazon(nombre) {
    if (existeEnMeGusta(nombre)) $(`span#${nombre.replace(/[\W_]/g, "-")}.me-gusta-round > i`).addClass('far').removeClass('fa')
    else $(`span#${nombre.replace(/[\W_]/g, "-")}.me-gusta-round > i`).removeClass('far').addClass('fa')
}

function cambiarCorazones() {
    let favs = getMeGusta()
    for (let fav of favs) {
        $(`span#${fav.nombre.replace(/[\W_]/g, "-")}.me-gusta-round > i`).removeClass('far').addClass('fa')
    }
}

/**
 * Funcion que retorna un boolean true si existe un me gusta para ese tipo
 * @param {*} tipo 
 */
function existenMeGustas(tipo){
    let favs = getMeGusta()
    let existe = false;
    if(favs == null || favs == undefined) favs = []
    for(let fav of favs)
        if(fav.tipo === tipo) existe = true
    return existe
}