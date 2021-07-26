const carrito =  document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const  listaCursos = document.querySelector('#lista-cursos');
articulosCarrito= [];

cargarEvento()
function cargarEvento() {
    // cuando agregas un curso presionado "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
}

// funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        // console.log('boton');
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerdatos(cursoSeleccionado)
    }
    // Event Bubbling
    // console.log('preciono este boton');
}

// eliminar cursos del carrito
function eliminarCurso(e) {
    console.log('nnnnnnnn');
    if(e.target.classList.contains('borrar-curso')){
        // console.log(e.target.getAttribute('data-id'));
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo de articulosCarrito por data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);

        // carritoHtml()
    }
}


function leerdatos(cursoSeleccionado) {
    limpiar()

    const infoCursos = {
        imagen : cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCursos.id);
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCursos.id){
                curso.cantidad++;
                return curso
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito,infoCursos];
    }


    console.log(articulosCarrito);

    carritoHtml();
    
}

function carritoHtml() {
    articulosCarrito.forEach(curso =>{
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src ="${curso.imagen}" width="100" >
        </td>
        <td> ${curso.titulo} </td>
        <td> ${curso.precio} </td>
        <td> ${curso.cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        contenedorCarrito.appendChild(row)
    })
}

function limpiar() {
    contenedorCarrito.innerHTML='';
    // while(contenedorCarrito.firstChild){
    //     contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    // }
}