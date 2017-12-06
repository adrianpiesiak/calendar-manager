import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleApiService } from './google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isSignedIn: boolean;
  userName: string;

  constructor(
    private googleApiService: GoogleApiService,
    private changeRef: ChangeDetectorRef,
    private router: Router
  ) {
    googleApiService.init().then(
      (status) => {
        status.listen((updatedStatus) => {
          console.log('update detected');
          this.isSignedIn = updatedStatus;
          this.userName = this.googleApiService.getUserName();

          if (updatedStatus) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
          // this.changeRef.detectChanges();
        });
        this.isSignedIn = status.get();
        this.userName = this.googleApiService.getUserName();
      }
    );
  }

  signIn(): void {
    this.googleApiService.signIn();
  }

  signOut(): void {
    this.googleApiService.signOut();

    this.isSignedIn = false; // will this be needed?
  }
}
