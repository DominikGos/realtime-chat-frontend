import { store } from '@/store';
import { leaveChannels } from '@/pusher/leaveChannels';
import removeMessageToAnswer from './removeMessageToAnswer';

export function clearState(): void {
    leaveChannels(store.state.auth.user);
    store.commit('setUser', undefined);
    store.commit('setUserChatsIds', undefined);
    store.commit('setChat', undefined);
    removeMessageToAnswer();
}