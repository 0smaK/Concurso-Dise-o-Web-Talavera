'use strict'

function setVistos(vistos) {
    localStorage.setItem("vistos", JSON.stringify(vistos))
}

function getVistos() {
    return JSON.parse(localStorage.getItem("vistos"))
}

function borrarHistorial(){
    localStorage.removeItem("vistos")
    historialVacio()
}

function addHistorial(nombre, tipo) {
    let vistos = getVistos()
    if (vistos == null || vistos == undefined) vistos = []
    if (!visto(nombre)) {
        vistos.push({ "nombre": nombre, "tipo": tipo })
        setVistos(vistos)
    } else if (vistos.length > 0)
        if (vistos.filter(visto => { return visto.nombre === nombre })) {
            vistos.splice(vistos.findIndex(visto => visto.nombre === nombre), 1)
            vistos.push({ "nombre": nombre, "tipo": tipo })
            localStorage.removeItem("vistos")
            setVistos(vistos)
        }
}

function visto(nombre) {
    let vistoBool = false
    let vistos = getVistos()
    if (vistos == null || vistos == undefined) vistos = []
    for (let visto of vistos) if (visto.nombre == nombre) vistoBool = true
    return vistoBool
}

function verHistorial(tipo) {
    $('.vistos .vistos-true').removeClass('d-none')
    $('.vistos .no-vistos').addClass('d-none')
    $('.vistos .row').html('')
    let vistos = getVistos()
    if (vistos == null || vistos == undefined || vistos == []){
        vistos = []
        historialVacio()
    }
    else
        for (let visto of vistos.reverse())
            for (let lugar of lugares[tipo])
                if (visto.nombre == lugar["nombre"]) {
                    let cardHTML = `
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="card card-plans" onclick="abrirPlan(${"'" + tipo + "'"},${"'" + lugar['nombre'] + "'"})">
                                <img class="card-img-top" style="height:175px; object-fit:cover;" src="${lugar['imagenes'][0]}" alt="${lugar['nombre']}">
                                <div class="card-body">
                                    <h3 class="card-title oswald">${lugar['nombre']}</h3>
                                    <p align="justify" class="card-text">${lugar['descripcion'].length > 275 ? lugar['descripcion'].slice(0, 275) + "<i style='color:grey'>... Seguir leyendo</i>" : lugar['descripcion']}</p>
                                </div>
                            </div>
                        </div>
                        `
                    $('.vistos .row').append(cardHTML)
                }
}

function historialVacio() {
    let vistos = getVistos()
    if (vistos == null || vistos == undefined || vistos == []) {
        $('.vistos .no-vistos').removeClass('d-none')
        $('.vistos .vistos-true').addClass('d-none')
    }
}