import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';
import { IUserModel } from './i-user-model';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('filterUsers', () => {

    let service1: GeolocationService;

    beforeEach(() => {
      // TestBed.configureTestingModule({});
      service = TestBed.inject(GeolocationService);
    });

    it('should filter out users with a distance > 50', () => {
      // Arrange

      const maxDistance = 50;
      const users: IUserModel[] = [{
        id: 1, first_name: 'userNear', last_name: '', email: '', ip_address: '',
        latitude: 51.509865, longitude: -0.118092,
        normal_lat: 0, normal_lng: 0, distance: 0
      },
      {
        id: 2, first_name: 'userFar', last_name: '', email: '', ip_address: '',
        latitude: 40.7143528, longitude: -74.0059731,
        normal_lat: 0, normal_lng: 0, distance: 0
      }];

      // Act
      let expected = service.filterUsers(users);

      // Assert
      expect(expected.length).toBe(1);
      expect(expected[0].distance).toBeLessThan(maxDistance);
    });

    it('it should normalise latitude and longitude coordinates', () => {
      // Arrange

      const maxDistance = 50;
      const users: IUserModel[] = [{
        id: 1, first_name: 'userNear', last_name: '', email: '', ip_address: '',
        latitude: 51.509865, longitude: -0.118092,
        normal_lat: 0, normal_lng: 0, distance: 0
      }];

      // Act
      let expected = service.filterUsers(users);

      // Assert
      expect(expected.length).toBe(1);
      expect(expected[0].normal_lat).toBeCloseTo(expected[0].latitude);
      expect(expected[0].normal_lng).toBeCloseTo(expected[0].longitude);
    });
  });

});
