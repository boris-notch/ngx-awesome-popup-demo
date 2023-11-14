import { Component, Inject } from '@angular/core';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  constructor(
    @Inject('dialogBelonging') public dialogBelonging: DialogBelonging,
  ) {}

  closePopup(): void {
    this.dialogBelonging.eventsController.close();
  }
}
