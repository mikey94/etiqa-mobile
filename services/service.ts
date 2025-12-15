import axios, { type AxiosInstance } from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const apiUrl = `${baseUrl}?q=created:>2024-07-15&sort=stars&order=desc`;

const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default api;