import axios from "axios";

export const Instance = axios.create({
    baseURL:"http://localhost:9000",
})