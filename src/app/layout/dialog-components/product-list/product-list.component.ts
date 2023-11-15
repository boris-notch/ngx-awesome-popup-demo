import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct, Product } from '@app/models';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';
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
import { defer, delay, Observable, of, switchMap, tap } from 'rxjs';
import { DialogService } from '../../../utils/modals/dialog.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

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
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  // loading items from API, closing loader when items are loaded
  products: Observable<IProduct[]> = new Product().fetchAllSelect$().pipe(
    switchMap((resp) =>
      defer(() => {
        return this.dialogBelonging.dialogCoreConfig.displayLoader
          ? of(resp).pipe(
              delay(1500),
              tap(() => this.dialogBelonging.eventsController.closeLoader()),
            )
          : of(resp);
      }),
    ),
  );
  dialogService = inject(DialogService);

  constructor(
    @Inject('dialogBelonging') private dialogBelonging: DialogBelonging,
  ) {}

  showProductDetails(product: IProduct): void {
    this.dialogService.previewDialogFitContent<IProduct, never>(
      ProductDetailsComponent,
      product,
    );
  }

  selectClose(product: IProduct): void {
    this.dialogBelonging.eventsController.close(product);
  }

  closePopup(): void {
    this.dialogBelonging.eventsController.close();
  }
}
