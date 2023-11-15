import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertPreviewComponent } from './layout/alert-preview/alert-preview.component';
import { ConfirmBoxPreviewComponent } from './layout/confirm-box-preview/confirm-box-preview.component';
import { DialogPreviewComponent } from './layout/dialog-preview/dialog-preview.component';
import { HomeComponent } from './layout/home/home.component';
import { ProductsInteractiveComponent } from './layout/products-interactive/products-interactive.component';
import { ToastPreviewComponent } from './layout/toast-preview/toast-preview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'toast',
    component: ToastPreviewComponent,
  },
  {
    path: 'confirm-box',
    component: ConfirmBoxPreviewComponent,
  },
  {
    path: 'alert-box',
    component: AlertPreviewComponent,
  },
  {
    path: 'dialog',
    component: DialogPreviewComponent,
  },
  {
    path: 'interactive',
    component: ProductsInteractiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
