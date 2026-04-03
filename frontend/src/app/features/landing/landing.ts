import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { Toolbar } from "../../core/components/toolbar/toolbar";
import { UiPreferencesService } from '../../core/services/ui-preferences';
import { SiteFooter } from '../../core/components/site-footer/site-footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    Toolbar,
    SiteFooter
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class Landing {

  constructor(
    private readonly router: Router,
    readonly ui: UiPreferencesService
  ) { }


  onSubmit(fragment?: string): void {
    this.router.navigate(['/submit'], { fragment: fragment });
  }

  openExternal(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

}