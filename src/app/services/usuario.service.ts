import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;
}

@Injectable({
    providedIn: 'root',
})

export class UsuarioService {
    private apiUrl = 'http://localhost:8080/api/usuarios';

    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    getUsuario(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    createUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    deleteUsuario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}