import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { GoogleApiService } from './../google-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendars: any[];

  constructor(private googleApiService: GoogleApiService, private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.googleApiService.getCalendars().then((calendars) => {
      this.calendars = calendars;
      this.changeRef.detectChanges(); //why do I have to use it that often?
    });
  }

}
