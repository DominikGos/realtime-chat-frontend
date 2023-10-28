import type { AxiosError } from "axios";

const components = {
    state: {
        chatError: null,
    },

    mutations: {
        setChatError(state: any, error: AxiosError): void {
            state.chatError = error;
        },

    }
}

export default components;