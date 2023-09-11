import { Component } from "@angular/core";
import { KRMTopicDTO } from "src/app/dto/KRMTopicDTO";
import { EmployeeService } from "src/app/service/employee.service";

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: []
})
export class AppStatusView {
  employees: KRMTopicDTO[] = [];
  details: any = {};

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.empService.employessWithKRM;
  }

  showDetails(item: any) {
    this.details = item;
  }
}
