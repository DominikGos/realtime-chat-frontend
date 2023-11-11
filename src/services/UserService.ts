import type User from "@/interfaces/User";
import FormService from "./FormService";

export default class UserService extends FormService{
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
        try {
            await this.send('put', `/users/${user.id}`, user);
        } catch (error) {
            console.error(error);
        }
    }
    
    public async createFile(files: FileList): Promise<void> {
        try {
            await this.send(
                'post',
                '/users/files',
                { files: files },
                { 'Content-Type': 'multipart/form-data' }
            )
        } catch (error: any) {
            console.error(error);
        }
    }

    public async removeFile(fileLink: string): Promise<void> {
        try {
            await this.send(
                'delete',
                '/users/files',
                { file_link: fileLink }
            );
        } catch (error: any) {
            console.error(error);
        }
    }
}