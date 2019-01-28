import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  trips: any = {};
  mobile: boolean;

  constructor(private platform: Platform, private tripService: TripService) { 
    this.mobile = this.platform.is('mobile');
  }

  ngOnInit(){
    this.tripService.getTripsList().then(trips => {
      this.trips = trips;
    });
  }
}
