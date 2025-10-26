import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { TripData } from './trip-data';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class Authentication {
  // Variable to handle Authentication Responses
  private authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripData: TripData
  ) {}

  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  public getCurrentUser(): User {
    if (!this.isLoggedIn()) {
      throw new Error('User is not logged in');
    }
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  public login(user: User, passwd: string): void {
    this.tripData.login(user, passwd).subscribe({
      next: (authResponse: AuthResponse) => {
        if (authResponse?.token) {
          this.authResp = authResponse;
          this.saveToken(authResponse.token);
        }
      },
      error: (error: any) => {
        console.error('Login error:', error);
      },
    });
  }

  public register(user: User, passwd: string): void {
    this.tripData.register(user, passwd).subscribe({
      next: (authResponse: AuthResponse) => {
        if (authResponse?.token) {
          this.authResp = authResponse;
          this.saveToken(authResponse.token);
        }
      },
      error: (error: any) => {
        console.error('Registration error:', error);
      },
    });
  }
}
