import type User from "@/interfaces/User";
import type Message from "@/interfaces/Message";

const broadcastedData = {
    newMessage: null,

    removedMessage: null,

    updatedUser: null,

    mutations: {
        setNewMessage(state: any, message?: Message): void {
            state.newMessage = message;
        },

        setRemovedMessage(state: any, message?: Message): void {
            state.removedMessage = message;
        },

        setUpdatedUser(state: any, user?: User): void {
            state.updatedUser = user;
        }
    }
}

export default broadcastedData;