import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class AppModal {
  @Input() header: string = "";
  @Input() visible: boolean = false;
}
