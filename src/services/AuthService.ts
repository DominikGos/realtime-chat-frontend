import type User from '@/interfaces/User';
import FormService from './FormService';
import AxiosService from './AxiosService';
import { store } from '@/store';

export default class AuthService extends FormService {
    private axiosService?: AxiosService;

    public constructor() {
        super();

        this.axiosService = new AxiosService;
    }

    public async login(user: User): Promise<void> {
        await this.send('post', '/login', user)
    }

    public async register(user: User): Promise<void> {
        await this.send('post', '/register', user)
    }

    public async getAuthUser(): Promise<void> {
        await this.send('get', '/user');
    }

    public async userHasValidToken(userFromTheBrowser: User | null): Promise<boolean> {
        if (!userFromTheBrowser) {
            store.commit('setUser', undefined);
            
            return false;
        }

        await this.axiosService!.setAuthToken(userFromTheBrowser.token!);

        try {
            await this.getAuthUser();
            store.commit('setUser', {...userFromTheBrowser, ... {token: userFromTheBrowser.token}});
            
            return true;
        } catch (error) {
            console.error(error);
            
            store.commit('setUser', undefined);
            this.removeUserFromTheBrowser();

            return false;
        }
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