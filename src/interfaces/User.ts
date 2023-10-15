export default interface User {
    uid?: string,
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
    avatarPath?: string,
    createdAt?: Date,
    signedIn?: Date,
};