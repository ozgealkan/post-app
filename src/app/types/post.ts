export interface Post {
    id: number;
    userId: number;
    username: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    displayCount: number;
    moreInfo: string;
    published: boolean;
}

export interface PostCreate {
    userId: number;
    username: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    displayCount: number;
    moreInfo: string;
    published: boolean;
}

export interface PostUpdate {
    id: number;
    username?: string;
    userId?: number;
    title?: string;
    content?: string;
    updatedAt?: string;
    createdAt?:string
    displayCount?: number;
    moreInfo?: string;
    published?: boolean;
}