// // import { ComponentFixture, TestBed } from '@angular/core/testing';
// // import { BrowserModule } from '@angular/platform-browser';
// // import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// // import { NgxsModule } from '@ngxs/store';
// // import { AppRoutingModule } from 'src/app/app-routing.module';
// // import { FlightsInfoService } from 'src/app/services/flights-info.service';
// // import { appState } from 'src/app/store/appState';
//
// // import { FlightTicketsForSpecialDatesComponent } from './flight-tickets-for-special-dates.component';
//
// // fdescribe('FlightTicketsForSpecialDatesComponent', () => {
// //   let component: FlightTicketsForSpecialDatesComponent;
// //   let fixture: ComponentFixture<FlightTicketsForSpecialDatesComponent>;
// //   let flightsInfoServiceMock: any;
//
// //   beforeEach(() => {
// //     flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});
//
// //     TestBed.configureTestingModule({
// //       imports: [
// //         BrowserModule,
// //         AppRoutingModule,
// //         NgxsModule.forRoot(appState, {
// //           developmentMode: true,
// //         }),
// //         NgxsLoggerPluginModule.forRoot(),
// //       ],
// //       declarations: [ FlightTicketsForSpecialDatesComponent ],
// //       providers: [
// //         { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
// //       ]
// //     })
// //     .compileComponents();
// //   });
//
// //   beforeEach(() => {
// //     fixture = TestBed.createComponent(FlightTicketsForSpecialDatesComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });
//
// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });
//
//
//
//
// import { HttpClientModule } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Observable } from 'rxjs';
// import { FlightsInfoService } from 'src/app/services/flights-info.service';
//
// import { FlightTicketsForSpecialDatesComponent } from './flight-tickets-for-special-dates.component';
//
// fdescribe('FlightTicketsForSpecialDatesComponent', () => {
//   let component: FlightTicketsForSpecialDatesComponent;
//   let fixture: ComponentFixture<FlightTicketsForSpecialDatesComponent>;
//   let flightInfoService: FlightsInfoService;
//   let spy: jasmine.Spy;
//   let mockData: any;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientModule],
//       declarations: [ FlightTicketsForSpecialDatesComponent ],
//       providers: [
//         FlightsInfoService
//       ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(FlightTicketsForSpecialDatesComponent);
//     component = fixture.componentInstance;
//     flightInfoService = fixture.debugElement.injector.get(FlightsInfoService);
//     mockData = {}
//     spy = spyOn(flightInfoService, 'getFlightTicketsForDate').and.returnValue(mockData.asObservable())
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
