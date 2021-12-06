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
    // key from url not possible
    //this.key = this.activatedRoute.snapshot.paramMap.get('key');
    //console.log(this.key);

    /*!this.isNewRecord &&
      this.employeesService
        .getByKey(this.key)
        .then(value => (this.employee = value))
        .then(() => (this.model = this.employee));

*/
    //console.log(this.employeesService.getByKey(this.model._key))
     // console.log(this.employeesService._personalProfile)
      //this.model = this.employeesService._personalProfile
      //console.log(this.model);
      if (this.key !== null) {
        console.log(this.employeesService._personalProfile)
      } else {
        console.log("create new record")
      }
    }

    // add will not work
  ngOnInit() {  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public save(): void {
    console.log("save")
    console.log(this.model)
    // TODO make validation
    //if (this.key) {
      //this.employeesService.update(this.model);
    //} else {
      this.employeesService.create(this.model);
    //}

    this.dismiss();
    // this.router.navigate(['/ui/home']);
  }

  public delete(): void {
    this.employeesService.delete(this.model._key);
    this.dismiss();
  }
}
