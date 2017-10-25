import axios from 'axios';

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)
let instance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers: { 'Authorization': token, "Content-Type": "application/json"}
})

export default instance;