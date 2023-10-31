import type User from "@/interfaces/User";
import type Message from "@/interfaces/Message";

const auth = {
    state: {
        user: null
    },

    chatsIds: null,

    newMessage: null,

    removedMessage: null,

    mutations: {
        setUser(state: any, user?: User): void {
            state.user = user;
        },

        setUserChatsIds(state: any, ids?: number[]): void {
            state.chatsIds = ids;
        },

        setNewMessage(state: any, message?: Message): void {
            state.newMessage = message;
        },

        setRemovedMessage(state: any, message?: Message): void {
            state.removedMessage = message;
        }
    }
}

export default auth;