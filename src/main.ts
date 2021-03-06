import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window &&
    (window.console.log =
      window.console.debug =
      window.console.table =
      window.console.warn =
      () => { }
    );
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
