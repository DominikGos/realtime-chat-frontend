import type { AxiosError } from "axios";

const components = {
    state: {
        globalError: null,
        chatError: null,
    },

    mutations: {
        setGlobalError(state: any, error: string): void {
            state.globalError = error;
        },
        setChatError(state: any, error: AxiosError): void {
            state.chatError = error;
        },
    }
}

export default components;