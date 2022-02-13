export interface User {
    id:number;
    name:string;
    surname:string;
    email: string;
    password:string;
}
export interface UserCreate {
    name:string;
    surname:string;
    email: string;
    password:string;
}