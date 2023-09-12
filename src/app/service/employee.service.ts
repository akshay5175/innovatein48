import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EmployeeDTO } from "../dto/EmployeeDTO";
import { BehaviorSubject, Observable, map } from "rxjs";
import { KRMTopicDTO } from "../dto/KRMTopicDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeSub: BehaviorSubject<any> = new BehaviorSubject(null);
  employessWithKRM: KRMTopicDTO[] = [];
  employees: EmployeeDTO[] = [];
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
      "Authorization": "Basic YWtzaGF5LnBhcmFuamFwZUBvdXRsb29rLmNvbTpBVEFUVDN4RmZHRjBEamUtZ01Lei1PZWVjYXA4dXIxTGlQQWxGakF4ZEVoSVo2X0NoMFVFdlJXLURPR1pXU0VJa0tEenZTOGotNnR6d3VfRzZHTHV2b1I4MzFhXzk0dC12NEdhQTRDSmREaGF6aWlDNVB0Q2hQWjQtSzd6dEZ0ZTcwYm9OaGZpYzU4MzJOVmJtY2dXUnhiVzRFWUNmeWg1Q0JkSHViTlM2QkJJck1zeS1tNkNSNW89MzMxODQ1Rjc="
    });

    // return this.httpClient.get("/search?jql=assignee=" + employeeName + "&timestamp=" + new Date().getTime(), { headers: headers })
    // .pipe(map((data: any) => {
    //   return data.issues;
    // }));

    return this.httpClient.get("../../assets/jira-response.json")
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

  sendEmail() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.httpClient.post('https://formspree.io/f/xwkdqkee',
        { From: "KRM Admin", To: "akshay.paranjape@outlook.com", Message: "KT has been initialized on your behalf" },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
  }
}
