import { Component } from '@angular/core';
import { EmployeeDTO } from '../dto/EmployeeDTO';
import { ToastService } from '../service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AppHome {
  selectedEmployee: EmployeeDTO = { name: "", id: "" };
  showModal: boolean = false;
  showDetailsModal: boolean = false;

  constructor(private router: Router, private toastService: ToastService, private empService: EmployeeService) { }

  ngOnInit() {
  }

  closeDetailsDialog(closeAll: boolean) {
    this.showDetailsModal = false;
    if (closeAll) {
      this.onDialogClose();
    }
  }

  initiateKRM() {
    this.showModal = true;
  }

  viewStatus() {
    this.router.navigate(["status"]);
  }

  onDialogClose() {
    this.selectedEmployee = { name: "", id: "-1" };
    this.showModal = false;
  }

  onEmployeeSelect(selectedItem: EmployeeDTO) {
    this.selectedEmployee = selectedItem;
    this.empService.employeeSub.next(this.selectedEmployee);
  }

  onSubmit() {
    if (this.selectedEmployee.name === null || this.selectedEmployee.name === undefined || this.selectedEmployee.name === "") {
      this.toastService.showWarning("Warning", "Please select a worker");

    } else {
      this.router.navigate(["summary"]);
    }
  }
}
