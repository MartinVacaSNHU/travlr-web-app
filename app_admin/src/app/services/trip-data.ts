import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000/api/trips';  // Fixed typo in http

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(trip: Trip): Observable<Trip> {  // Changed any to Trip type
    return this.http.post<Trip>(this.url, trip);  // Use trip object directly, not FormData
  }
  getTrip(tripCode: string) : Observable<Trip> {
    // console.log('Inside TripDataService.getTrip: ' + tripCode);
    return this.http.get<Trip>(`${this.url}/${tripCode}`);
  }

  updateTrip(formData : Trip): Observable<Trip> {
    // console.log('Inside TripDataService :: addTrips');
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData);
  }
}
