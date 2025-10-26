import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html'
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(private router: Router, private authentication: Authentication) {}

  public isLoggedIn() {
    return this.authentication.isLoggedIn();
  }

  editTrip(trip: Trip) {
    this.router.navigate(['edit-trip', trip.code]);
  }
}