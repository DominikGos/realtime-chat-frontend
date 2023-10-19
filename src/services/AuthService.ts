import type User from '@/interfaces/User';
import FormService from './FormService';

export default class AuthService extends FormService {
    public async login(user: User): Promise<void> {
        await this.send('post', '/login', user)
    }

    public async register(user: User): Promise<void> {
        await this.send('post', '/register', user)
    }
}