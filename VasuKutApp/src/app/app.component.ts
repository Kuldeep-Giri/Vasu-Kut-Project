import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxImageZoomModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'VasuKutApp';
}
