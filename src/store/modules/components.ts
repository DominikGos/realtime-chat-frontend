import type Chat from "@/interfaces/User";
import type User from "@/interfaces/User";

const components = {
    state: {
        panel: {
            name: 'Chats'
        },

        chat: null,

        profile: null,
    },

    mutations: {
        setPanel(state: any, name: string): void {
            state.panel.name = name;
        },

        setChat(state: any, chat?: Chat): void { 
            state.chat = chat;
        },

        setProfile(state: any, profile?: User) {
            state.profile = profile;
        }
    }
}

export default components;