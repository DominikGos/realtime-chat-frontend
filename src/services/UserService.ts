import FormService from "./FormService";

export default class UserService extends FormService{
    public async getUsers(start: number, limit?: number): Promise<void> {
        const endpoint = limit 
            ? `/users?start=${start}&limit=${limit}`
            : `/users?start=${start}`;
        
        await this.send('get', endpoint);
    }
}