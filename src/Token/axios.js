import axios from "axios";

const axiosConnect = axios.create({
    // baseURL: 'http://localhost:9000',
    baseURL: 'https://airbnbclonebackend-h76h.onrender.com',
    withCredentials: true,
});

export default axiosConnect;