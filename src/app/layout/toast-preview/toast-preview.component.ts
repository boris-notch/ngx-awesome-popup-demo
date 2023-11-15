import { Component, inject } from '@angular/core';
import { ToastService } from '../../utils/modals/toast.service';

@Component({
  selector: 'app-toast-preview',
  templateUrl: './toast-preview.component.html',
  styleUrls: ['./toast-preview.component.scss'],
})
export class ToastPreviewComponent {
  toastService = inject(ToastService);

  title = 'Header';
  message = '<b>HTML</b> Message';

  success(): void {
    this.toastService.success(this.title, this.message);
  }

  info(): void {
    this.toastService.info(this.title, this.message);
  }

  warning(): void {
    this.toastService.warning(this.title, this.message);
  }

  danger(): void {
    this.toastService.danger(this.title, this.message);
  }

  none(): void {
    this.toastService
      .none(this.title, this.message /*, 'Done', 'Cancel'*/)
      .subscribe((resp) => console.log(resp));
  }

  renderInMyDiv(): void {
    this.toastService.renderInIDWrapper('my-div', this.title, this.message);
  }
}
