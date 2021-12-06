import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../services/employees/employees.service';
import { Employee } from '../models/Employee';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public key: string | null;
  public employee: Employee | null;

  public model: Employee = {
    _key: null,
    firstName: '',
    lastName: '',
    jobTitle: '',
    phoneNumber: '',
    profile: null,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    if (this.employeesService._personalProfile) {
      this.model = this.employeesService._personalProfile;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public save(): void {
    console.log("save")
    console.log(this.model)
    if (this.model) {
      this.employeesService.update(this.model);
    } else {
      this.employeesService.create(this.model);
    }

    this.dismiss();
  }

  public delete(): void {
    this.employeesService.delete(this.model._key);
    this.dismiss();
  }
}
