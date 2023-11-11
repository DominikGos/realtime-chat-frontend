import { store } from '@/store';

export function clearState(): void {
    store.commit('setUser', undefined);
    store.commit('setUserChatsIds', undefined);
    store.commit('setChat', undefined);
}