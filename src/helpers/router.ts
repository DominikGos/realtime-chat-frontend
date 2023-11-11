import AuthService from "@/services/AuthService";
import type User from "@/interfaces/User";

const authService = new AuthService;

export async function onlyAuthenticated(to: any): Promise<any> {
    const user: User | null = authService.getUserFromTheBrowser();
    let tokenIsValid: Boolean = false;

    if(user && user.token) {
        tokenIsValid = await authService.userHasValidToken(user.token);
    }

    if (tokenIsValid) {
        return true;
    } else {
        return {
            name: 'login',
            query: { redirect: to.fullPath },
        };
    }
}

export async function onlyUnauthenticated(to: any): Promise<any> {
    const user: User | null = authService.getUserFromTheBrowser();
    let tokenIsValid: Boolean = false;

    if(user && user.token) {
        tokenIsValid = await authService.userHasValidToken(user.token);
    }

    if (tokenIsValid) {
        return {
            name: 'home',
            query: { redirect: to.fullPath },
        };
    } else {
        return true;
    }
}