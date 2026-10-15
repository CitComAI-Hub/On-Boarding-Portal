import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';
import { UiPreferencesService } from '../../services/ui-preferences';

@Component({
    selector: 'app-site-footer',
    standalone: true,
    imports: [MatIconModule],
    templateUrl: './site-footer.html',
    styleUrl: './site-footer.scss'
})
export class SiteFooter {
    readonly year = new Date().getFullYear();

    constructor(
        readonly ui: UiPreferencesService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) { }

    openExternal(url: string): void {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    onAdminAccess(): void {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/admin']);
        } else {
            this.authService.login();
        }
    }
}
