import type User from '@/interfaces/User';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import FormService from './FormService';

export default class AuthService extends FormService {
    public async login(user: User): Promise<void> {
        await this.send('post', '/login', user)
    }
}




/* export const useAuth = {
    ...useForm,

    login: async function(user: User) {
        this.send(() => {
            axios.post('/login', user);
        })
    }
};
 */