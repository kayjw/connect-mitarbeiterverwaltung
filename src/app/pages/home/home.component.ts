import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmployeesService } from '../../services/employees/employees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchTerm = '';

  constructor(private employeesService: EmployeesService) {
    setTimeout(() => { }, 1000);
  }

  ngOnInit() { this.refreshEmployees(null); }

  get employees(): Employee[] {
    return this.employeesService.employees.filter(employee => {
      const searchTerm = this.searchTerm.toLowerCase();
      const lastName = employee.lastName.toLowerCase();
      const firstName = employee.firstName.toLowerCase();
      const jobTitle = employee.jobTitle.toLowerCase();
      const phoneNumber = employee.phoneNumber;
      // eslint-disable-next-line max-len
      return lastName.includes(searchTerm) || firstName.includes(searchTerm) || jobTitle.includes(searchTerm) || phoneNumber.includes(searchTerm);
    });
  }

  public refreshEmployees($event): void {
    this.employeesService.refresh();
    $event?.target.complete();
  }

  public deleteEmployee(employee: Employee): void {
    // eslint-disable-next-line no-underscore-dangle
    this.employeesService.delete(employee._key);
  }

}
