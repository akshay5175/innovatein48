import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeDTO, GithubDetailsDTO, JiraEpicDetailsDTO } from "src/app/dto/EmployeeDTO";
import { KRMTopicDTO } from "src/app/dto/KRMTopicDTO";
import { EmployeeService } from "src/app/service/employee.service";
import { ToastService } from "src/app/service/toast.service";

@Component({
  selector: 'app-krm-init',
  templateUrl: './krm-init.component.html',
  styleUrls: ['./krm-init.component.css']
})
export class AppKRMInit implements OnInit {
  @Input() selectedEmployee: any;
  @Output() onDialogClose: EventEmitter<any> = new EventEmitter<any>();

  filteredEmployees: EmployeeDTO[] = [];
  isIndividualEmployee: boolean = true;
  selectedTopicsForKRM: KRMTopicDTO = {
    name: "",
    id: "",
    projects: [],
    features: [],
    technologies: []
  };
  techologies: string[] = [];

  constructor(private router: Router, private toastService: ToastService, private employeeSvc: EmployeeService) { }

  ngOnInit() {
  }

  initKRM() {
    if (this.selectedEmployee !== null) {
      this.selectedTopicsForKRM.name = this.selectedEmployee.name;
      this.selectedTopicsForKRM.id = this.selectedEmployee.id;
    }
    this.employeeSvc.initiateKRM(this.selectedTopicsForKRM);
    this.toastService.showSuccess("KRM has been initiated and employee has been notified!");
    this.closeDialog();
    this.router.navigate(["home"]);
  }

  closeDialog() {
    this.onDialogClose.emit();
  }

  onEmployeeSelect() {

  }

  searchEmployee(event: any) {
    this.employeeSvc.getEmployeeByName(event.query)
      .subscribe(data => {
        this.filteredEmployees = data;
      });
  }

  selectProject(event: any, selectedRepo: GithubDetailsDTO) {
    if (event.checked) {
      let projectName = selectedRepo.name,
        index = this.selectedTopicsForKRM?.projects.indexOf(projectName);

      if (index === -1 || index === undefined) {
        this.selectedTopicsForKRM?.projects.push(projectName);
      } else {
        this.selectedTopicsForKRM?.projects.splice(index ? index : -1, 1);
      }
    }
  }

  selectJiraEpic(event: any, selectedEpic: JiraEpicDetailsDTO) {
    if (event.checked) {
      let featureName = selectedEpic.name,
        index = this.selectedTopicsForKRM?.features.indexOf(featureName);

      if (index === -1 || index === undefined) {
        this.selectedTopicsForKRM?.features.push(featureName);
      } else {
        this.selectedTopicsForKRM?.features.splice(index ? index : -1, 1);
      }
    }
  }

  selectTechnology(event: any, name: string) {
    if (event.checked) {
      let index = this.selectedTopicsForKRM?.technologies.indexOf(name);

      if (index === -1 || index === undefined) {
        this.selectedTopicsForKRM?.technologies.push(name);
      } else {
        this.selectedTopicsForKRM?.technologies.splice(index ? index : -1, 1);
      }
    }
  }

  getTechnologies() {
    let technologies: string[] = [];
    if (this.selectedEmployee?.githubDetails) {
      for (let repo of this.selectedEmployee?.githubDetails) {
        if (!technologies.includes(repo.technology) && repo.technology !== null) {
          technologies.push(repo.technology);
        }
      }
    }

    return technologies;
  }
}
