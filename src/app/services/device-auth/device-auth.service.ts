import {Injectable} from '@angular/core';
import {Device} from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceAuthService {
  private _deviceId: string;

  constructor() {
    this.getDeviceId().then(value => (this._deviceId = value));
  }

  get deviceId(): string {
    return this._deviceId;
  }

  public getDeviceId(): Promise<string> {
    return Device.getId().then(
      value => {
        return value.uuid;
      },
      _ => {
        console.warn('could not get device uuid');
        console.warn("will use 'dummy'");
        return 'dummy';
      }
    );
  }
}
