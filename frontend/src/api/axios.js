import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8082',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
