export class User {
    id!: number;
    username!: string;
    password!: string;
    isAdmin!: boolean;

    constructor(username: string, password: string, isAdmin: boolean) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}