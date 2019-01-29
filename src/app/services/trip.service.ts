import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  public trips = {};
  public selectedTrip = {};

  constructor(private http: HttpClient) { }

  public getTripsList(){
    
    return new Promise((resolve, reject) => {
    this.http.get('https://clickbus-teste.herokuapp.com/trips')
      .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
    
  }

  public getTripById(tripId:string){
    
    return new Promise((resolve, reject) => {
    this.http.get('https://clickbus-teste.herokuapp.com/trip/'+tripId)
      .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }
}
