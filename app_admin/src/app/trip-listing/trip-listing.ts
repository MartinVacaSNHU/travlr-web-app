import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TripCardComponent } from "../trip-card/trip-card";
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent],
  templateUrl: './trip-listing.html'
})
export class TripListing implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authentication: Authentication
  ) {
    console.log('TripListing constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.loadTrips();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

  private loadTrips(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (trips: Trip[]) => {
          this.trips = trips;
          this.message = trips.length > 0
            ? `There are ${trips.length} trips available.`
            : 'There were no trips retrieved from the database.';
          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      });
  }
}