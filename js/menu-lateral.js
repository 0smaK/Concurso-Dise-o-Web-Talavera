'use strict'

let menuOculto = true;

cargarJSONTiempo(0)

/**
 * Abre el menu lateral
 */
function mostrarMenuLateral() {
    if (menuOculto) {
        $('.menu-lateral').removeClass('hide-menu')
        $('.menu-lateral-out').removeClass('hide-menu')
        $('.menu-lateral').css('animation', 'mostrar-menu-i 0.5s ease-in-out')
        setTimeout(() => {
            $('body').css('overflow','hidden')
        },500)
        menuOculto = false
    } else {
        $('.menu-lateral').css('animation', 'ocultar-menu-i 0.5s ease-in-out')
        setTimeout(() => {
            $('.menu-lateral').addClass('hide-menu')
            $('.menu-lateral-out').addClass('hide-menu')
            $('body').css('overflow','auto')
            menuOculto = true
            $('.menu-lateral').css('animation', 'mostrar-menu-i 0.5s ease-in-out')
        }, 500)

    }
}

/**
 * Carga el json con el tiempo de aemet
 * @param {*} dia 
 */
function cargarJSONTiempo(dia) {
    let url = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/45165/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvc2Nhcm1jOTlAZ21haWwuY29tIiwianRpIjoiYjMwYjJlNDItZGZiYi00Y2M1LWFlNDMtMTQ3Y2Y1ZWZhOTVmIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1NTkwNjc0MzQsInVzZXJJZCI6ImIzMGIyZTQyLWRmYmItNGNjNS1hZTQzLTE0N2NmNWVmYTk1ZiIsInJvbGUiOiIifQ._0ccALKpYYsiIGTqCibZY7fnLk5wV1D3hSL_8bMuRFg'
    $.getJSON(url)
        .done((data) => {
            returnDatos(data.datos, dia)
        })
}

/**
 * Retorna los datos de cargarJsonTiempo
 * @param {*} url 
 * @param {*} dia 
 */
function returnDatos(url, dia) {
    $.getJSON(url)
        .done((data) => {
            mostrarTemperatura(data[0]['prediccion']['dia'], dia)
        })
}

/**
 * Muestra la temperatura en Talavera de la Reina (en el menu)
 * @param {*} data 
 * @param {*} numDia 
 */
function mostrarTemperatura(data, numDia) {
    let i = 0;
    let estadoCieloArray = data[numDia]['estadoCielo']
    let descripcion = estadoCieloArray[estadoCieloArray.length - 1]['descripcion']
    let tempMax = data[numDia]['temperatura']['maxima']
    let tempMin = data[numDia]['temperatura']['minima']
    modificarTiempoDOM(descripcion, tempMin, tempMax, numDia)
}

/**
 * Funcion que accede al DOM para cambiar iconos y textos
 * @param {*} estadoCielo 
 * @param {*} min 
 * @param {*} max 
 * @param {*} dia 
 */
function modificarTiempoDOM(estadoCielo, min, max, dia) {
    $('.estadoCielo').html(estadoCielo)
    $('.temperaturas').html(min + "ºC&nbsp;&nbsp;&nbsp;" + max + "ºC")
    $('.dias-btn').removeClass('active')
    $('#dia-' + dia).addClass("active")
    $('#icono-tiempo').removeClass()
    if(dia == 0){
        $('.tiempo .min').html(min+" ºC")
        $('.tiempo .max').html(max+" ºC")
    }
    switch (estadoCielo) {
        case 'Despejado':
            $('#icono-tiempo').addClass('fas fa-sun')
            break;
        case 'Poco nuboso':
            $('#icono-tiempo').addClass('fas fa-cloud-sun')
            break;
        case 'Intervalos nubosos':
            $('#icono-tiempo').addClass('fas fa-cloud-sun')
            break;
        case 'Nuboso':
            $('#icono-tiempo').addClass('fas fa-cloud')
            break;
        case 'Muy nuboso':
            $('#icono-tiempo').addClass('fas fa-cloud')
            break;
        case 'Cubierto':
            $('#icono-tiempo').addClass('fas fa-cloud')
            break;
        case 'Nubes altas':
            $('#icono-tiempo').addClass('fas fa-cloud-sun')
            break;
        case 'Intervalos nubosos con lluvia':
            $('#icono-tiempo').addClass('fas fa-cloud-sun-rain')
            break;
        case 'Nuboso con lluvia':
            $('#icono-tiempo').addClass('fas fa-cloud-sun-rain')
            break;
        case 'Muy nuboso con lluvia':
            $('#icono-tiempo').addClass('fas fa-cloud-showers-heavy')
            break;
        case 'Cubierto con lluvia':
            $('#icono-tiempo').addClass('fas fa-cloud-showers-heavy')
            break;
        case 'Intervalos nubosos con nieve':
            $('#icono-tiempo').addClass('fas fa-snowflake')
            break;
        case 'Nuboso con nieve':
            $('#icono-tiempo').addClass('fas fa-snowflake')
            break;
        case 'Muy nuboso con nieve':
            $('#icono-tiempo').addClass('fas fa-snowflake')
            break;
        case 'Cubierto con nieve':
            $('#icono-tiempo').addClass('fas fa-snowflake')
            break;
        case 'Chubascos':
            $('#icono-tiempo').addClass('fas fa-cloud-showers-heavy')
            break;
        case 'Tormenta':
            $('#icono-tiempo').addClass('fas fa-bolt')
            break;
        case 'Granizo':
            $('#icono-tiempo').addClass('fas fa-cloud-meatball')
            break;
        case 'Bruma':
            $('#icono-tiempo').addClass('fas fa-smog')
            break;
        case 'Niebla':
            $('#icono-tiempo').addClass('fas fa-smog')
            break;
        case 'Calima':
            $('#icono-tiempo').addClass('fas fa-temperature-high')
            break;
        default:
            $('#icono-tiempo').addClass('fas fa-cloud')
            break;
    }
}


