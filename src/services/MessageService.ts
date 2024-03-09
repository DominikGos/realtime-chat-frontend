import HttpClientService from "./HttpClientService";
import type MessageInterface from '@/interfaces/Message';
import { store } from "@/store";
import { AxiosError } from "axios";

export default class Message extends HttpClientService {
    public async getMessages(chatId: number, start: number, limit?: number): Promise<void> {
        const endpoint: string = limit
            ? `/chats/${chatId}/messages?start=${start}&limit=${limit}`
            : `/chats/${chatId}/messages?start=${start}`;

        await this.send('get', endpoint)

        if (this.errors) {
            store.commit('setChatError', { message: this.errorMessage })
        }
    }

    public async createMessage(chatId: number, message: MessageInterface): Promise<void> {
        await this.send('post', `/chats/${chatId}/messages`, message);

        if (this.errors) {
            store.commit('setChatError', { message: this.errorMessage })
        }
    }

    public async deleteMessage(chatId: number, messageId: number): Promise<void> {
        await this.send('delete', `/chats/${chatId}/messages/${messageId}`);

        if (this.errors) {
            store.commit('setChatError', { message: this.errorMessage })
        }
    }

    public async createFile(files: FileList): Promise<void> {
        await this.send(
            'post',
            '/chats/messages/files',
            { files: files },
            { 'Content-Type': 'multipart/form-data' }
        )

        if (this.errors) {
            store.commit('setChatError', { message: this.errorMessage })
        }
    }

    public async removeFile(fileLink: string): Promise<void> {
        await this.send(
            'delete',
            '/chats/messages/files',
            { file_link: fileLink }
        );

        if (this.errors) {
            store.commit('setChatError', { message: this.errorMessage })
        }
    }
}