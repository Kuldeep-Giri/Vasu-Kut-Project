import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'VasuKutApp';
//   showFooter: boolean = false;

//   constructor(private router: Router,private authService: AuthService,) {
//     // Detect when the router navigation is complete
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//       //  this.showFooter = false; // Hide footer initially after route change
//         setTimeout(() => {
//           this.showFooter = true; // Hide footer initially after route change
       
//           this.checkScroll(); // Check if already scrolled to bottom
//         }, 500);
//       }
//     });
//   }
  
  
// role:any;
 
//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.checkScroll();
//   }

//   private checkScroll() {
//     const scrollPosition = window.innerHeight + window.scrollY;
//     const documentHeight = document.documentElement.scrollHeight;

//     if (scrollPosition >= documentHeight) {
//       this.showFooter = true; // Show footer when user reaches bottom
//     }
//   }
}
