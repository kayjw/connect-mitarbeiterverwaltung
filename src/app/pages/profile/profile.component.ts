import { Component, NgModule, OnInit } from '@angular/core';
import { DeviceAuthService } from '../../services/device-auth/device-auth.service';
import { ToastController } from '@ionic/angular';
import { Employee } from '../../models/Employee';
import { EmployeesService } from '../../services/employees/employees.service';
import { ModalController } from '@ionic/angular';
import { EditComponent } from 'src/app/edit/edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  // ionic toast to only show one element
  private toast: HTMLIonToastElement;
  public profile: string;
  // todo: watch when edit changes
  public edit = false;

  constructor(
    private deviceAuthService: DeviceAuthService,
    private toastController: ToastController,
    private employeesService: EmployeesService,
    public modalController: ModalController
  ) {
    setTimeout(() => {}, 1000);
    // NOT WORKING
    //this.deviceAuthService.getDeviceId().then(deviceId => this.profile = deviceId);

    //this.profile = "8417fe3e-d2f0-4704-b511-7c2345f0f2a1";
    this.edit = false;
  }

  ngOnInit() { this.refreshEmployees(null) }


  async presentModal() {
    const modal = await this.modalController.create({
      component: EditComponent
    });
    return await modal.present();
  }

  get employee(): Employee {
    return this.employeesService.employees.filter(
      value => {
        return value.profile === this.deviceId
      }
    )[0];
  }


  public refreshEmployees($event): void {
    this.employeesService.refreshPrivate();
    // confirm refresh
    $event?.target.complete();
    this.edit = false;
  }

  public get deviceId(): string {
    return this.deviceAuthService.deviceId;
  }
}
