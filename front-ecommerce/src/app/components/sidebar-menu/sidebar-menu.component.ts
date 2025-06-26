import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  constructor(private router: Router,public authService: AuthService) {}

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}