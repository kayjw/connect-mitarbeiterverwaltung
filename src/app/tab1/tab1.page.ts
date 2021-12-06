import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';

interface Item {
  name: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(public platform: Platform) {}

  get platformHeaderIsSupported(): boolean {
    return this.platform.is('ios');
  }
}
