import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { GeolocationService } from './geolocation.service';
import { HttpService } from './http.service';
import { IUserModel } from './i-user-model';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let mockHttpService;
  let mockGeolocationService;

  let expectedResponseGeo: IUserModel[];
  let expectedResponseServer: IUserModel[];

  beforeEach(async(() => {
    mockHttpService = jasmine.createSpyObj(['getUsersByListedLocation', 'getAllUsers']);
    mockGeolocationService = jasmine.createSpyObj(['calculateDistanceOnly', 'filterUsers']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: GeolocationService, useValue: mockGeolocationService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'dwp-test-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dwp-test-app');
  });


  describe('getUsersByLocation', () => {


    it('should get users', () => {
      // Arrange
      const searchCriterion = '';

      expectedResponseServer = [{
        id: 1, first_name: 'userNear', last_name: '', email: '', ip_address: '',
        latitude: 51.509865, longitude: -0.118092,
        normal_lat: 0, normal_lng: 0, distance: 0
      },
      {
        id: 2, first_name: 'userFar', last_name: '', email: '', ip_address: '',
        latitude: 40.7143528, longitude: -74.0059731,
        normal_lat: 0, normal_lng: 0, distance: 0
      }];

      expectedResponseGeo = [{
        id: 1, first_name: 'userNear', last_name: '', email: '', ip_address: '',
        latitude: 51.509865, longitude: -0.118092,
        normal_lat: 51.509865, normal_lng: -0.118092, distance: 2
      },
      {
        id: 2, first_name: 'userFar', last_name: '', email: '', ip_address: '',
        latitude: 40.7143528, longitude: -74.0059731,
        normal_lat: 40.7143528, normal_lng: -74.0059731, distance: 1
      }];

      mockHttpService.getUsersByListedLocation.and.returnValue(of(expectedResponseServer));

      mockGeolocationService.calculateDistanceOnly.and.returnValue(of(expectedResponseGeo));

      //Act
      component.getUsersByLocation('searchCriterion');

      //Assert
      // expect(component.users.length).toBe(2); 
      // mockGeolocationService.filterUsers returns undefined - 
      //need a concrete rather than spy/mock as jasmine can't create an accurate mock version (as would be expected)
      // mockGeolocationService is tested separately in any case
      expect(mockHttpService.getUsersByListedLocation).toHaveBeenCalled();
      expect(mockGeolocationService.calculateDistanceOnly).toHaveBeenCalled();
      expect(mockGeolocationService.calculateDistanceOnly).toHaveBeenCalledWith(expectedResponseServer);
    });
  });


  describe('getUsersWithinFiftyMiles', () => {


    it('should get users', () => {
      // Arrange
      const searchCriterion = '';

      expectedResponseServer = [{
        id: 1, first_name: 'userNear', last_name: '', email: '', ip_address: '',
        latitude: 51.509865, longitude: -0.118092,
        normal_lat: 0, normal_lng: 0, distance: 0
      },
      {
        id: 2, first_name: 'userFar', last_name: '', email: '', ip_address: '',
        latitude: 40.7143528, longitude: -74.0059731,
        normal_lat: 0, normal_lng: 0, distance: 0
      }];

      expectedResponseGeo = [{
        id: 1, first_name: 'userNear', last_name: '', email: '', ip_address: '',
        latitude: 51.509865, longitude: -0.118092,
        normal_lat: 51.509865, normal_lng: -0.118092, distance: 2
      },
      {
        id: 2, first_name: 'userFar', last_name: '', email: '', ip_address: '',
        latitude: 40.7143528, longitude: -74.0059731,
        normal_lat: 40.7143528, normal_lng: -74.0059731, distance: 1
      }];

      mockHttpService.getAllUsers.and.returnValue(of(expectedResponseServer));

      mockGeolocationService.filterUsers.and.returnValue(of(expectedResponseGeo));

      //Act
      component.getUsersWithinFiftyMiles();

      //Assert
      // expect(component.users.length).toBe(2); 
      // mockGeolocationService.filterUsers returns undefined - 
      //need a concrete rather than spy/mock as jasmine can't create an accurate mock version
      // mockGeolocationService is tested separately in any case
      expect(mockHttpService.getAllUsers).toHaveBeenCalled();
      expect(mockGeolocationService.filterUsers).toHaveBeenCalled();
      expect(mockGeolocationService.filterUsers).toHaveBeenCalledWith(expectedResponseServer);
    });
  });
});
