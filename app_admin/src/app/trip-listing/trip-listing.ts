import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TripCardComponent } from "../trip-card/trip-card";
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent],
  templateUrl: './trip-listing.html'
})

export class TripListing implements OnInit {

  trips!: Trip[];
  message: string = '';

  constructor(private tripData: TripData,
    private router: Router
  ) {
    console.log('trip-listing consructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if(value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retireved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ') + error;
        }
      })
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}