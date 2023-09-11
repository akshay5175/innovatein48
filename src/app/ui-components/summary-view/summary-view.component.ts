import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDTO, GithubDetailsDTO, JiraEpicDetailsDTO } from 'src/app/dto/EmployeeDTO';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
	selector: 'app-summary-view',
	templateUrl: './summary-view.component.html',
	styleUrls: ['./summary-view.component.css']
})
export class AppSummaryView {
	dt: Date = new Date();
	lwd = new Date(this.dt.setMonth(this.dt.getMonth() + 2)).toLocaleDateString();
	@Input() selectedEmployee: EmployeeDTO = { name: "", id: "-1" };
	@Input() showDetailsDialog: boolean = false;
	@Output() onDialogClose: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild("op") overlayPanel!: ElementRef;

	jiraEpics: Map<string, string> = new Map<string, string>();
	jiraEpicsToDisplay: JiraEpicDetailsDTO[] = [];
	githubRepos: GithubDetailsDTO[] = [];
	jiraStories: any[] = [];
	jiraBugs: any[] = [];
	storiesToShow: any[] = [];
	showInitKRMDialog: boolean = false;
	loading: boolean = false;

	constructor(private router: Router, private toastService: ToastService, private empService: EmployeeService) { }

	ngOnInit() {
		this.empService.employeeSub.subscribe(employee => {
			this.selectedEmployee = employee;
		});

		if (this.selectedEmployee === null || this.selectedEmployee === undefined) {
			this.selectedEmployee = { name: "", id: "-1" };
			this.router.navigate(["home"]);
			return;
		}

		this.loading = true;

		this.empService.getEmployeeGithubDetails()
			.subscribe(repos => {
				for (let repo of repos) {
					this.githubRepos.push({ name: repo.name, language: repo.language, repoUrl: repo.html_url, lastUpdated: repo.updated_at });
					this.empService.getLanguages(repo.languages_url)
						.subscribe(data => {
							let foundRepo = this.githubRepos.find(g => g.name === repo.name);
							if (foundRepo) {
								foundRepo.language = data;
							}
						});
				}
				this.selectedEmployee.githubDetails = this.githubRepos;

				// get JIRA details
				this.empService.getEmployeeJiraDetails().subscribe(issues => {
					for (let issue of issues) {
						if (issue.fields) {
							let fields = issue.fields;

							if (fields.parent) {
								let epicId = fields.parent.key,
									description = '';

								if (fields.parent.fields) {
									if (fields.parent.fields.issuetype) {
										description = fields.parent.fields.summary;
									}
								}
								if (!this.jiraEpics.has(epicId)) {
									this.jiraEpics.set(epicId, description);
									this.jiraEpicsToDisplay.push({
										id: epicId,
										name: description,
										stories: [],
										bugs: []
									});
								}
								if (fields.issuetype.name === "Story") {
									this.jiraEpicsToDisplay[this.jiraEpicsToDisplay.length - 1].stories.push({ key: issue.key, description: fields.summary });
								} else if (fields.issuetype.name === "Bug") {
									this.jiraEpicsToDisplay[this.jiraEpicsToDisplay.length - 1].bugs.push({ key: issue.key, description: fields.summary });
								}
							}
						}
					}

					this.selectedEmployee.jiraEpicDetails = this.jiraEpicsToDisplay;
					this.loading = false;
				}, _ => {
					this.loading = false;
					this.toastService.showError("Server error occurred");
				});
			}, _ => {
				this.loading = false;
				this.toastService.showError("Server error occurred");
			});
	}

	closeDialog() {
		this.showInitKRMDialog = false;
	}

	getFormattedDate(date: any) {
		return new Date(date).toLocaleDateString();
	}

	getLanguages(item: GithubDetailsDTO) {
		if (!item.language) {
			return [];
		}
		return Object.keys(item.language).join(", ");
	}

	initiateKRM() {
		// show popup here
		this.showInitKRMDialog = true;
	}

	onCancel() {
		this.router.navigate(["home"]);
	}

	showStoryDetails(stories: any[]) {
		this.storiesToShow = stories;
	}
}
