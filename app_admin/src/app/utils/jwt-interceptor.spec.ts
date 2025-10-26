import { TestBed } from '@angular/core/testing';
import { JwtInterceptor } from './jwt-interceptor'
import { Authentication } from '../services/authentication';

describe('JwtInterceptor (class)', () => {
  const mockAuth: Partial<Authentication> = {
    isLoggedIn: () => false,
    getToken: () => 'fake-token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: Authentication, useValue: mockAuth }
      ]
    });
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
