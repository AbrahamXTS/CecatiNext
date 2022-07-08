import axios from "axios";

export const cecatiAPI = axios.create({
    baseURL: "/api"
});