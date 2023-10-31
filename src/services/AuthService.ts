import type User from '@/interfaces/User';
import FormService from './FormService';
import AxiosService from './AxiosService';
import { store } from '@/store';
import UserService from './UserService';

export default class AuthService extends FormService {
    private axiosService?: AxiosService;
    private userService?: UserService;

    public constructor() {
        super();

        this.axiosService = new AxiosService;
        this.userService = new UserService;
    }

    private async initUserData(authToken: string): Promise<void> {
        await this.getAuthUser();
        await this.userService?.getUserChatsIds();
        
        store.commit('setUser', {...this.data, ... {token: authToken}}); //fix user endpoint
        store.commit('setUserChatsIds', this.userService?.data.ids);
    }

    public async login(user: User): Promise<void> {
        await this.send('post', '/login', user)
    }

    public async register(user: User): Promise<void> {
        await this.send('post', '/register', user)
    }

    public async logout(): Promise<void> {
        await this.send('post', '/logout', undefined)
    }

    public async getAuthUser(): Promise<void> {
        await this.send('get', '/user');
    }

    public async userHasValidToken(userFromTheBrowser: User | null): Promise<boolean> {
        if (!userFromTheBrowser || ! userFromTheBrowser.token) {
            store.commit('setUser', undefined);
            
            return false;
        }

        await this.axiosService!.setAuthToken(userFromTheBrowser.token!);

        try {
            this.initUserData(userFromTheBrowser.token)
           
            return true;
        } catch (error) {
            console.error(error);
            
            store.commit('setUser', undefined);
            store.commit('setUserChatsIds', undefined);
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