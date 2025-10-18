import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html'
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(private router: Router) {}

  editTrip(trip: Trip) {
    this.router.navigate(['edit-trip', trip.code]);
  }
}