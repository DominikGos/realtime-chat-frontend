import { store } from "@/store";

export function listenUsers() {
    window.Echo.channel(`user.updated`)
        .listen('UserUpdated', (e: any) => {
            console.log('??');
            
            store.commit('setUpdatedUser', e.user)
        })
}