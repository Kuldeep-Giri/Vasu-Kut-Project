import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  categories = [
    { 
      name: "Teas & Infusions", image: "img5.jpg",
      subcategories: [
        { name: "Fresh Vegetables", items: ["Fresh Asparagus", "Fresh Broccoli", "Fresh Burdock", "Fresh Cabbages"] },
        { name: "Grain", items: ["Barley", "Buckwheat", "Corn", "Millet"] },
        { name: "Nuts & Kernels", items: ["Peanuts", "Cashew Nuts", "Pumpkin Kernels", "Chestnuts"] },
        { name: "Beans", items: ["Cacao Beans", "Vanilla Beans", "Broad Beans", "Butter Beans"] },
        { name: "Feed", items: ["Animal Feed", "Soybean Meal", "Fish Meal", "Hay"] },
        { name: "Fertilizer", items: ["Biological Fertilizer", "Compound Fertilizer", "Nitrogen Fertilizer", "Organic Fertilizer"] }
      ] 
    },
    { name: "Health & Wellness", image: "img6.jpg", 
      subcategories: [
      { name: "Fresh Vegetables", items: ["Fresh Asparagus", "Fresh Broccoli", "Fresh Burdock", "Fresh Cabbages"] },
      { name: "Grain", items: ["Barley", "Buckwheat", "Corn", "Millet"] },
      { name: "Nuts & Kernels", items: ["Peanuts", "Cashew Nuts", "Pumpkin Kernels", "Chestnuts"] },
    ]  },
    { name: "Oil & Gheee",  image: "img7.jpg", 
      subcategories: [
      { name: "Fresh Vegetables", items: ["Fresh Asparagus", "Fresh Broccoli", "Fresh Burdock", "Fresh Cabbages"] },
      { name: "Grain", items: ["Barley", "Buckwheat", "Corn", "Millet"] },
      { name: "Nuts & Kernels", items: ["Peanuts", "Cashew Nuts", "Pumpkin Kernels", "Chestnuts"] },
      { name: "Beans", items: ["Cacao Beans", "Vanilla Beans", "Broad Beans", "Butter Beans"] },
      { name: "Feed", items: ["Animal Feed", "Soybean Meal", "Fish Meal", "Hay"] },
      { name: "Fertilizer", items: ["Biological Fertilizer", "Compound Fertilizer", "Nitrogen Fertilizer", "Organic Fertilizer"] }
    ]  },
    { name: "Pulses & Packaged Food",image: "img8.jpg", subcategories: [] },
    { name: "Personal Care",image: "img9.jpg", subcategories: [] },
    { name: "Health & Medical",image: "img10.jpg", subcategories: [] },
    { name: "Minerals & Metallurgy",image: "img11.jpg", subcategories: [] },
    { name: "Packaging & Printing",image: "img12.jpg", subcategories: [] }
  ];
ngOnInIt(){
  console.log("hhhhhhhhhh")
}
  activeCategory: any = null;
  timeoutHandle: any = null;
  isMobile: boolean = false;
  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
  onHover(category: any) {
    if (category.subcategories.length > 0) {
      this.activeCategory = category;
      clearTimeout(this.timeoutHandle); // Cancel hiding
    } else {
      this.activeCategory = null;
    }
  }

  onLeave() {
    this.timeoutHandle = setTimeout(() => {
      this.activeCategory = null;
    }, 300); // Delay to allow smooth movement
  }

  cancelHide() {
    clearTimeout(this.timeoutHandle);
  }

}
