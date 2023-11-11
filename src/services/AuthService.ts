import type User from '@/interfaces/User';
import FormService from './FormService';
import AxiosService from './AxiosService';
import { store } from '@/store';
import UserService from './UserService';
import { clearState } from '@/helpers/state';

export default class AuthService extends FormService {
    private axiosService?: AxiosService;
    private userService?: UserService;

    public constructor() {
        super();

        this.axiosService = new AxiosService;
        this.userService = new UserService;
    }

  /*   private async initUserData(authToken: string): Promise<void> {
        await this.getAuthUser();
        await this.userService?.getUserChatsIds();
        
        store.commit('setUser', {...this.data.user, ... {token: authToken}}); 
        store.commit('setUserChatsIds', this.userService?.data.ids);
    } */

    public async login(user: User): Promise<void> {
        try {
            await this.send('post', '/login', user)
        } catch (error) {
            console.error(error);
        }
    }

    public async register(user: User): Promise<void> {
        try {
            await this.send('post', '/register', user)
        } catch (error) {
            console.error(error);
        }
    }

    public async logout(): Promise<void> {
        try {
            await this.send('post', '/logout', undefined)

            clearState();
        } catch (error) {
            console.error(error);
        }       
    }

    public async userHasValidToken(token: string): Promise<boolean> {
        try {
            await this.send('get', '/user', undefined, {Authorization: `Bearer ${token}`});
            await this.axiosService!.setAuthToken(token);
            await this.userService?.getUserChatsIds();
        
            store.commit('setUser', {...this.data.user, ... {token: token}}); 
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

        if(userString) {
            user = JSON.parse(userString) as User;
        }

        return user;
    }

    public removeUserFromTheBrowser(): void {
        localStorage.removeItem('user');
    }
}