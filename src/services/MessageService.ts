import FormService from "./FormService";
import type MessageInterface from '@/interfaces/Message';

export default class Message extends FormService {
    public async getMessages(chatId: number, start: number): Promise<void> {
        await this.send('get', `/chats/${chatId}/messages?start=${start}`)
    }

    public async createMessage(chatId: number, message: MessageInterface): Promise<void> {
        await this.send('post', `/chats/${chatId}/messages`, message);
    }

    public async createFile(files: FileList): Promise<void> {
        await this.send(
            'post', 
            '/chats/messages/files', 
            {files: files}, 
            {'Content-Type': 'multipart/form-data'}
        );
    }
}