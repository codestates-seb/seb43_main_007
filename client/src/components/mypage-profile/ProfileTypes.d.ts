export interface AccountDeleteModalProps {
   open: boolean;
   close: () => void;
}

export interface PasswordChangeForm {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}
