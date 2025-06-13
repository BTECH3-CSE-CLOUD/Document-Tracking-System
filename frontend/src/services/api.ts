import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Table {
    id: number;
    number: number;
    capacity: number;
    is_available: boolean;
}

export interface Reservation {
    id: number;
    table: Table;
    date: string;
    time: string;
    number_of_guests: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    comments: Comment[];
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: {
        id: number;
        username: string;
    };
}

export const getTables = () => api.get<Table[]>('/tables/');
export const getReservations = () => api.get<Reservation[]>('/reservations/');
export const createReservation = (data: {
    table_id: number;
    date: string;
    time: string;
    number_of_guests: number;
}) => api.post<Reservation>('/reservations/', data);
export const addComment = (reservationId: number, content: string) =>
    api.post<Comment>(`/reservations/${reservationId}/add_comment/`, { content });
export const cancelReservation = (reservationId: number) =>
    api.post(`/reservations/${reservationId}/cancel/`); 