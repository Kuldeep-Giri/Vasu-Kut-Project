import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { environment } from '../../environments/environments';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../buyer/spinner/spinner.component';

@Component({
  selector: 'app-banner',
  imports: [CommonModule,SpinnerComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
constructor(private adminservice:AdminService,private toast:ToastrService){}

  imageSrc: string | null = null; // Variable to store the selected image
 imageUrl = `${environment.imageUrl}/`;
  // Function to preview uploaded image
  previewFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; // Safely get the file from the event

    if (file) {
      this.selectedFile = file;  // Store the selected file
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Assign the image URL to display in your template
      };
      
      reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded)
    }
  }
  banners: any[] = [];
  loading: boolean = false;
  selectedFile: File | null = null;
 


  ngOnInit(): void {
    this.loadBanners();
  }
 

  

  onUpload(fileInput: HTMLInputElement): void {
    if (!this.selectedFile) {
      this.toast.error('Please select a file first!');
      return;
    }
    this.loading = true;
    this.adminservice.uploadBanner(this.selectedFile).subscribe(
      (response:any) => {
        this.toast.success('File uploaded successfully');
        fileInput.value = '';  // Clear the file input
      this.imageSrc = null;  // Clear the image preview (if any)
      this.selectedFile = null;  // Clear the selected file
        this.loadBanners();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toast.error('Error uploading file');
      }
    );
  }
  // ✅ Fetch all banners
  loadBanners() {
    this.loading = true;
    this.adminservice.getAllBanners().subscribe({
      next: (response:any) => {
        this.banners = response.data.reverse();
        this.loading = false;
      },
      error: (error:any) => {
        this.loading = false;
      }
    });
  }

  // ✅ Delete a banner
  deleteBanner(bannerId: number) {
    if (!confirm('Are you sure you want to delete this banner?')) {
      return;
    }

    this.adminservice.deleteBanner(bannerId).subscribe({
      next: () => {
        this.banners = this.banners.filter(b => b.id !== bannerId);
        this.toast.success('Banner deleted successfully');
        this.loadBanners();
      },
      error: (error:any) => {
        this.toast.success('Failed to delete banner');
      }
    });
  }
}
