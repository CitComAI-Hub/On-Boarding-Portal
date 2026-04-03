import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-upload-file',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule, MatTooltipModule],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.scss',
})
export class UploadFile {
  @Input() label: string = 'Seleccionar documentos';
  @Input() accept: string = 'application/pdf';
  @Input() multiple: boolean = true;
  @Input() maxFileSizeMB: number = 5;

  @Output() filesChanged = new EventEmitter<File[]>();

  selectedFiles: File[] = [];

  constructor(private notification: NotificationService) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);

    const validFiles = files.filter(file => {
      const isValidType = this.accept.includes(file.type) || this.accept.includes(file.name.split('.').pop() || '');
      const isValidSize = file.size <= this.maxFileSizeMB * 1024 * 1024;

      if (!isValidType) this.notification.error(`El archivo ${file.name} no tiene un tipo valido.`);
      if (!isValidSize) this.notification.error(`El archivo ${file.name} supera ${this.maxFileSizeMB}MB.`);

      return isValidType && isValidSize;
    });

    if (this.multiple) {
      this.selectedFiles = [...this.selectedFiles, ...validFiles];
    } else {
      this.selectedFiles = validFiles.slice(0, 1);
    }

    this.filesChanged.emit(this.selectedFiles);
    input.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filesChanged.emit(this.selectedFiles);
  }

  previewFile(file: File): void {
    const blobUrl = URL.createObjectURL(file);

    const newWindow = window.open(blobUrl, '_blank');

    if (!newWindow) {
      this.notification.info('Permite las ventanas emergentes para previsualizar el PDF');
    }
  }

}
