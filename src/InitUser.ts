import type User from "./interfaces/User";
import AuthService from "./services/AuthService";
import AxiosService from "./services/AxiosService";
import { store } from "./store";

export async function initUser(): Promise<User | null> {
    const auth = new AuthService;
    let user = auth.getUserFromTheBrowser();
    
    if( ! user)        
        return null;
     
    try {
        await auth.getAuthUser();
        store.commit('setUser', {...user, ...{token: user.token}});
    } catch (error) {  
        user = null;
    }

    return user;
}