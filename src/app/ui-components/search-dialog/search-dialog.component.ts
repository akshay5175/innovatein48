import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeDTO } from 'src/app/dto/EmployeeDTO';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class AppSerachDialog {
  @Input() header: string = "";
  @Input() visible: boolean = false;
  @Input() selected: EmployeeDTO = { name: "", id: "" };
  @Output() dialogClose: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  filteredEmployees: EmployeeDTO[] = [];
  filteredSuggestions: { name: string }[] = [];

  constructor(private employeeSvc: EmployeeService) { }

  onDialogClose() {
    this.dialogClose.emit();
  }

  onSubmit() {
    this.submit.emit();
  }

  onEmployeeSelect() {
    this.select.emit(this.selected);
  }

  searchEmployee(event: any) {
    this.employeeSvc.getEmployeeByName(event.query)
      .subscribe(data => {
        this.filteredEmployees = data;
      });
  }
}
