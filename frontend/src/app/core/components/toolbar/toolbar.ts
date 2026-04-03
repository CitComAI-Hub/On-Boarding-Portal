import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { UiPreferencesService } from '../../services/ui-preferences';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  @Input() showAdminLogin = true;
  @Input() showOnBoarding = true;
  @Input() showUserMenu = false;
  user: any;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    readonly ui: UiPreferencesService
  ) {
    this.user = this.authService.getUser();
  }

  isLogged() {
    return this.authService.isLoggedIn;
  }

  onAdminLogin() {
    if (this.authService.isLoggedIn) {
      this.goAdminDashboard();
    } else {
      this.authService.login();
    }
  }

  onSubmit(): void {
    this.router.navigate(['/submit']);
  }

  goAdminDashboard() {
    this.router.navigate(['/admin'])
  }
  goLanding(): void {
    this.router.navigate(['/'])
  }

  onLogout(): void {
    this.authService.logout()
    this.goLanding();
  }

  openExternal(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
