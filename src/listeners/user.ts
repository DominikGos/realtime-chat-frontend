import { store } from "@/store";

export function listenUsers() {
    window.Echo.channel(`user.updated`)
        .listen('UserUpdated', (e: any) => {
            store.commit('setUpdatedUser', e.user)
        })
}