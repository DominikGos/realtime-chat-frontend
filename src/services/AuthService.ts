import type User from '@/interfaces/User';
import HttpClientService from './HttpClientService';
import AxiosService from './AxiosService';
import { store } from '@/store';
import UserService from './UserService';
import { clearState } from '@/helpers/clearState';

export default class AuthService extends HttpClientService {
    private axiosService?: AxiosService;
    private userService?: UserService;

    public constructor() {
        super();

        this.axiosService = new AxiosService;
        this.userService = new UserService;
    }

    public async login(user: User): Promise<void> {
        await this.send('post', '/login', user)
    }

    public async register(user: User): Promise<void> {
        await this.send('post', '/register', user)
    }

    public async logout(): Promise<void> {
        await this.send('post', '/logout', undefined)

        if (!this.errors) {
            clearState();
        }
    }

    public async userHasValidToken(token: string): Promise<boolean> {
        try {
            await this.send('get', '/user', undefined, { Authorization: `Bearer ${token}` });
            await this.axiosService!.setAuthToken(token);
            await this.userService?.getUserChatsIds();

            store.commit('setUser', { ...this.data.user, ... { token: token } });
            store.commit('setUserChatsIds', this.userService?.data.ids);

            return true;
        } catch (error) {
            clearState();
            this.removeUserFromTheBrowser();

            return false;
        }
    }

    public saveUserInTheBrowser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUserFromTheBrowser(): User | null {
        const userString: string = localStorage.getItem('user')!;
        let user: User | null = null;

        if (userString) {
            user = JSON.parse(userString) as User;
        }

        return user;
    }

    public removeUserFromTheBrowser(): void {
        localStorage.removeItem('user');
    }
}