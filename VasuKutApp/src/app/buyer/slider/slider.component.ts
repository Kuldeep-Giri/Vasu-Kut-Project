import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
 
constructor(private adminservice:AdminService){}
banners: any[] = [];
  imageUrl = `${environment.imageUrl}/`;
  ngOnInit(): void {
   this.loadBanners();
  }

  loadBanners() {
    this.adminservice.getAllBanners().subscribe({
      next: (response:any) => {
        this.banners = response.data.reverse().slice(0, 3);
      },
      error: (error:any) => {
        
      }
    });
  }
}
