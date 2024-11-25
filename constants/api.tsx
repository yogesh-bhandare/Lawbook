import axios from "axios";

const baseurl = process.env.EXPO_PUBLIC_SERVER_URL

const api = axios.create({
    baseURL:baseurl,
    timeout:5000,
    headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
    }
})

export default api;
