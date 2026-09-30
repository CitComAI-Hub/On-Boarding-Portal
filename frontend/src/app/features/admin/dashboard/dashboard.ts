import { Component } from '@angular/core';
import { PaginatedTable } from '../../../core/components/paginated-table/paginated-table';
import { PageQueryFn } from '../../../core/types/pagination';
import { Registration } from '../../../core/types/registration';
import { OnBoardingService } from '../../../core/services/onboarding.service';
import { ColumnConfig } from '../../../core/types/column-config';
import { Toolbar } from "../../../core/components/toolbar/toolbar";
import { FilterConfig } from '../../../core/types/table-filter';
import { RegistrationStatus } from '../../../core/types/registration-status';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UiPreferencesService } from '../../../core/services/ui-preferences';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../core/components/confirm-dialog/confirm-dialog';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-dashboard',
  imports: [PaginatedTable, Toolbar, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  constructor(
    private onBoardingService: OnBoardingService,
    private readonly router: Router,
    readonly ui: UiPreferencesService,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService
  ) { }

  get columns(): ColumnConfig[] {
    return [
      {
        key: 'email',
        label: this.ui.t('dashboard.colEmail'),
        type: 'text',
      },
      {
        key: 'status',
        label: this.ui.t('dashboard.colStatus'),
        type: 'text',
        uppercase: true,
        getValue: (row) => row.status.split('_').join(' '),
      },
      {
        key: 'createdAt',
        label: this.ui.t('dashboard.colCreatedAt'),
        type: 'date',
        dateFormat: 'dd/MM/yyyy HH:mm',
      },
      {
        key: 'updatedAt',
        label: this.ui.t('dashboard.colUpdatedAt'),
        type: 'date',
        dateFormat: 'dd/MM/yyyy HH:mm:ss',
      },
      {
        key: 'files',
        label: this.ui.t('dashboard.colFiles'),
        type: 'number',
        getValue: (row) => (row.files ? row.files?.length : 0),
      },
      {
        key: 'delete',
        label: '',
        type: 'action',
        icon: 'delete',
        action: (row: Registration, reload) => {
          this.dialog.open(ConfirmDialog, {
            data: {
              title: this.ui.t('dashboard.deleteTitle'),
              message: this.ui.t('dashboard.deleteMessage').replace('{{email}}', row.email),
              confirmText: this.ui.t('dashboard.deleteConfirm'),
              cancelText: this.ui.t('details.cancel'),
            }
          }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
              this.onBoardingService.deleteAdminRegistration(row.id).subscribe({
                next: () => {
                  this.notificationService.info(this.ui.t('dashboard.deleteSuccess'));
                  reload();
                },
                error: (error) => {
                  console.error('Error deleting registration', error);
                  this.notificationService.error(this.ui.t('dashboard.deleteError'));
                }
              });
            }
          });
        }
      },
    ];
  }

  get filters(): FilterConfig[] {
    return [{
      key: 'status',
      label: this.ui.t('dashboard.colStatus'),
      type: 'enum',
      multiple: true,
      options: Object.keys(RegistrationStatus).map((key) => ({
        label: key.split('_').join(' '),
        value: String(RegistrationStatus[key as keyof typeof RegistrationStatus]),
      })),
    }];
  }

  fetchRegistrations: PageQueryFn<Registration> = (page: number, limit: number, filter: { [key: string]: any }) => {
    const { status } = filter
    return this.onBoardingService.getAdminRegistrations({ page, limit, status: status });
  };

  goToReview(event: Registration) {
    this.router.navigate([`/admin/${event.id}`])
  }
}
