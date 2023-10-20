import axios from "axios";

export default class AxiosService {
    public setAuthToken(token: string): void {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    public setDefaults(): void {
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
    }
}