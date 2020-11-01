export class User {
    uid: string;
    mail: string;
    role: UserRole;

    constructor(uid?: string, mail?: string, role?: UserRole) {
        this.uid = uid;
        this.mail = mail || null;
        this.role = role || UserRole.MEMBER;
    }
}

export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member'
}