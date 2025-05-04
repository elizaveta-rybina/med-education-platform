<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест JWT Auth</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        button { padding: 10px 15px; margin: 5px; cursor: pointer; }
        .auth-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        pre { background: #f4f4f4; padding: 10px; overflow-x: auto; }
    </style>
</head>
<body>
<h1>Тест JWT Auth</h1>

<div class="auth-section">
    <h2>Регистрация</h2>
    <input type="text" id="reg-name" placeholder="Имя" value="Alice">
    <input type="email" id="reg-email" placeholder="Email" value="alice@example.com">
    <input type="password" id="reg-password" placeholder="Пароль" value="password123">
    <button onclick="register()">Зарегистрироваться</button>
</div>

<div class="auth-section">
    <h2>Вход</h2>
    <input type="email" id="login-email" placeholder="Email" value="alice@example.com">
    <input type="password" id="login-password" placeholder="Пароль" value="password123">
    <button onclick="login()">Войти</button>
</div>

<div class="auth-section">
    <h2>Проверка токена</h2>
    <button onclick="checkAuth()">Проверить /me</button>
    <button onclick="logout()">Выйти</button>
</div>

<div id="result"></div>

<script>
    const API_URL = 'http://localhost:8000/api';
    let token = localStorage.getItem('token');

    function showResult(data) {
        document.getElementById('result').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    // Регистрация
    async function register() {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, password_confirmation: password })
        });
        const data = await response.json();
        showResult(data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            token = data.token;
        }
    }

    // Вход
    async function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        showResult(data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            token = data.token;
        }
    }

    // Проверка токена
    async function checkAuth() {
        if (!token) {
            showResult({ error: 'Токен не найден. Сначала войдите.' });
            return;
        }

        const response = await fetch(`${API_URL}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        showResult(data);
    }

    // Выход
    async function logout() {
        if (!token) {
            showResult({ error: 'Токен не найден.' });
            return;
        }

        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        showResult(data);
        localStorage.removeItem('token');
        token = null;
    }
</script>
</body>
</html>
