import type User from "@/interfaces/User";

const components = {
    state: {
        panel: {
            name: 'Users'
        },

        chat: null,
    },

    mutations: {
        setPanel(state: any, name: string): void {
            state.panel.name = name;
        },

        setChat(state: any, chat: any): void { //create Chat interface
            state.chat = chat;
        }
    }
}

export default components;