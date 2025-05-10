document.querySelector('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
});

function login(email, password) {
    let message = '';
    let alertType = '';

    const LOGIN_ENDPOINT = 'https://reqres.in/api/login';
    fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({
            email, password
        }) 
    })
    .then(response => { 
        return response.json().then(data => {
            return { status: response.status, data: data };
        })
    })
    .then(result => {
        if (result.status === 200) {
            localStorage.setItem('authToken', result.data.token);
            window.location.href = 'admin/dashboard.html';
        } else {
            alertType = 'danger';
            message = 'Usuario o contraseña incorrectos.';
            alertBuilder(alertType, message);
        }
    })
    .catch(error => {
        alertType = 'danger';
        message = 'Error inesperado: ' + error;
        alertBuilder(alertType, message);
    })
}

function alertBuilder(alertType, message) {
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            <strong>${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.getElementById('alert').innerHTML = alert;
}