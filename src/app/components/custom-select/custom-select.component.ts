import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, AfterViewInit{
  @Input() options: string[];
  @Input() defaultOption?: string;
  @Output() output = new EventEmitter<string>();

  @ViewChild('element') element: any;

  selected: string;
  isOpen: boolean = false;

  ngOnInit(): void{
    this.selectOption(this.defaultOption ? this.defaultOption : this.options[0])
    this.output.emit(this.selected);
  }
  ngAfterViewInit(): void {
    document.addEventListener('click', event => {
      if(!this.element.nativeElement.contains(event.target)){
        this.isOpen = false;
      }
    })
  }

  onSelect(){
    this.output.emit(this.selected);
  }
  selectOption(value: string){
    this.selected = value;
    this.output.emit(this.selected);
  }
  toggle(){
    this.isOpen = !this.isOpen;
  }
}