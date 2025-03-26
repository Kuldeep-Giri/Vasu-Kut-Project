import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { FooterComponent } from './buyer/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'VasuKutApp';
  showFooter: boolean = false;

  constructor(private router: Router,private authService: AuthService,) {
    // Detect when the router navigation is complete
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = false; // Hide footer initially after route change
        setTimeout(() => {
       //   this.showFooter = true; // Hide footer initially after route change
       
          this.checkScroll(); // Check if already scrolled to bottom
        }, 200);
      }
    });
  }
  
  
role:any;
  ngOnInit(): void {
    const token = localStorage.getItem('token'); 
    if(token){
    this.role = this.authService.getUserRole(token);
    }

    switch (this.role) {
      case 'seller':
        this.router.navigate(['/seller/home']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'buyer':
      case null:
      default:
        this.router.navigate(['/']);
        break;
    }
  } 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight) {
      this.showFooter = true; // Show footer when user reaches bottom
    }
  }
}
