document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html';
    } else {
        verificarToken(token);
    }
});

function verificarToken(token) {
    if (!token) {
        window.location.href = '../index.html';
    }
}

function inicio() {
    document.getElementById('content').innerHTML = `
        <h2>Bienvenido al Dashboard</h2>
        <p>Seleccione una opción del menú para comenzar.</p>
    `;
}

function usuarios() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    fetch('https://reqres.in/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        let html = '<h2>Lista de Usuarios</h2><div class="row">';
        data.data.forEach(user => {
            html += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${user.avatar}" class="card-img-top" alt="${user.first_name}">
                        <div class="card-body">
                            <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                            <p class="card-text">${user.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
        document.getElementById('content').innerHTML = `
            <div class="alert alert-danger">Error al cargar usuarios: ${error.message}</div>
        `;
    });
}

function productos() {
    const productos = [
        { id: 1, nombre: "Producto 1", precio: 100, imagen: "https://via.placeholder.com/150" },
        { id: 2, nombre: "Producto 2", precio: 200, imagen: "https://via.placeholder.com/150" },
        { id: 3, nombre: "Producto 3", precio: 300, imagen: "https://via.placeholder.com/150" }
    ];

    let html = '<h2>Lista de Productos</h2><div class="row">';
    productos.forEach(producto => {
        html += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    document.getElementById('content').innerHTML = html;
}

function salir() {
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
}