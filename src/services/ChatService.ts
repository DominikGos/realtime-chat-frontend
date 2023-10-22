import FormService from "./FormService";

export default class ChatService extends FormService {
    public async createChat(friendId: number): Promise<void> {
        await this.send('post', '/chats', {friend_id: friendId});
    }
}