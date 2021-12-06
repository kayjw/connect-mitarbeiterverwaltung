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
  ) {
    this.key = this.activatedRoute.snapshot.paramMap.get('profile');
    //console.log(this.key); // -> null
    //this.key = "8417fe3e-d2f0-4704-b511-7c2345f0f2a1";



    !this.isNewRecord &&
      (this.model = this.employeesService._personalProfile)
      // this.employeesService
      //   .getByKey(this.key)
      //   .then(value => {
      //     (this.employee = value)
      //     console.log(this.employee);
      //   })
      //   .then(() => this.employee && (this.model = this.employee));
      //   console.log(this.employee)
      //   console.log(this.model)

  }

  ngOnInit() { }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  public get isNewRecord(): boolean {
    return this.key === null;
  }

  public save(): void {
    // TODO make validation
    console.log("adding person");
    console.log(this.key);
    if (this.key) {
      this.employeesService.update(this.key, this.model);
    } else {
      this.employeesService.create(this.model);
    }

    this.dismiss();
    // this.router.navigate(['/ui/home']);
  }

  public delete(): void {
    this.employeesService.delete(this.model._key);
    this.dismiss();
  }
}
