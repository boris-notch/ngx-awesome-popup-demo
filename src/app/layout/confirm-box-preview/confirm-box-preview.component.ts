import { Component, inject } from '@angular/core';
import { ConfirmBoxService } from '../../utils/modals/confirm-box.service';

@Component({
  selector: 'app-confirm-box-preview',
  templateUrl: './confirm-box-preview.component.html',
  styleUrls: ['./confirm-box-preview.component.scss'],
})
export class ConfirmBoxPreviewComponent {
  confirmBoxService = inject(ConfirmBoxService);

  title = 'Header';
  message = '<b>HTML</b> Message';

  success(): void {
    this.confirmBoxService
      .success(this.title, this.message)
      .subscribe((resp) => console.log(resp));
  }

  info(): void {
    this.confirmBoxService
      .info(this.title, this.message)
      .subscribe((resp) => console.log(resp));
  }

  warning(): void {
    this.confirmBoxService
      .warning(this.title, this.message)
      .subscribe((resp) => console.log(resp));
  }

  danger(): void {
    this.confirmBoxService
      .danger(this.title, this.message)
      .subscribe((resp) => console.log(resp));
  }

  none(): void {
    this.confirmBoxService
      .none(this.title, this.message)
      .subscribe((resp) => console.log(resp));
  }
}
