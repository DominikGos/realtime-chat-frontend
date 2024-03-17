import { store } from "@/store";

export default function removeMessageToAnswer(): void {
    store.commit('setMessageToAnswer', null);
}