import { Component } from '@angular/core';
import { UiPreferencesService } from '../../services/ui-preferences';

@Component({
    selector: 'app-site-footer',
    standalone: true,
    templateUrl: './site-footer.html',
    styleUrl: './site-footer.scss'
})
export class SiteFooter {
    readonly year = new Date().getFullYear();

    constructor(readonly ui: UiPreferencesService) { }

    openExternal(url: string): void {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}
