// This file sets up an Axios instance for making API requests to your backend server.
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://44.220.136.49:8082/api', // Replace with your backend server URL
});
