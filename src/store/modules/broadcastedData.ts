import type User from "@/interfaces/User";
import type Message from "@/interfaces/Message";

const broadcastedData = {
    newMessage: null,

    removedMessage: null,

    mutations: {
        setNewMessage(state: any, message?: Message): void {
            state.newMessage = message;
        },

        setRemovedMessage(state: any, message?: Message): void {
            state.removedMessage = message;
        }
    }
}

export default broadcastedData;