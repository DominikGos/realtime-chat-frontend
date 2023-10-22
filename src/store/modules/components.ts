import type User from "@/interfaces/User";

const components = {
    state: {
        panel: {
            name: 'Users'
        },
    },

    mutations: {
        setPanel(state: any, name: string): void {
            state.panel.name = name;
        }
    }
}

export default components;