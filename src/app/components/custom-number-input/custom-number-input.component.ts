import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'custom-number-input',
  templateUrl: './custom-number-input.component.html',
  styleUrls: ['./custom-number-input.component.scss']
})
export class CustomNumberInputComponent implements OnInit{
  @Input('ngModel') value: number = 0;
  @Output() output = new EventEmitter<number>();

  ngOnInit(): void { }

  onChange(){
    this.output.emit(+this.value);
  }
}
