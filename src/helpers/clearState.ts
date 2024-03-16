import { store } from '@/store';
import { leaveChannels } from '@/pusher/leaveChannels';

export function clearState(): void {
    leaveChannels(store.state.auth.user);
    store.commit('setUser', undefined);
    store.commit('setUserChatsIds', undefined);
    store.commit('setChat', undefined);
    store.commit('setMessageToAnswer', null);
}