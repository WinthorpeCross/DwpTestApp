import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { HttpService } from './http.service';
import { IUserModel } from './i-user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'dwp-test-app';
  users: IUserModel[];
  loading = false;

  constructor(private geolocationService: GeolocationService, private httpService: HttpService) { }

  getUsersByLocation(searchCriterion: string): void {
    this.loading = true;

    this.httpService.getUsersByListedLocation(searchCriterion)      
    .subscribe(
      (data: IUserModel[]) => { 
        this.users = this.geolocationService.calculateDistanceOnly(data)
        this.loading = false;
       });
      // (error: ErrorReportViewModel) => {
      //   console.log('could not get the birds ddl');
      // });
  }

  getUsersWithinFiftyMiles(): void {
    this.loading = true;

    this.httpService.getAllUsers()      
    .subscribe(
      (data: IUserModel[]) => { 
        this.users = this.geolocationService.filterUsers(data);
        this.loading = false;
       });
      // (error: ErrorReportViewModel) => {
      //   console.log('could not get the birds ddl');
      // });
  }
}
