import { Injectable } from "@angular/core";
import { environment } from './../../../../../environment';
import { ApiService } from "../../../core/services/api.service";
import { Observable, tap } from "rxjs";

interface AuthResponse { 
    token: string;
    user: { id:number; name: string; email: string }
}

const API = environment.apiUrl;

const loginUrl = `${API}/auth/login`;
const registerUrl = `${API}/auth/register`;

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private api: ApiService) {}

    login(email: string, password: string): Observable<AuthResponse> {
        return this.api.post<AuthResponse>(loginUrl, {email, password})
        .pipe(
            tap(res => localStorage.setItem('token', res.token))
        );
    }

    register(name: string, email: string, password: string): Observable<AuthResponse> {
        return this.api.post<AuthResponse>(registerUrl, { name, email, password })
        .pipe(
            tap(res => localStorage.setItem('token', res.token))
        );
    }

    logout() {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token')
    }
}