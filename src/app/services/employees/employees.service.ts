/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Employee } from '../../models/Employee';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
  update,
  query,
  equalTo,
  get,
  orderByChild,
  child,
} from 'firebase/database';
import { Database, DatabaseReference, DataSnapshot, Unsubscribe } from 'firebase/database';
import { DeviceAuthService } from '../device-auth/device-auth.service';

const EMPLOYEES_DB = 'employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  public personalProfile: Employee;
  private _employees: Employee[];
  private profile: string;

  private readonly firebaseApp: FirebaseApp;
  private readonly database: Database;
  private readonly refEmployees: DatabaseReference;
  // unsubscriber of get data event
  private unsubscriber: Unsubscribe;

  constructor(private deviceAuthService: DeviceAuthService) {
    this._employees = [];
    //this.personalProfile;
    this.firebaseApp = initializeApp(environment.firebase);
    this.database = getDatabase(this.firebaseApp);
    this.refEmployees = ref(this.database, `${EMPLOYEES_DB}/`);

    this.deviceAuthService.getDeviceId().then(value => {
      this.profile = value;
      // register listening
      //this.get();
      this.getPrivate();
    });
  }

  /**
   * to cleanly unsubscribe to data updates when service destroyed
   */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    this.unsubscriber();
  }

  public get employees(): Employee[] {
    return this._employees;
  }



  public refresh(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof this.unsubscriber === 'function' && this.unsubscriber();
    this.get();
  }

  public refreshPrivate(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof this.unsubscriber === 'function' && this.unsubscriber();
    this.getPrivate();
  }

  public getByKey(key: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      const employees = this._employees.filter(employee => employee.profile === key);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !employees.length && reject();
      console.log(employees);
      resolve(employees[0]);
    });
  }

  public update(employee: Employee): void {
    const refUpdateEmployee = ref(this.database, `${EMPLOYEES_DB}/${employee._key}`);
    this.setOwnerToMe(employee).then(() => {
      //delete employee._key;
      update(refUpdateEmployee, employee).then();
    });
  }

  public delete(id: string): void {
    // path to deleting item
    const refDeleteEmployee = ref(this.database, `${EMPLOYEES_DB}/${id}`);
    remove(refDeleteEmployee).then();
  }

  private get(): void {
    const refMyEmployees = query(this.refEmployees, orderByChild('firstName'));
    this.unsubscriber = onValue(refMyEmployees, dataSnapshot => {
      this._employees = /*this.orderBySymbol(*/this.convertDataSnapshotToArray(dataSnapshot)/*)*/;
      console.table(this._employees);
    });
  }

  // todo: use this function to get private
  private getPrivate(): void {
    const refMyEmployees = query(this.refEmployees, orderByChild('profile'), equalTo(this.profile));
    this.unsubscriber = onValue(refMyEmployees, dataSnapshot => {
      this.personalProfile = /*this.orderBySymbol(*/this.convertDataSnapshotToArray(dataSnapshot)[0]/*)*/;
    });
  }

  //#endregion CRUD

  //#region Helpers
  /*
  public orderBySymbol(employees: Employee[]): Employee[] {
    return employees.sort((a, b) => a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase()));
  }*/

  private convertDataSnapshotToArray(dataSnapshot: DataSnapshot): Employee[] {
    const array: Employee[] = [];
    dataSnapshot.forEach(item => {
      const value: Employee = item.val();
      value._key = item.key;
      array.push(value);
    });
    return array;
  }

  private setOwnerToMe(employee: Employee): Promise<void> {
    // get owner from promise to make sure, it's loaded
    return this.deviceAuthService.getDeviceId().then(value => {
      employee.profile = value;
    });
  }

  //#endregion Helpers

}
