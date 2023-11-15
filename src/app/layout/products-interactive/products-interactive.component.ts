import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct, Product } from '@app/models';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { defer, Observable, of, switchMap, take, tap } from 'rxjs';
import { ConfirmBoxService } from '../../utils/modals/confirm-box.service';
import { DialogService } from '../../utils/modals/dialog.service';
import { ToastService } from '../../utils/modals/toast.service';
import { ProductFormComponent } from '../dialog-components/product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    TableModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    InputNumberModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './products-interactive.component.html',
})
export class ProductsInteractiveComponent {
  products: Observable<IProduct[]> = new Product().fetchAllSelect$();
  clonedProduct: IProduct = new Product();
  newItem!: IProduct;
  dialogService = inject(DialogService);
  toastService = inject(ToastService);
  confirmBoxService = inject(ConfirmBoxService);

  onNew(): void {
    this.newItem = new Product();
    this.dialogService
      .previewDialogFitContent<IProduct, IProduct>(
        ProductFormComponent,
        this.newItem,
      )
      .pipe(
        switchMap((newProduct) =>
          defer(() => {
            return newProduct === null || newProduct.isEqualTo(new Product())
              ? of(null)
              : this.confirmBoxService.warning(
                  'Are you sure',
                  'Create new product?',
                );
          }),
        ),
        switchMap((confirmationResponse) =>
          defer(() => {
            return confirmationResponse?.success
              ? this.newItem.addItemSelect$().pipe(
                  tap(() => {
                    this.toastService.success('', 'Created successfully');
                  }),
                )
              : of(null);
          }),
        ),
        take(1),
      )
      .subscribe();
  }

  onEdit(product: Product): void {
    // Clone the currently edited product for later comparison
    this.clonedProduct.copyValuesFrom(product);

    this.dialogService
      .previewDialogFitContent<IProduct, IProduct>(
        ProductFormComponent,
        this.clonedProduct,
      )
      .pipe(
        switchMap((editedProduct) =>
          defer(() => {
            return editedProduct === null || editedProduct.isEqualTo(product)
              ? of(null)
              : this.confirmBoxService.warning(
                  'Are you sure',
                  'Save product changes?',
                );
          }),
        ),
        switchMap((confirmationResponse) =>
          defer(() => {
            return confirmationResponse?.success
              ? this.clonedProduct.updateItemSelect$().pipe(
                  tap((resp) => {
                    this.toastService.success('', 'Saved successfully');
                  }),
                )
              : of(null);
          }),
        ),
        take(1),
      )
      .subscribe();
  }

  onDelete(product: Product): void {
    this.confirmBoxService
      .danger('Are you sure', `Delete item: ${product.name}?`)
      .pipe(
        switchMap((confirmationResponse) =>
          defer(() => {
            return confirmationResponse?.success
              ? product.deleteItem$().pipe(
                  tap((resp) => {
                    this.toastService.warning('', 'Deleted successfully');
                  }),
                )
              : of(null);
          }),
        ),
        take(1),
      )
      .subscribe();
  }
}
