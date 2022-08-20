import axios from "axios";
const BASE_URL = 'https://localhost:44363';

export default axios.create({
    baseURL: BASE_URL
});