import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit{

  first: {
    value: number,
    currency: string,
  };
  second: {
    value: number,
    currency: string,
  };
  exchanger: any = [];
  private filter: string[] = [
    // 'USD', 'EUR', 'CAD', 'TRY', 'XDR'
  ];

  constructor(private API_service: APIService){
    API_service.getResponse().subscribe(item => {
      this.exchanger = item;
      this.exchanger = [
        {rate: 1, cc: 'UAH'},
        ...this.exchanger
      ]
      if(this.filter.length){
        this.exchanger = this.exchanger.filter((item: any) => this.filter.includes(item.cc))
      }
      console.log(this.exchanger);
    })
  }

  ngOnInit(): void {
    this.first = {value: 0, currency: ''}
    this.second = {value: 0, currency: ''}
  }

  setFirstValue(value: number){ this.first.value = value; this.calc();}
  setSecondValue(value: number){ this.second.value = value; this.calc('second');}
  
  setFirstCurrency(value: string){ this.first.currency = value; this.calc()};
  setSecondCurrency(value: string){ this.second.currency = value; this.calc()};

  calc(from: string = 'first'){
    if(!this.exchanger.length) return;
    
    const firstCurrencyRate = (this.exchanger.find((item: any) => item.cc === this.first.currency)).rate;
    const secondCurrencyRate = (this.exchanger.find((item: any) => item.cc === this.second.currency)).rate;

    if(from === 'first'){
      this.second.value = +((this.first.value / secondCurrencyRate) * firstCurrencyRate).toFixed(2);
    }else{
      this.first.value = +((this.second.value / firstCurrencyRate) * secondCurrencyRate).toFixed(2);
    }
  }
  swap(event: Event){
    const temp = this.first.value;
    this.first.value = this.second.value;
    this.second.value = temp;

    (event.currentTarget as Element).classList.toggle('swap')
    this.calc();
  }

  getCurrenciesCodeList(): string[]{
    return this.exchanger.map((currency: any) => currency.cc);
  }
}
