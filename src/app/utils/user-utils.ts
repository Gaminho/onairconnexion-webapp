import { UserRole } from "../interfaces/user";

export const translateRole = (role: UserRole) => {
    if (role == UserRole.ADMIN) {
        return 'Administrateur';
    } else if (role == UserRole.MEMBER) {
        return 'Membre';
    } else {
        return 'Inconnu'
    }
};