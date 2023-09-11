import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EmployeeDTO } from "../dto/EmployeeDTO";
import { BehaviorSubject, Observable, map } from "rxjs";
import { KRMTopicDTO } from "../dto/KRMTopicDTO";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeSub: BehaviorSubject<any> = new BehaviorSubject(null);
  employessWithKRM: KRMTopicDTO[] = [];
  employees: EmployeeDTO[] = [];
  jiraUrl = environment.jiraUrl;

  constructor(private httpClient: HttpClient) { }

  createEmployeeCollection() {
    this.httpClient.post("https://innovatein48-fis-default-rtdb.firebaseio.com/employees.json", this.employees).subscribe();
  }

  getEmployees(): Observable<EmployeeDTO[]> {
    return this.httpClient.get<EmployeeDTO[]>("https://innovatein48-fis-default-rtdb.firebaseio.com/employees.json");
  }

  getEmployeeById(id: string): Observable<EmployeeDTO[]> {
    return this.getEmployees().pipe(map((data: any) => {
      let filteredData: EmployeeDTO[] = [];
      for (let key in data) {
        filteredData.push(...data[key].filter((d: any) => d.id.toLowerCase().indexOf(id.toLowerCase()) >= 0));
      }
      return filteredData;
    }));
  }

  getEmployeeByName(name: string): Observable<EmployeeDTO[]> {
    return this.getEmployees().pipe(map((data: any) => {
      let filteredData: EmployeeDTO[] = [];
      for (let key in data) {
        let filteredRec: EmployeeDTO[] = data[key].filter((d: any) => d.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
        if (filteredRec.length > 0) {
          filteredData.push(...filteredRec);
        }
      }
      return filteredData;
    }));
  }

  getEmployeeJiraDetails(employeeName: string = "Shwetha"): Observable<any> {
    let headers = new HttpHeaders({
      "Authorization": "Basic c2h3ZXRoYXIuYWRpZ2FAZ21haWwuY29tOkFUQVRUM3hGZkdGMGRVdHVMVmtqaXJzNG0zejlRSEExOE1BcUxiTDdWMVJMazVmYjVPZVJJSHBFMU15R3hpcHNlS0NSZ0VQQ1Bsdlg1ZWNuVXU3eVpqWVp2T21IV2FFNGY5WDNzOVd4dHZYREpMLXBqZ1VzQU1sR3RZVnZiQXZfQ0pSTExENFRFcEN3NGZKYnRESjdtS2IyN3Zia2hlYjF2LTFvTHFpeDlld0dmbFBHNFlyd1VxWT01QjE4QkI4QQ=="
    });

      /*return this.httpClient.get((environment.production ? (environment.jiraUrl + "search?jql=assignee=") : "/search?jql=assignee=") + employeeName, { headers: headers })*/
    return this.httpClient.get("/search?jql=assignee=" + employeeName + "&timestamp=" + new Date().getTime(), { headers: headers })
    .pipe(map((data: any) => {
      return data.issues;
    }));
  }

  getEmployeeGithubDetails(): Observable<any> {
    return this.httpClient.get("https://api.github.com/users/adiga-s23/repos?type=collabrator");
  }

  getLanguages(url: string): Observable<string[]> {
    return this.httpClient.get<string[]>(url);
  }

  initiateKRM(selectedTopics: any) {
    this.employessWithKRM.push(selectedTopics);
  }
}
