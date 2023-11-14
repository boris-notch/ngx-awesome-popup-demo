import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceLocator } from '@app/utils';
import {
  ConfirmBoxConfigModule,
  DialogConfigModule,
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { environment } from '../environment/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { elfDevtools } from './elf-dev-tools';
import { AlertPreviewComponent } from './layout/alert-preview/alert-preview.component';
import { ConfirmBoxPreviewComponent } from './layout/confirm-box-preview/confirm-box-preview.component';
import { FancyLoaderComponent } from './layout/dialog-components/fancy-loader/fancy-loader.component';
import { ProductDetailsComponent } from './layout/dialog-components/product-details/product-details.component';
import { ProductListComponent } from './layout/dialog-components/product-list/product-list.component';
import { DialogPreviewComponent } from './layout/dialog-preview/dialog-preview.component';
import { LoremIpsumComponent } from './layout/lorem-ipsum/lorem-ipsum.component';
import { ToastPreviewComponent } from './layout/toast-preview/toast-preview.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    ToastPreviewComponent,
    ConfirmBoxPreviewComponent,
    AlertPreviewComponent,
    DialogPreviewComponent,
    ProductDetailsComponent,
    FancyLoaderComponent,
    LoremIpsumComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductListComponent,
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot({
      globalSettings: {
        allowedNotificationsAtOnce: 9, // The number of toast notifications that can be shown at once.
      },
    }),
    MenubarModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [
    !environment.production ? elfDevtools() : [],
    {
      provide: LOCALE_ID,
      useValue: 'fr',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    ServiceLocator.injector = injector;
  }
}
