export interface Todo {
    id?: number;
    user_id: number;
    title: string;
    status: boolean;
    created_at?: string;
}