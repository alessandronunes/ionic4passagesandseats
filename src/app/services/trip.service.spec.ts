import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TripService } from './trip.service';

describe('TripService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

        providers: [
          TripService
        ],

        imports: [ HttpModule, HttpClientModule, HttpClientTestingModule ]

    }).compileComponents();

  }));

  it('TripService should be created', inject([TripService], (tripService: TripService) => {
    expect(tripService).toBeTruthy();
  }));

});
