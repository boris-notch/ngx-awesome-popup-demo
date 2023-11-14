import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Toast',
        icon: 'pi pi-fw pi-clone',
        routerLink: 'toast',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Confirm box',
        icon: 'pi pi-fw pi-clone',
        routerLink: 'confirm-box',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Alert box',
        icon: 'pi pi-fw pi-clone',
        routerLink: 'alert-box',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Dialog',
        icon: 'pi pi-fw pi-clone',
        routerLink: 'dialog',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Interactive',
        icon: 'pi pi-fw pi-clone',
        routerLink: 'interactive',
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }
}
