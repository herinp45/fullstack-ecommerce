// This file sets up an Axios instance for making API requests to your backend server.
import axios from "axios";

const axiosInstance = axios.create({
    baseURL:  process.env.REACT_APP_API_URL, // Replace with your backend server URL
});
