import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnquiryService } from '../enquiry.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-enquiry',
  imports: [MatDialogModule,MatFormFieldModule,MatButtonModule,MatInputModule,FormsModule,CommonModule,FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss'
})
export class EnquiryComponent {
  @ViewChild('enquiryDialog') enquiryDialog!: TemplateRef<any>;
 userId: string = "null";
 form:any;
  constructor(private dialog: MatDialog,private enquiryService:EnquiryService,private toast:ToastrService,private authService:AuthService) {}
ngOnInit() {
   const token = localStorage.getItem('token');
   if(token){
     this.userId = this.authService.getLoggedInUserId(token);
   }
    this.form = {
    fullName: '',
    email: '',
    phone: '',
    industry: '',
    quantity: null,
    requirement: '',
    UserId:this.userId,
  };
  }
  openDialog() {
    this.dialog.open(this.enquiryDialog, {
      width: '400px'
    });
  }
 

  onSubmit() {
    this.enquiryService.AddEnquiry(this.form).subscribe(
      response => { 
        if(response) {
          this.toast.success('Enquiry submitted successfully');
          this.dialog.closeAll(); // Close the dialog after submission
        }
      },
      error => {
        console.error('Error submitting enquiry', error);
      }
    );
  }
}
