import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { SeatsPage } from './seats.page';
import { NavController } from '@ionic/angular';

export class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: function(){
        return '2b8e24fe-4a65-33a3-81dc-42cbeb0fbf20';
      }
    }
  };
}

describe('SeatsPage', () => {
  let component: SeatsPage;
  let fixture: ComponentFixture<SeatsPage>;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      providers: [
        TripService,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [SeatsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SeatsPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should increment selected seats', () => {
    component.seatsReady = [[{ selected: false }]];
    component.selectSeat({ available: true }, 0, 0);
    expect(component.selectedCount).toBe(1);
  });

  it('should create desktop seats layout', () => {
    component.seatsLayout = [[{ selected: false }]];
    let seatsLayout = component.getLayout([{ }]);
    expect(seatsLayout.length).toBe(7);
  });

  it('should create mobile seats layout', () => {
    component.seatsLayout = [[{ selected: false }]];
    component.mobile = true;
    let seatsLayout = component.getLayout([{ }]);
    expect(seatsLayout.length).toBe(1);
  });

  it('should close and navigate to HomePage', () => {
    spyOn(component.navCtrl, 'navigateRoot');
    component.close();
    expect(component.navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
  });

});
