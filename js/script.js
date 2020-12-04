// GUARDAR DATOS Esta función debería tomar los valores de los campos del formulario y guardar los datos en el localstorage.

// Funcion GuardarDatos

let prodArray = [];

function guardarDatos() {

    let producto = document.querySelector("#productoElegido");
    let cantidad = document.querySelector("#cantidadProducto");
    let precio = document.querySelector("#precioProducto");


    const listaProductos = {
        prod: producto.value,
        cant: cantidad.value,
        prec: precio.value
    }

    if (producto.value === "Seleccionar producto" || cantidad.value === "" || precio.value === "") {

        swal(`Por favor, complete todos los campos!`);

    } else {

        producto.value = "Seleccionar producto";
        cantidad.value = "";
        precio.value = "";

        prodArray.push(listaProductos);

        localStorage.setItem('listaProductos', JSON.stringify(prodArray));

    }

    producto.focus();
}

//***********************************************************//

// Mostrar Productos


function btnProductos() {

    let listaContieneProductos = JSON.parse(localStorage.getItem('listaProductos'));

    if (listaContieneProductos === null) {

        swal("Lista vacía!", "Por favor cargue productos.");

    } else {

        let divAgregarProductos = document.querySelector("#divAgregarProductos");
        divAgregarProductos.style.display = "none";
        let divListarProductos = document.querySelector("#divListarProductos");
        divListarProductos.style.display = "block";
        let lineaCabecera = document.querySelector("#lineaCabecera");
        lineaCabecera.style.display = "block";
        eliminarDivMostrarDatos();
    }

}

function btnAgregar() {
    let divAgregarProductos = document.querySelector("#divAgregarProductos");
    divAgregarProductos.style.display = "block";
    let divListarProductos = document.querySelector("#divListarProductos");
    divListarProductos.style.display = "none";
    let lineaCabecera = document.querySelector("#lineaCabecera");
    lineaCabecera.style.display = "none";

}

function eliminarDivMostrarDatos() {

    let divHijoEliminar = document.getElementById("divListarProductos");
    divHijoEliminar.innerHTML = "";

    mostrarDatos();

}

//***********************************************************//

// Funcion Mostrar Datos


function mostrarDatos() {

    let datosProductos = JSON.parse(localStorage.getItem('listaProductos'));

    let indice = 0;
    let indiceHTML = 0;

    for (let i = 0; i < datosProductos.length; i++) {

        indiceHTML++;

        let valorProd = datosProductos[i].prod;
        let valorCant = datosProductos[i].cant;
        let valorPrecio = datosProductos[i].prec;

        let divInicial = `<div class = "row estilo-listas" id = "${indice}">`;
        let divFinal = `</div>`
        let divColumnaNumeral = `<div class="col-1">${indiceHTML}</div>`;
        let divColumnaProducto = `<div class="col-4">${valorProd}</div>`;
        let divColumnaCantidad = `<div class="col-2">${valorCant}</div>`;
        let divColumnaPrecio = `<div class="col-3">${valorPrecio}</div>`;
        let divColumnaBtnEliminar = `<div class="col-2"><button class="estilo-btnEliminar" onclick=eliminarItem(${indice})><i class="far fa-trash-alt"></i></button></div>`;

        let tiraDatos = divInicial + divColumnaNumeral + divColumnaProducto + divColumnaCantidad + divColumnaPrecio + divColumnaBtnEliminar + divFinal;

        let divInsert = document.querySelector("#divListarProductos");
        divInsert.insertAdjacentHTML('beforeend', tiraDatos);

        indice++;

    }

}



//***********************************************************//

function eliminarItem(param1) {

    let listaProdEliminar = JSON.parse(localStorage.getItem('listaProductos'));
    let listaVacia = Object.entries(listaProdEliminar).length;

    if (listaVacia === 1) {

        console.log("no hay mas!");
        eliminarTodo();
        prodArray = [];

    } else {

        listaProdEliminar.splice(param1, 1);
        prodArray.splice(param1, 1);

        localStorage.setItem('listaProductos', JSON.stringify(listaProdEliminar));

        eliminarDivMostrarDatos();
    }

}




// Funcion eliminarTodo(): Limpia todo el storage y el DOM

function eliminarTodo() {

    localStorage.clear();

    let divEliminar = document.querySelector("#divListarProductos");

    while (divEliminar.firstChild) {
        divEliminar.removeChild(divEliminar.firstChild);
    }
}


function seguroBorrarTodo() {

    let listaProdBorrarTodo = JSON.parse(localStorage.getItem('listaProductos'));

    if (listaProdBorrarTodo === null) {

        swal("La lista no contiene productos");

    } else {

        swal({
                title: "Está seguro?",
                text: "Una vez eliminados no podrá recuperar los productos!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    eliminarTodo();
                    swal("La lista ha sido eliminada", { icon: "success", });
                } else {
                    swal("La lista no ha sido eliminada. Presione OK para seguir.");
                }
            });
    }
}


// Cartel bienvenida

window.onload = function() {
    saludoBienvenida();
}


function saludoBienvenida() {
    Swal.fire({
        title: ' ',
        text: 'Para continuar presiona OK.',
        imageUrl: '../images/bienvenidos1.jpg',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}