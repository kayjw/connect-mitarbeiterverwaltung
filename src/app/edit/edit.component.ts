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
  ) { }

  ngOnInit() {
    if (this.employeesService.personalProfile) {
      this.model = this.employeesService.personalProfile;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  public save(): void {
    if (this.model.firstName !== '' && this.model.lastName !== '' && this.model.jobTitle !== '' && this.model.phoneNumber !== '') {
      this.employeesService.update(this.model);
      this.dismiss();
    } else {
      document.getElementById('error').style.display = ' ';
      document.getElementById('error').innerHTML = '';
      if (this.model.firstName === '') {
        document.getElementById('error').innerHTML += 'Fehler in Vorname <br>';
      }
      if (this.model.lastName === '') {
        document.getElementById('error').innerHTML += 'Fehler in Nachname <br>';
      }
      if (this.model.jobTitle === '') {
        document.getElementById('error').innerHTML += 'Fehler in Job Titel <br>';
      }
      if (this.model.phoneNumber === '') {
        document.getElementById('error').innerHTML += 'Fehler in Telefonnummer <br>';
      }
    }
  }

  public delete(): void {
    // eslint-disable-next-line no-underscore-dangle
    this.employeesService.delete(this.model._key);
    this.dismiss();
  }
}
