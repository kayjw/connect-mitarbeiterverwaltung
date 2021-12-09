import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class IsOnlineService {
  private listener: PluginListenerHandle;
  private toast: HTMLIonToastElement;

  constructor(private toastController: ToastController) {
    this.register();
  }

  public get isOnline(): Promise<boolean> {
    return Network.getStatus().then(value => {
      return value.connected;
    });
  }

  private register(): void {
    this.listener = Network.addListener('networkStatusChange', status => {
      console.debug('Network status changed', status);
      !status.connected && this.showToastOffline().then();
    });
  }

  private async showToastOffline(): Promise<void> {
    const TOAST_DURATION_MS = 3 * 1000;
    this.toast = await this.toastController.create({
      message: "Es besteht keine Internetverbindung. Deine Daten werden gesichert, wenn du wieder online bist.",
      duration: TOAST_DURATION_MS,
      buttons: ['verstanden'],
    });
    await this.toast.present();
  }

  public unregister(): void {
    this.listener.remove().then();
  }
}
