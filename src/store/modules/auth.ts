import type User from "@/interfaces/User";

interface AuthState {
    user: User | undefined
}

const state: AuthState = {
    user: undefined
}

const auth = {
    state
}

export default auth;