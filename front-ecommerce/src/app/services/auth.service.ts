import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/token`, data);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

    getUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.email;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserEmail() === 'admin@admin.com';
  }

    isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && this.isTokenValid(token);
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
