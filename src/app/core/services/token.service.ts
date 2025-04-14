import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly ROLE_KEY = 'userRole';
  private readonly ID_KEY = 'userId';
  private readonly NAME_KEY = 'userName';
  private readonly EMAIL_KEY = 'userEmail';
  private readonly PHONE_KEY = 'userPhone';



  // Save user session
  setUserSession(user: any): void {
    const token = `token-${user.id}`;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, user.role);
    localStorage.setItem(this.ID_KEY, user.id);
    localStorage.setItem(this.NAME_KEY, user.name);
    localStorage.setItem(this.EMAIL_KEY, user.email);
    localStorage.setItem(this.PHONE_KEY, user.phone);


  }

  // Clear all session info
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.ID_KEY);
    localStorage.removeItem(this.NAME_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
  getUserInfo(): { name: string | null, email: string | null, phone: string | null } {
    return {
      name: localStorage.getItem(this.NAME_KEY),
      email: localStorage.getItem(this.EMAIL_KEY),
      phone: localStorage.getItem(this.PHONE_KEY)
    };
  }
  
}
