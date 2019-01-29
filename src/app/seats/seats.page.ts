import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from "@ionic/angular";
import { TripService } from '../services/trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.page.html',
  styleUrls: ['./seats.page.scss'],
})
export class SeatsPage implements OnInit {

  tripId: string;
  trip: any;
  seatsReady: any;
  seatsLayout: any = [];
  mobile: boolean = true;
  selectedCount: number = 0;
  colSize: number = 0;
  frontSize: number;
  seatsSize: number;
  backSize: number;

  constructor(private platform: Platform, private ref: ChangeDetectorRef, private tripService: TripService, private activatedRoute: ActivatedRoute, public navCtrl: NavController) {  }

  getLayout(seats) {
    let seatsCount = seats.length;
    let vLimit = 6;
    let hLimit = Math.ceil(seatsCount/4);
    let seatsLayout = [];

    if(this.mobile){

      // Mobile
      // y = column
      // x = line

      this.colSize = Math.floor(100/vLimit);
      this.frontSize = 12;
      this.seatsSize = 12;
      this.backSize = 12;

      for (let x = 0; x < vLimit; x++) {
        for (let y = 0; y < hLimit; y++) {

          if (!seatsLayout[y]) {
            seatsLayout[y] = [];
          }

          if (x == 2 || x == 3) {
            seatsLayout[y][x] = {
              class: 'corridor'
            };
          } else if (x == 4 || x == 5) {
            seatsLayout[y][x] = {
              x: x - 1,
              y: y + 1
            };
            seatsCount--;
          } else {
            seatsLayout[y][x] = {
              x: x + 1,
              y: y + 1
            }
            seatsCount--;
          }
        }
      }
    }else{
      // Desktop
      // x = column
      // y = line
      
      this.colSize = Math.floor(100/hLimit);
      this.frontSize = 2;
      this.seatsSize = 9;
      this.backSize = 1;

      for (let y = vLimit; y >=0; y--) {
        for (let x = 0; x < hLimit; x++) {

          if (!seatsLayout[y]) {
            seatsLayout[y] = [];
          }

          if (y == 2 || y == 3) {
            seatsLayout[y][x] = {
              class: 'corridor'
            };
          } else if (y == 4 || y == 5) {
            seatsLayout[y][x] = {
              x: x - 1,
              y: y + 1
            };
            seatsCount--;
          } else {
            seatsLayout[y][x] = {
              x: x + 1,
              y: y + 1
            }
            seatsCount--;
          }
        }
      }
    }
    
    return seatsLayout;
  }

  ngOnInit() {

    this.mobile = this.platform.is('mobile');

    this.tripId = this.activatedRoute.snapshot.paramMap.get('tripId');
    this.tripService.getTripById(this.tripId).then(trip => {

      this.trip = trip;
      let seatsLayout = this.getLayout(this.trip.map);
      this.trip.map.forEach(seat => {
        
        if (this.mobile) {
          seat.position.x--;
          if (seat.position.y == 3 || seat.position.y == 4) {
            seat.position.y++;
          }
        } else {
          //Desktop
          seat.position.x--;
          if (seat.position.y == 3 || seat.position.y == 4) {
            seat.position.y++;
          }
          
          // Inverter
          let temp = seat.position.x;
          seat.position.x = Math.abs(5 - seat.position.y);
          seat.position.y = temp;
        }

        if(!seatsLayout[seat.position.x][seat.position.y]){
            return;
        }

        seatsLayout[seat.position.x][seat.position.y].position = {};
        seatsLayout[seat.position.x][seat.position.y].position.x = seat.position.x;
        seatsLayout[seat.position.x][seat.position.y].position.y = seat.position.y;
        seatsLayout[seat.position.x][seat.position.y].label = seat.label;
        seatsLayout[seat.position.x][seat.position.y].available = seat.available;

        if (seat.available) {
          seatsLayout[seat.position.x][seat.position.y].class = 'seat fadeIn';
          seatsLayout[seat.position.x][seat.position.y].background = 'free';
        } else {
          seatsLayout[seat.position.x][seat.position.y].class = 'seat fadeIn';
          seatsLayout[seat.position.x][seat.position.y].background = 'busy';
        }
      });
      this.seatsReady = seatsLayout;
    });
  }

  selectSeat(seat, x, y) {

    if(!seat.available) return;

    if(this.seatsReady[x][y].selected){
      this.seatsReady[x][y].background = 'free';
      this.seatsReady[x][y].selected = false;
      this.selectedCount--;
    }else{
      this.seatsReady[x][y].background = 'selected';
      this.seatsReady[x][y].selected = true;
      this.selectedCount++;
    }

  }

  close() {
    this.navCtrl.navigateRoot('/home');
  }

}
