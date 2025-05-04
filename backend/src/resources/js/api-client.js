class ApiClient {
    constructor() {
        this.baseUrl = window.location.origin; // Автоподстановка Ngrok-URL
    }

    async register(data) {
        return this._request('api/register', 'POST', data);
    }

    async login(data) {
        return this._request('api/login', 'POST', data);
    }

    async getProfile(token) {
        return this._request('api/me', 'GET', null, token);
    }

    async _request(endpoint, method, data = null, token = null) {
        const url = `${this.baseUrl}/${endpoint}`;
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        });

        return response.json();
    }
}

// Пример использования:
// const api = new ApiClient('http://localhost:8000');
// api.register({ name: 'Alice', email: '...', password: '...' });
