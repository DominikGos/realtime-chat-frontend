import type User from "@/interfaces/User";

interface AuthState {
    user: User | undefined
}

const state: AuthState = {
    user: undefined
}

const auth = {
    state,

    mutations: {
        setUser(state: AuthState, user?: User): void {
            state.user = user;
        }
    }
}

export default auth;