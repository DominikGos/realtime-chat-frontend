import { store } from '@/store';
import { leaveChats } from '@/pusher/leaveChannels/chat';

export function clearState(): void {
    leaveChats();
    store.commit('setUser', undefined);
    store.commit('setUserChatsIds', undefined);
    store.commit('setChat', undefined);
}