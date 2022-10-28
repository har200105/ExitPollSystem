import { API } from "../../constants/api";

const loginServiceAPI = async (payload) =>
    API.post("/api/login", payload);
    
const registerServiceAPI = async (payload) =>
    API.post("/api/register", payload);


const loadUserAPI = async() =>
        API.get("/api/me");    

export const loginService = async (payload) => {
    try {
        const response = await loginServiceAPI(payload);
        return response?.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};


export const registerService = async (payload) => {
    try {
        const response = await registerServiceAPI(payload);
        return response?.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};


export const loadUserService = async () => {
    try {
        const response = await loadUserAPI();
        return response?.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};
    

