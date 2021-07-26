// variables
const carrito =  document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const  listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEvenlistener()
function cargarEvenlistener() {
    // cuando agregar un curso presionando  "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        // console.log('preciono este boton');
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)

    }
}

//lee el documento del HTML  al quele dimos clcik y extrae la infomacion del curso
function leerDatosCurso(cursoSeleccionado){
    // console.log(cursoSeleccionado);
    limpiarHtml()
    // objeto con el contenido del Objeto actual
    const infoCursos = {
        imagen : cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    articulosCarrito = [...articulosCarrito, infoCursos];

    console.log(articulosCarrito);

    carrtitoHtml()
}

function carrtitoHtml() {
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

// elimina los cursos del tbody
function limpiarHtml() {
    contenedorCarrito.innerHTML='';
}