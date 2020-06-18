import { Injectable } from '@angular/core';
import { LatLon, createLocation, normalizeLatitude, normalizeLongitude, isLatLon, distanceTo } from 'geolocation-utils';
import { IUserModel } from './i-user-model';

const maximumMetres: number = 80467.2 //

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  // This service uses the open source third party npm package called geolocation-utils
  // https://www.npmjs.com/package/geolocation-utils
  // A utility library for calculations with geolocations.

  constructor() { }

  calculateDistanceOnly(users: IUserModel[]): IUserModel[] {

    users.forEach((element, index) => {
      let normalisedCordinates = this.normaliseCoordinates(element)
      let metresFromLondon = this.calculateDistance(normalisedCordinates);

      element.distance = this.calculateDistanceinMiles(metresFromLondon);
      element.normal_lat = normalisedCordinates.lat;
      element.normal_lng = normalisedCordinates.lon;
    });

    return users;
  }

  filterUsers(users: IUserModel[]): IUserModel[] {
    const filteredUsers: IUserModel[] = [];

    users.forEach((element, index) => {
      let normalisedCordinates = this.normaliseCoordinates(element)

      let metresFromLondon = this.calculateDistance(normalisedCordinates);

      if (metresFromLondon < maximumMetres) {
        element.distance = this.calculateDistanceinMiles(metresFromLondon);
        element.normal_lat = normalisedCordinates.lat;
        element.normal_lng = normalisedCordinates.lon;
        filteredUsers.push(element);
      }
    });

    return filteredUsers;
  }

  private normaliseCoordinates(user: IUserModel): LatLon {
    return createLocation(normalizeLatitude(user.latitude), normalizeLongitude(user.longitude), 'LatLon');
  }

  private calculateDistance(coordinates: LatLon): number {
    if (isLatLon(coordinates) === true) {
      // a fixed central London coordinate is used: { lat: 51.509865, lon: -0.118092 }
      // I can explain this further if/when required
      return distanceTo({ lat: coordinates.lat, lon: coordinates.lon }, { lat: 51.509865, lon: -0.118092 });
    } else {
      console.log('an unexpected error occurred in calculateDistance');
      return 0;
    }
  }

  private calculateDistanceinMiles(metres: number) {
    return metres / 1609.344;
  }
}
