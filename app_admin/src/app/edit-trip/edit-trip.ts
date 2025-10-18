import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripData,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form and load trip data
    this.editForm = this.formBuilder.group({
      _id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Get tripCode from route params and load trip data
    const tripCode = this.route.snapshot.params['tripCode'];
    this.tripDataService.getTrip(tripCode).subscribe(trip => {
      this.editForm.patchValue(trip);
      this.message = 'Trip: ' + tripCode + ' retrieved';
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        },
      });
    }
  }
  // get the form short name to access the form fields
  get f() {
    return this.editForm.controls;
  }
}