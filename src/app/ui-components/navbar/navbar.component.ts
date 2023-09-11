import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { EmployeeDTO } from 'src/app/dto/EmployeeDTO';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AppNavbar {
  filteredEmployees: EmployeeDTO[] = [];
  filteredSuggestions: { name: string }[] = [];
  menuItems: MenuItem[] = [];
  modalTitle: string = "";
  selectedEmployee: EmployeeDTO = { name: "", id: "" };
  selectedItem: { name: string, id: number } = { name: "", id: -1 };
  selectedOption: { name: string, id: number } = { name: "", id: -1 };
  showModal: boolean = false;
  suggestions: { name: string, id: number }[] = [{ name: "Knowledge Retention Management - Search for an Employee", id: 1 }, { name: "My Profile", id: 2 }];

  constructor(private authService: AuthService, private empService: EmployeeService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: "/home"
      }
    ];
  }

  goToHome() {
    this.router.navigate(["home"]);
  }

  goToProfile() {
    this.router.navigate(["profile"]);
  }

  onDialogClose() {
    this.selectedEmployee = { name: "", id: "-1" };
    this.showModal = false;
  }

  onEmployeeSelect(selectedItem: EmployeeDTO) {
    this.selectedEmployee = selectedItem;
    this.empService.employeeSub.next(this.selectedEmployee);
  }

  onItemSelect(selectedItem: any) {
    if (selectedItem.name.toLowerCase() === "my profile") {
      this.goToProfile();
    } else {
      this.showModal = true;
      this.selectedOption = { ...selectedItem };
      this.selectedItem = { name: "", id: -1 };
    }
  }

  onSubmit() {
    if (this.selectedEmployee.name === null || this.selectedEmployee.name === undefined || this.selectedEmployee.name === "") {
      this.toastService.showWarning("Warning", "Please select a worker");

    } else {
      this.router.navigate(["summary"]);
    }
  }

  search(event: any) {
    this.filteredSuggestions = this.suggestions.filter(s => s.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(["login"]);
  }
}
