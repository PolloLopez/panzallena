/*** DIRIGE AL PRODUCTO ***/
const navLinks = document.querySelectorAll('a[href^="#"]');// Obtener todos los enlaces que apuntan a secciones dentro de la página


navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

let productos = [];

// Lista de categorías y sus contenedores asociados
const categorias = [
    { nombre: "RAVIOLONES", contenedor: "#contRaviolones" },
    { nombre: "SORRENTINOS", contenedor: "#contSorrentinos" },
    { nombre: "CAPELETTIS", contenedor: "#contCapelettis" },
    { nombre: "CANELONES", contenedor: "#contCanelones" },
    { nombre: "TALLARINES", contenedor: "#contTallarines" },
    { nombre: "NOCONES", contenedor: "#contNocones" },
    { nombre: "LASAGNA", contenedor: "#contLasagna" },
    { nombre: "SALSAS", contenedor: "#contSalsas" },
    { nombre: "POSTRES", contenedor: "#contPostres" }
];


/*traer de base de datos local */
fetch("./data/productos.json")
    .then(res => res.json())    
    .then(data => {
        productos = data;
        
        // Iterar sobre las categorías y mostrar los productos
        categorias.forEach(categoria => {
            const productosFiltrados = productos.filter(producto => producto.categoria === categoria.nombre);
            const contenedor = document.querySelector(categoria.contenedor);
            mostrarProductos(productosFiltrados, contenedor);
        });
    });


// Función para mostrar los productos en el contenedor especificado
const mostrarProductos = (productos, contenedor) => {
    let botonesAgregar = document.querySelectorAll(".producto-agregar");

    // Limpiar el contenedor de productos antes de mostrar los nuevos productos
    contenedor.innerHTML = "";

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("tarj-container");
        div.innerHTML = `
            <div class="tarj-index">
                <img class="tarj-img" src="${producto.img}" alt="${producto.titulo}">
                <h5 class="titulo-tarj">${producto.titulo}</h5>
                <p class="tarj-descrip">${producto.descripcion}</p>
                <p class="tarj-precio">$${producto.precio}</p>
                <p class="tarj-cant">${producto.cantidad}</p>
                <button class="producto-agregar" id="${producto.id}">AGREGAR!</button>
            </div>
        `;

        //        Agregar el div al contenedor de productos
        contenedor.appendChild(div);
   });
};



function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton=> {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito =[];

function agregarAlCarrito(e) {

    const id = e.currentTarget.id;
    console.log(id);

}








        // Agregar el evento al botón
        // div.querySelector(".producto-agregar").addEventListener("click", () => {
        //     agregarAlCarrito(producto);
        // });




// Función ficticia para agregar al carrito (puedes personalizarla según tu lógica)
//const agregarAlCarrito = (producto) => {
   // console.log(`Producto añadido: ${producto.titulo}`);
//};
