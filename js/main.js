/*** DIRIGE AL PRODUCTO ***/
const navLinks = document.querySelectorAll('a[href^="#"]'); // Obtener todos los enlaces que apuntan a secciones dentro de la página
let carrito = [];

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
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

// Traer datos de la base de datos local
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

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

// Función para mostrar los productos por categoría
const mostrarProductos = (productos, contenedor) => {
    contenedor.innerHTML = ""; // Limpiar el contenedor de productos antes de mostrar los nuevos productos

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
                <button class="producto-agregar">AGREGAR!</button>
            </div>
        `;

        // Agregar el div al contenedor de productos
        contenedor.appendChild(div);

        // Obtener el botón "Agregar al carrito" recién creado
        const botonAgregar = div.querySelector(".producto-agregar");

        // Asignar el evento click al botón "Agregar al carrito"
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.titulo);
        });
    });
};

// Función para agregar productos al carrito
const agregarAlCarrito = (tituloProducto) => {
    // Buscar el producto por su título
    const producto = productos.find(prod => prod.titulo === tituloProducto);

    if (producto) {
        // Buscar si ya existe el producto en el carrito
        const itemEncontrado = carrito.find(item => item.titulo === producto.titulo);
        if (itemEncontrado) {
            itemEncontrado.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Actualizar el carrito en el DOM
        actualizarCarrito();

        // Mostrar mensaje de éxito usando Toastify
        Toastify({
            text: "Producto agregado al carrito!",
            gravity: "bottom", // Puedes ajustar la posición del mensaje
            position: "right",
            duration: 3000 // Duración del mensaje en milisegundos
        }).showToast();
    } else {
        console.error("Producto no encontrado");
    }
};

// Funciones para manipular el carrito
const sumarDelCarrito = (producto) => {
    producto.cantidad++;
    actualizarCarrito();

    Toastify({
        text: "Sumaste 1 producto.",
        gravity: "bottom",
        position: "right",
        duration: 1000
    }).showToast();
};

const restarDelCarrito = (producto) => {
    if (producto.cantidad !== 1) {
        producto.cantidad--;
    }
    actualizarCarrito();

    Toastify({
        text: "Quitaste 1 producto.",
        gravity: "bottom",
        position: "right",
        duration: 1000
    }).showToast();
};

const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex(item => item.titulo === producto.titulo);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();

    Toastify({
        text: "Producto ELIMINADO!",
        gravity: "bottom",
        position: "right",
        duration: 1000
    }).showToast();
};

const calcularTotalCarrito = () => {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.cantidad * producto.precio;
    });
    return total;
};

const actualizarCarrito = () => {
    console.log("Carrito:", carrito);
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        carritoTotal.classList.add("d-none");
        document.querySelector(".carritoTotal").classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        carritoTotal.classList.remove("d-none");
        carritoProductos.innerHTML = "";

        carrito.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("carrito-producto");

            const divTitulo = document.createElement("div");
            divTitulo.classList.add("carrito-producto-titulo");
            divTitulo.innerHTML = `<h3>${producto.titulo}</h3>`;
            divProducto.appendChild(divTitulo);

            const divDetalles = document.createElement("div");
            divDetalles.classList.add("carrito-producto-detalles");

            const precioCarrito = document.createElement("p");
            precioCarrito.innerText = `$${producto.precio}`;
            divDetalles.appendChild(precioCarrito);

            const btnRestar = document.createElement("button");
            btnRestar.classList.add("btn-carrito");
            btnRestar.innerText = "🔻";
            btnRestar.addEventListener("click", () => {
                restarDelCarrito(producto);
            });
            divDetalles.appendChild(btnRestar);

            const cantidad = document.createElement("p");
            cantidad.innerText = `${producto.cantidad}`;
            divDetalles.appendChild(cantidad);

            const btnSumar = document.createElement("button");
            btnSumar.classList.add("btn-carrito");
            btnSumar.innerText = "🔺";
            btnSumar.addEventListener("click", () => {
                sumarDelCarrito(producto);
            });
            divDetalles.appendChild(btnSumar);

            const subtotal = document.createElement("p");
            subtotal.innerText = `$${producto.cantidad * producto.precio}`;
            divDetalles.appendChild(subtotal);

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn-carrito");
            btnEliminar.innerText = "❌";
            btnEliminar.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });
            divDetalles.appendChild(btnEliminar);

            divProducto.appendChild(divDetalles);
            carritoProductos.appendChild(divProducto);
            });

        // Actualizar el total del carrito en el DOM
        carritoTotal.textContent = `$${calcularTotalCarrito()}`;
        // Mostrar el div "carritoTotal" cuando hay productos en el carrito
        document.querySelector(".carritoTotal").classList.remove("d-none");
    }
};