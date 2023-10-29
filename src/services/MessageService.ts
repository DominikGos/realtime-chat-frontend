import FormService from "./FormService";
import type MessageInterface from '@/interfaces/Message';
import { store } from "@/store";
import { AxiosError } from "axios";

export default class Message extends FormService {
    public async getMessages(chatId: number, start: number, limit?: number): Promise<void> {
        const endpoint: string = limit 
            ?  `/chats/${chatId}/messages?start=${start}&limit=${limit}`
            :  `/chats/${chatId}/messages?start=${start}`;

        try {
            await this.send('get', endpoint)
        } catch (error: any) {
            store.commit('setChatError', error)
        }
    }

    public async createMessage(chatId: number, message: MessageInterface): Promise<void> {
        try {
            await this.send('post', `/chats/${chatId}/messages`, message);
        } catch (error: any) {
            store.commit('setChatError', error)
        }
    }
   
    public async deleteMessage(chatId: number, messageId: number): Promise<void> {
        try {
            await this.send('delete', `/chats/${chatId}/messages/${messageId}`);
        } catch (error: any) {
            store.commit('setChatError', error)
        }
    }

    public async createFile(files: FileList): Promise<void> {
        try {
            await this.send(
                'post',
                '/chats/messages/files',
                { files: files },
                { 'Content-Type': 'multipart/form-data' }
            )
        } catch (error: any) {
            store.commit('setChatError', error)
        }
    }

    public async removeFile(fileLink: string): Promise<void> {
        try {
            await this.send(
                'delete',
                '/chats/messages/files',
                { file_link: fileLink }
            );
        } catch (error: any) {
            store.commit('setChatError', error)
        }
    }
}