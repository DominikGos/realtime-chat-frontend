import AuthService from "@/services/AuthService";

const authService = new AuthService;

export async function onlyAuthenticated(to: any): Promise<any> {
    const tokenIsValid = await authService.userHasValidToken(authService.getUserFromTheBrowser());

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
    const tokenIsValid = await authService.userHasValidToken(authService.getUserFromTheBrowser());

    if (tokenIsValid) {
        return {
            name: 'home',
            query: { redirect: to.fullPath },
        };
    } else {
        return true;
    }
}