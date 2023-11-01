import type User from "@/interfaces/User";
import type Message from "@/interfaces/Message";

const auth = {
    state: {
        user: null
    },

    chatsIds: null,

    mutations: {
        setUser(state: any, user?: User): void {
            state.user = user;
        },

        setUserChatsIds(state: any, ids?: number[]): void {
            state.chatsIds = ids;
        },
    }
}

export default auth;