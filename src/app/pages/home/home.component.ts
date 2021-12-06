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

    return this.employeesService.employees.filter(
      value =>
        value.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        value.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        value.jobTitle.toString().startsWith(this.searchTerm.toLowerCase()) ||
        value.phoneNumber.toString().startsWith(this.searchTerm.toLowerCase())
    );
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
