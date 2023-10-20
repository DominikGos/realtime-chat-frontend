import type User from '@/interfaces/User';
import FormService from './FormService';
import axios from 'axios';

export default class AuthService extends FormService {
    public async login(user: User): Promise<void> {
        await this.send('post', '/login', user)
    }

    public async register(user: User): Promise<void> {
        await this.send('post', '/register', user)
    }

    public async getAuthUser(): Promise<void> {
        await this.send('get', '/user');
    }

    public saveUserInTheBrowser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUserFromTheBrowser(): User | null {
        const userString: string = localStorage.getItem('user')!;
        const user: User = JSON.parse(userString) as User;
        
        return user;
    }

    public removeUserFromTheBrowser(): void {
        localStorage.removeItem('user');
    }
}