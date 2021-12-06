import {Component, OnDestroy, OnInit} from '@angular/core';
import {IsOnlineService} from './services/is-online/is-online.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private isOnlineService: IsOnlineService) {}

  ngOnDestroy(): void {
    this.isOnlineService.unregister();
  }

  ngOnInit(): void {}
}
