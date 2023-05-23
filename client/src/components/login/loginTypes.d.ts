// dependency cycle 때문에 따로 뺌
export interface LoginTypes {
   username: string;
   password: string;
}
export interface FindPasswordType {
   [key: string]: string;
   email: string;
   question: string;
   answer: string;
}
