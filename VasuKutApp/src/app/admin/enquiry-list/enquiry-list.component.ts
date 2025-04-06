import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../buyer/enquiry.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../buyer/spinner/spinner.component';

@Component({
  selector: 'app-enquiry-list',
  imports: [CommonModule,DatePipe,SpinnerComponent],
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {
  enquiries: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  filterIsContacted: any;  // Track filter for IsContacted
  loading: boolean = false; // Loading state
  constructor(private enquiryService: EnquiryService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getEnquiries();
  }

  getEnquiries(): void {
    this.loading = true; // Set loading state to true
    this.enquiryService.getEnquiries(this.pageNumber, this.pageSize,this.filterIsContacted).subscribe(
      (response) => {
        this.totalRecords = response.totalRecords;
        this.enquiries = response?.enquiries?.reverse()?.map((enquiry: any) => ({
          ...enquiry
        }));
      // Debugging line
      },
      (error) => {
        console.error('Error fetching enquiries:', error);
      }
    );
    this.loading = false; // Reset loading state after fetching
  }

  deleteEnquiry(id: number): void {
    this.enquiryService.removeEnquiry(id).subscribe(
      () => {
        this.toast.success('Enquiry deleted successfully');
        this.getEnquiries(); // Refresh after deletion
      },
      (error) => {
        console.error('Error deleting enquiry:', error);
      }
    );
  }
  markAsContacted(id: number, enquiry: any): void {
    this.enquiryService.markAsContacted(id).subscribe(
      () => {
        this.toast.success('Enquiry marked as contacted');
        enquiry.IsContacted = true; // Update status in UI
        this.getEnquiries(); // Refresh after marking as contacted
      },
      (error) => {
        console.error('Error marking as contacted:', error);
        this.getEnquiries(); 
      }
    );
  }

  // Pagination controls
  nextPage(): void {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.getEnquiries();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getEnquiries();
    }
  }
    // Filter enquiries based on IsContacted status
    filterByContactStatus(isContacted: boolean | null): void {
      this.filterIsContacted = isContacted;
      this.getEnquiries();
    }
}
