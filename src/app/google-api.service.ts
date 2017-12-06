import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

declare var gapi: any;

@Injectable()
export class GoogleApiService {
  private authInstance: any;

  // TODO: this is an overkill
  constructor() { }

  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      gapi.load('client:auth2', () => {
        this.initClient().then((status) => resolve(status));
      });
    });
  }

  initClient(): Promise<any> {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.readonly',
      'profile',
      'openid',
      'email'
    ];

    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    return gapi.client.init({
      'apiKey': '',
      'clientId': '722862170053-1hgmad8kpa7m2mvdmnctne4876fmbg0k.apps.googleusercontent.com',
      'scope': scopes.join(' '),
      'discoveryDocs': DISCOVERY_DOCS
    }).then(() => {
      this.authInstance = gapi.auth2.getAuthInstance();
      // this.authInstance.isSignedIn.listen((status) => this.updateSignInStatus(status));
      return this.authInstance.isSignedIn;
    })
      .catch(error => console.log(error));
  }

  signIn(): void {
    this.authInstance.signIn();
  }

  signOut(): void {
    console.log('sign out');
    console.log(this.authInstance.signOut());
  }

  updateSignInStatus(status: boolean): void {
    console.log('status changed to: ' + status);
  }

  getSignInStatus(): boolean {
    if (this.authInstance) {
      return this.authInstance.isSignedIn.get();
    }
    return false;
  }

  getUserName(): string {
    if (!this.getSignInStatus()) {
      return '';
    }
    // this is little bit lame
    return this.authInstance.currentUser.get().getBasicProfile().getName();
  }

  getCalendars(): Promise<any[]> {
    //should check if authorize or sth
    return gapi.client.calendar.calendarList.list().then((res) => {
      return res.result.items;
    });
  }

}
