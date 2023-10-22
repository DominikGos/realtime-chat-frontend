import FormService from "./FormService";

export default class UserService extends FormService{
    public async getUsers(start: number): Promise<void> {
        await this.send('get', `/users?start=${start}`);
    }
}