import type Chat from "@/interfaces/User";
import type User from "@/interfaces/User";
import type ModalFile from "@/interfaces/ModalFile";

const components = {
    state: {
        panel: {
            name: 'Chats'
        },

        chat: null,

        profile: null,

        file: null,

        flashMessage: null,
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
        },

        setFile(state: any, modalFile?: ModalFile): void {
            state.file = modalFile;
        },

        setFlashMessage(state: any, flashMessage?: string): void {
            state.flashMessage = flashMessage;
        },
    }
}

export default components;