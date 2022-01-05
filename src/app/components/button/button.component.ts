import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() color: string;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit()
  }
}
