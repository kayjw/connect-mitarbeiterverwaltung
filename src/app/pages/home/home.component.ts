import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmployeesService } from '../../services/employees/employees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchTerm: string = '';

  constructor(private employeesService: EmployeesService) {
    setTimeout(() => {}, 1000);
  }

  ngOnInit() { this.refreshEmployees(null) }

  get employees(): Employee[] {

      return this.employeesService.employees.filter(employee => {
        let searchTerm = this.searchTerm.toLowerCase();
        let lastName = employee.lastName.toLowerCase();
        let firstName = employee.firstName.toLowerCase();
        let jobTitle = employee.jobTitle.toLowerCase();
        let phoneNumber = employee.phoneNumber;
        return lastName.includes(searchTerm) || firstName.includes(searchTerm) || jobTitle.includes(searchTerm) || phoneNumber.includes(searchTerm);
      });
  }

  public refreshEmployees($event): void {
    this.employeesService.refresh();
    // confirm refresh
    $event?.target.complete();
  }

  public deleteEmployee(employee: Employee): void {
    this.employeesService.delete(employee._key);
  }

}
