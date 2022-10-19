import axios from 'axios';

export const urls = {
    login: '/api/token/',
    register: '/activity-logs/api/register/',
    posts: '/activity-logs/api/posts/',
    stats: '/activity-logs/api/posts/stats/'
};

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
})

const ACCESS_TOKEN = localStorage.getItem("__ACCESS_TOKEN");
const REFRESH_TOKEN = localStorage.getItem("__REFRESH_TOKEN");
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;