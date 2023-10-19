export default interface User {
    id?: number,
    email: string,
    first_name: string,
    last_name: string,
    password?: string,
    avatar_link?: string,
    created_at?: Date,
    signed_in?: Date,
};