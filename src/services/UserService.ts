import type User from "@/interfaces/User";
import HttpClientService from "./HttpClientService";

export default class UserService extends HttpClientService {
    public async getUsers(start: number, limit?: number): Promise<void> {
        const endpoint = limit
            ? `/users?start=${start}&limit=${limit}`
            : `/users?start=${start}`;

        await this.send('get', endpoint);
    }

    public async getUserChatsIds(): Promise<void> {
        await this.send('get', '/users/chats-ids');
    }

    public async updateUser(user: User): Promise<void> {
        await this.send('put', `/users/${user.id}`, user);
    }

    public async searchUsers(userName: string): Promise<void> {
        await this.send('get', `/users/${userName}`);
    }

    public async createFile(files: FileList): Promise<void> {
        await this.send(
            'post',
            '/users/files',
            { files: files },
            { 'Content-Type': 'multipart/form-data' }
        )

    }

    public async removeFile(fileLink: string): Promise<void> {
        await this.send(
            'delete',
            '/users/files',
            { file_link: fileLink }
        );
    }
}