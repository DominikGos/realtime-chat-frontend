import type Chat from "@/interfaces/User";

const components = {
    state: {
        panel: {
            name: 'Chats'
        },

        chat: null,
    },

    mutations: {
        setPanel(state: any, name: string): void {
            state.panel.name = name;
        },

        setChat(state: any, chat: Chat): void { 
            state.chat = chat;
        }
    }
}

export default components;