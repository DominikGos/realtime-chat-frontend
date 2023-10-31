import type User from "@/interfaces/User";


const auth = {
    state: {
        user: null
    },

    chatsIds: null,

    mutations: {
        setUser(state: any, user?: User): void {
            state.user = user;
        },

        setUserChatsIds(state: any, ids?: number[]) {
            state.chatsIds = ids;
        }
    }
}

export default auth;