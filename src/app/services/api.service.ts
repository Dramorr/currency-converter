import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private server: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';

  constructor(private http: HttpClient) { }

  getResponse(){
    return this.http.get(this.server);
  }
}
