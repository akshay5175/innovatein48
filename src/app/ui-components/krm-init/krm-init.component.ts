import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
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

	dt: Date = new Date();
	lwd = new Date(this.dt.setMonth(this.dt.getMonth() + 2)).toLocaleDateString();

	employeeForKT: any = null;
	filteredEmployees: EmployeeDTO[] = [];
	isIndividualEmployee: boolean = true;
	selectedTopicsForKRM: KRMTopicDTO = {
		name: "",
		id: "",
		toEmployee: "",
		toEmployeeId: "",
		projects: [],
		features: [],
		technologies: []
	};
	chkBoxFormArray = new FormArray([]);
	searchFormArray = new FormArray([]);

	techologies: string[] = [];
	formGroup: FormGroup = new FormGroup({
		"controls": this.chkBoxFormArray
	});

	constructor(private router: Router, private toastService: ToastService, private employeeSvc: EmployeeService) { }

	ngOnInit() {
	}

	initKRM() {
		if (!this.isIndividualEmployee && !this.employeeForKT) {
			this.toastService.showWarning("Warning", "Please select a worker");
			return;
		}

		if (this.selectedEmployee !== null) {
			this.selectedTopicsForKRM.name = this.selectedEmployee.name;
			this.selectedTopicsForKRM.id = this.selectedEmployee.id;
		}
		if (!this.isIndividualEmployee) {
			if (this.selectedEmployee.githubDetails) {
				for (let repo of this.selectedEmployee.githubDetails) {
					this.selectedTopicsForKRM.projects.push(repo.name);
				}
			}

			if (this.selectedEmployee.jiraEpicDetails) {
				for (let epic of this.selectedEmployee.jiraEpicDetails) {
					this.selectedTopicsForKRM.features.push(epic.name);
				}
			}

			let technologies = this.getTechnologies();
			if (technologies) {
				for (let tech of technologies) {
					this.selectedTopicsForKRM.technologies.push(tech);
				}
			}
		}

		this.employeeSvc.initiateKRM(this.selectedTopicsForKRM);
		this.toastService.showSuccess("KRM has been initiated and employee has been notified!");
		this.closeDialog();
		this.router.navigate(["home"]);
		//this.employeeSvc.sendEmail();
	}

	closeDialog() {
		this.onDialogClose.emit();
	}

	getGithubDetails() {
		return this.selectedEmployee.githubDetails;
	}

	onEmployeeSelect(event: any) {
		console.log(event);
		this.employeeForKT = event;
		this.selectedTopicsForKRM.toEmployee = this.employeeForKT.name;
		this.selectedTopicsForKRM.toEmployeeId = this.employeeForKT.id;
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
				if (!technologies.includes(repo.language) && repo.language !== null) {
					if (repo.language) {
						let languages = Object.keys(repo.language);
						for (let language of languages) {
							if (technologies.indexOf(language) === -1) {
								technologies.push(language);
							}
						}
					}
				}
			}
		}

		return technologies;
	}
}
