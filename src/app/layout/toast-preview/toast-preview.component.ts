import { Component, inject } from '@angular/core';
import { ToastService } from '../../utils/modals/toast.service';

@Component({
  selector: 'app-toast-preview',
  templateUrl: './toast-preview.component.html',
  styleUrls: ['./toast-preview.component.scss'],
})
export class ToastPreviewComponent {
  toastService = inject(ToastService);

  success(): void {
    this.toastService.success('Header', '<b>HTML</b> Message');
  }

  info(): void {
    this.toastService.info('Header', '<b>HTML</b> Message');
  }

  warning(): void {
    this.toastService.warning('Header', '<b>HTML</b> Message');
  }

  danger(): void {
    this.toastService.danger('Header', '<b>HTML</b> Message');
  }

  none(): void {
    this.toastService.none('Header', '<b>HTML</b> Message');
  }

  renderInMyDiv(): void {
    this.toastService.renderInIDWrapper(
      'my-div',
      'Header',
      '<b>HTML</b> Message',
    );
  }
}
