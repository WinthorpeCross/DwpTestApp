import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUserModel } from './i-user-model';



describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  afterEach(() => {

    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: HttpService = TestBed.inject(HttpService);
    expect(service).toBeTruthy();
  });




  describe('#getAllUsers', () => {
    let expectedResponse: IUserModel[];
    let user: IUserModel;

    beforeEach(() => {
      service = TestBed.inject(HttpService);
      user = {
        id: 0,
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        ip_address: 'string',
        latitude: 0,
        longitude: 0,
        normal_lat: 0,
        normal_lng: 0,
        distance: 0
      }
      expectedResponse = [user]

    });

    it('should return expected array of users (called once)', () => {

      service.getAllUsers().subscribe(
        users => expect(users).toEqual(expectedResponse, 'should return expected users'),
        fail
      );

      const req = httpTestingController.expectOne(`https://cors-anywhere.herokuapp.com/https://bpdts-test-app.herokuapp.com/users`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock 
      req.flush(expectedResponse);
    });
  });


  describe('#getUsersByListedLocation', () => {
    let expectedResponse: IUserModel[];
    let user: IUserModel;

    beforeEach(() => {
      service = TestBed.inject(HttpService);
      user = {
        id: 0,
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        ip_address: 'string',
        latitude: 0,
        longitude: 0,
        normal_lat: 0,
        normal_lng: 0,
        distance: 0
      };

      expectedResponse = [user]

    });

    it('should return expected array of users (called once)', () => {

      service.getUsersByListedLocation('London').subscribe(
        users => expect(users).toEqual(expectedResponse, 'should return expected users'),
        fail
      );

      const req = httpTestingController.expectOne(`https://cors-anywhere.herokuapp.com/https://bpdts-test-app.herokuapp.com/city/London/users`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedResponse);
    });
  });
});
