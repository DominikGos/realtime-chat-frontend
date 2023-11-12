import FormService from "./FormService";

export default class ChatService extends FormService {
    public async createChat(friendId: number): Promise<void> {
        await this.send('post', '/chats', {friend_id: friendId});
    }

    public async getChats(start: number): Promise<void> {
        await this.send('get', `/chats?start=${start}`);
    }

    public async destroyUnreadMessages(chatId: number): Promise<void> {
        await this.send('delete', `/chats/${chatId}/unread-messages`);
    }
}