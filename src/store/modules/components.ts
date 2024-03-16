import type Chat from "@/interfaces/User";
import type User from "@/interfaces/User";
import type ModalFile from "@/interfaces/ModalFile";
import type FlashMessage from "@/interfaces/FlashMessage";
import type Message from "@/services/MessageService";

interface MessageSettings {
    showSettings: boolean,
    message?: Message
}

const components = {
    state: {
        panel: {
            name: 'Chats'
        },

        chat: null,

        profile: null,

        file: null,

        flashMessage: null,

        messageSettings: {
            showSettings: false,
            message: null
        }
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

        setFlashMessage(state: any, flashMessage?: FlashMessage): void {
            state.flashMessage = flashMessage;
        },

        setMessageSettings(state: any, messageSettings: MessageSettings): void {
            state.messageSettings.showSettings = messageSettings.showSettings;
            state.messageSettings.message = messageSettings.message;
        }
    }
}

export default components;