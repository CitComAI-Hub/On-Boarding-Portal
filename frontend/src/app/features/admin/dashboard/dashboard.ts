import { Component } from '@angular/core';
import { PaginatedTable } from '../../../core/components/paginated-table/paginated-table';
import { PageQueryFn, TableSort } from '../../../core/types/pagination';
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

  readonly defaultSort: TableSort = { active: 'name', direction: 'asc' };

  get columns(): ColumnConfig[] {
    return [
      {
        key: 'name',
        label: this.ui.t('dashboard.colOrganization'),
        type: 'text',
        sortable: true,
        getSecondary: (row: Registration) => row.email,
      },
      {
        key: 'status',
        label: this.ui.t('dashboard.colStatus'),
        type: 'status',
        sortable: true,
        getValue: (row: Registration) => this.ui.t(`status.${row.status}`),
      },
      {
        key: 'createdAt',
        label: this.ui.t('dashboard.colCreatedAt'),
        type: 'date',
        sortable: true,
        dateFormat: 'dd/MM/yyyy HH:mm',
      },
      {
        key: 'updatedAt',
        label: this.ui.t('dashboard.colUpdatedAt'),
        type: 'date',
        sortable: true,
        dateFormat: 'dd/MM/yyyy HH:mm',
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
        tooltip: this.ui.t('dashboard.deleteTitle'),
        action: (row: Registration, reload) => {
          this.dialog.open(ConfirmDialog, {
            data: {
              title: this.ui.t('dashboard.deleteTitle'),
              message: this.ui.replace('dashboard.deleteMessage', { name: row.name }),
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
    return [
      {
        key: 'search',
        label: this.ui.t('dashboard.search'),
        type: 'text',
      },
      {
        key: 'status',
        label: this.ui.t('dashboard.colStatus'),
        type: 'enum',
        multiple: true,
        options: Object.values(RegistrationStatus).map((status) => ({
          label: this.ui.t(`status.${status}`),
          value: status,
        })),
      },
    ];
  }

  fetchRegistrations: PageQueryFn<Registration> = (page, limit, filter, sort) => {
    const { status, search } = filter;
    return this.onBoardingService.getAdminRegistrations({
      page,
      limit,
      status,
      search,
      sortBy: sort?.active,
      order: sort?.direction === 'desc' ? 'DESC' : 'ASC',
    });
  };

  goToReview(event: Registration) {
    this.router.navigate([`/admin/${event.id}`])
  }
}
