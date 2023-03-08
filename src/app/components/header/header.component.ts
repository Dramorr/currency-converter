import { Component } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string = 'header-component';
  display: string[] = ['USD', 'EUR'];
  exchanger: any = [];

  constructor(private API_service: APIService){
    API_service.getResponse().subscribe(item => this.exchanger = item );
  }

  getCurrency(code: string){
    return this.exchanger.find((item: any) => item.cc === code);
  }
}
