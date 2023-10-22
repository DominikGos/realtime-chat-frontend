import FormService from "./FormService";

export default class Message extends FormService {
    public async getMessages(chatId: number, start: number): Promise<void> {
        await this.send('get', `/chats/${chatId}/messages?start=${start}`)
    }
}