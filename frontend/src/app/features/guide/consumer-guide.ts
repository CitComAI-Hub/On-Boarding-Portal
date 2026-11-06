import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Toolbar } from '../../core/components/toolbar/toolbar';
import { SiteFooter } from '../../core/components/site-footer/site-footer';
import { UiPreferencesService } from '../../core/services/ui-preferences';

@Component({
  selector: 'app-consumer-guide',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, Toolbar, SiteFooter],
  templateUrl: './consumer-guide.html',
  styleUrls: ['./consumer-guide.scss']
})
export class ConsumerGuide {
  readonly keycloakGuideUrl = 'https://citcomai-hub.github.io/guides/keycloak_users/';
  readonly walletGuideUrl = 'https://citcomai-hub.github.io/guides/wallet/';

  constructor(readonly ui: UiPreferencesService) { }
}
