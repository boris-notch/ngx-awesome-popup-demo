import { Component, inject } from '@angular/core';
import { AlertBoxService } from '../../utils/modals/alert-box.service';

@Component({
  selector: 'app-alert-preview',
  templateUrl: './alert-preview.component.html',
  styleUrls: ['./alert-preview.component.scss'],
})
export class AlertPreviewComponent {
  alertBoxService = inject(AlertBoxService);
  title = 'Welcome to Our Shop Deals!';
  message = 'Stay tuned for announcements!';

  success(): void {
    this.alertBoxService.success(this.title, this.message);
  }

  info(): void {
    this.alertBoxService.info(this.title, this.message);
  }

  warning(): void {
    this.alertBoxService.warning(this.title, this.message);
  }

  danger(): void {
    this.alertBoxService.danger(this.title, this.message);
  }

  none(): void {
    this.alertBoxService
      .none(this.title, this.message)
      .subscribe((resp) => console.log(resp));
  }
}
