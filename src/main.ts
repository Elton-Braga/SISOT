import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
/*
bootstrapApplication(App, {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
});*/
registerLocaleData(localePt);
