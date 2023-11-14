import { Component, inject } from '@angular/core';
import { IProduct } from '@app/models';
import { DialogService } from '../../utils/modals/dialog.service';
import { FancyLoaderComponent } from '../dialog-components/fancy-loader/fancy-loader.component';
import { ProductListComponent } from '../dialog-components/product-list/product-list.component';

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.scss'],
})
export class DialogPreviewComponent {
  dialogService = inject(DialogService);
  selectedProduct?: IProduct;

  fullScreen(): void {
    this.dialogService
      .previewDialogFullScreen<null, IProduct>(ProductListComponent, null)
      .subscribe((resp) => (this.selectedProduct = resp));
  }

  previewDialogCustomSize(): void {
    this.dialogService
      .previewDialogCustomSize<null, IProduct>(ProductListComponent, null)
      .subscribe((resp) => (this.selectedProduct = resp));
  }

  withLoader(): void {
    this.dialogService
      .previewDialogCustomSize<null, IProduct>(ProductListComponent, null, true)
      .subscribe((resp) => (this.selectedProduct = resp));
  }

  withFancyLoader(): void {
    this.dialogService
      .previewDialogCustomSize<null, IProduct>(
        ProductListComponent,
        null,
        true,
        {
          loaderComponent: FancyLoaderComponent,
          escapeKeyClose: true,
        },
      )
      .subscribe((resp) => (this.selectedProduct = resp));
  }
}
