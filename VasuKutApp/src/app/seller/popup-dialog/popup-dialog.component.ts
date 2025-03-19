import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-popup-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Details</h2>
    <mat-dialog-content>
      <div *ngIf="data.type === 'description'" [innerHTML]="data.content"></div>
      <div *ngIf="data.type === 'images'">
    <ng-container *ngIf="data.content?.length > 0; else noImage">
      <img *ngFor="let img of data.content" [src]="img" class="img-fluid" />
    </ng-container>
    <ng-template #noImage>
      <p>No images available</p>
    </ng-template>
  </div>

      <div *ngIf="data.type === 'video'">
        <iframe width="100%" height="315" [src]="data.content"></iframe>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: ['img { width: 100%; max-height: 200px; margin: 5px; }'],
})
export class PopupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
