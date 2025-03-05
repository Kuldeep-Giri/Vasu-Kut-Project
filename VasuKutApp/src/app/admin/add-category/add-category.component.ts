import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../Models/category.model';
import { CategoryService } from '../services/category.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit(): void {
      this.categoryForm = this.fb.group({
          name: [''],
          parentCategoryId: [null]
      });

      this.loadCategories();
  }

  loadCategories(): void {
      this.categoryService.getCategories().subscribe(data => {
          this.categories = data;
      });
  }

  createCategory(): void {
      if (this.categoryForm.valid) {
          this.categoryService.createCategory(this.categoryForm.value)
              .subscribe(() => {
                  this.categoryForm.reset();
                  this.loadCategories();  // Refresh list
              });
      }
  }
}