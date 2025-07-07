// src/shared/api/baseApi.ts
import axios from 'axios'

export const baseApi = axios.create({
	baseURL: 'http://localhost:8000/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

baseApi.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
