import { store } from '@/store';
import type FlashMessage from '@/interfaces/FlashMessage';

export function setFlashMessage(flashMessage: FlashMessage): void {
    store.commit('setFlashMessage', flashMessage);
}