import { Component } from '@angular/core';
import { AuthService } from '@bluebites/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  constructor(private authService:AuthService) {}

  logoutUser() {
    console.log("logout working!!");
    this.authService.logout();
  }
}
