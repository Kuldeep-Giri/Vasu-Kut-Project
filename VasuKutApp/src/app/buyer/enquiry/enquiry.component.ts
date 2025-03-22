import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-enquiry',
  imports: [MatDialogModule,MatFormFieldModule,MatButtonModule,MatInputModule,FormsModule,CommonModule,FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss'
})
export class EnquiryComponent {
  @ViewChild('enquiryDialog') enquiryDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(this.enquiryDialog, {
      width: '400px'
    });
  }
  form = {
    fullName: '',
    email: '',
    phone: '',
    industry: '',
    quantity: null,
    requirement: ''
  };

  onSubmit() {
    console.log('Form Submitted:', this.form);
    // Handle your API call or logic here
  }
}
