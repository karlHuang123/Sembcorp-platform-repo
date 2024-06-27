import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMarksData(): Observable<any> {
    return this.http.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast').pipe(
      map((response) => response),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  getEnergyData(params: any): Observable<any> {
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=1.2897&longitude=103.8501&hourly=direct_radiation&timezone=Asia%2FSingapore&start_date=${params.startDate}&end_date=${params.endDate}`).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}