import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { IProduct } from '@app/models';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    CardModule,
    InputNumberModule,
    PaginatorModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  constructor(
    @Inject('dialogBelonging')
    public dialogBelonging: DialogBelonging<IProduct>,
  ) {}

  submit(): void {
    this.dialogBelonging.eventsController.close(
      this.dialogBelonging.customData,
    );
  }

  cancel(): void {
    this.dialogBelonging.eventsController.close();
  }
}
