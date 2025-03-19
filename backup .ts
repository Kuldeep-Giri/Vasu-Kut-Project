import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryResponseModel } from '../../Models/category.model';
import { CategoryService } from '../../services/category.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { QuillModule } from 'ngx-quill';
import { ProductCreateRequest } from '../../Models/product.model';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-list',
   imports: [CommonModule,FormsModule,ReactiveFormsModule,QuillModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  productForm!: FormGroup;
  
  categories1 = []; // Fill from API if needed
  
   SelectedCategory = new FormControl('');
  categories: CategoryResponseModel[] = [];
    loading = false;
    previewImages: string[] = [];
    imageErrors: string[] = [];
    
    onImageSelect(event: any, index: number) {
      const file = event.target.files[0];
      if (!file) return;
    
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.imageErrors[index] = "Only JPG, PNG, and GIF files are allowed.";
        this.productImages.at(index).setErrors({ invalidType: true });  // ❌ Set error in FormControl
        return;
      }
    
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.imageErrors[index] = "File size must be less than 5MB.";
        this.productImages.at(index).setErrors({ invalidSize: true });  // ❌ Set error in FormControl
        return;
      }
    
      this.imageErrors[index] = ""; // Clear error message if valid
      this.productImages.at(index).setErrors(null); // ✅ Clear previous validation errors
    
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages[index] = e.target.result;
        this.productImages.at(index).setValue(file);  // ✅ Ensure FormArray updates
      };
      reader.readAsDataURL(file);
    }
  productGroups = ['Group A', 'Group B', 'Group C'];

  constructor(private fb: FormBuilder, private categoryService: CategoryService,private productService: ProductService) {}
// Custom Validator Function
quillRequiredValidator(control: FormControl) {
  const value = control.value?.replace(/<(.|\n)*?>/g, '').trim(); // Remove HTML tags and trim whitespace
  return value ? null : { required: true };
}
  ngOnInit(): void {
      this.productForm = this.fb.group({
          industry: ['', Validators.required],
          categoryId: [''],
          name: ['', [Validators.required, Validators.maxLength(100)]],
          productGroup: ['', Validators.required],
          description: ['', [Validators.required, this.quillRequiredValidator]],
          keywords: ['', Validators.required],
          packagingDetails: [''],
          MinPricePerUnit: ['', Validators.required],
          MaxPricePerUnit: ['', Validators.required],
          Unit: ['', Validators.required],
          MinimumOrderQuantity: ['', Validators.required],
          TotalProductQuantity: ['', Validators.required],
          NearestPort: ['', Validators.required],
          DispatchDays: ['', Validators.required],
          showcaseStatus: ['No', Validators.required],
          productVideo: [null],
          productImages: this.fb.array([], Validators.required),  // ✅ Fix FormArray
          specifications: this.fb.array([], Validators.required),
          priceRanges: this.fb.array([
            this.fb.group({
              minQuantity: ['', Validators.required],
              maxQuantity: ['', Validators.required],
              price: ['', Validators.required]
            })
          ])
        });

      this.addAttribute(); // Add one default attribute
      this.addPriceRange(); // Add one default price range
      this.productImages.clear();  // Clear the existing FormArray
// for (let i = 0; i < 5; i++) {
//   this.productImages.push(this.fb.control(null, Validators.required));
// }
      this.productForm.get('industry')?.valueChanges.pipe(
          debounceTime(300),
          switchMap(keyword => this.categoryService.searchCategories(keyword))
      ).subscribe(categories => this.categories = categories);
      this.initializeImageFields(); // Create 5 file inputs

  }
  initializeImageFields() {
    for (let i = 0; i < 5; i++) {
      this.productImages.push(this.fb.control(null, Validators.required));
    }
  }
  get productImages(): FormArray {
      return this.productForm.get('productImages') as FormArray;
  }

  fieldInvalid(field: string, index: number = -1): boolean {
    if (index >= 0) {
      const formArray = this.productForm.get(field) as FormArray;
      return !!(formArray?.at(index)?.invalid && formArray?.at(index)?.touched);
    }
    return !!(this.productForm.get(field)?.invalid && this.productForm.get(field)?.touched);
  }
  selectCategory(category: CategoryResponseModel) {

      this.productForm.patchValue({ industry: category.categoryPath });
      
      this.productForm.patchValue({ categoryId: category.categoryId });
  }

  get attributes(): FormArray {
    return this.productForm.get('specifications') as FormArray;
  }

  // Getter for priceRanges
get priceRanges(): FormArray {
  return this.productForm.get('priceRanges') as FormArray;
}

// Function to add a new price range
addPriceRange(): void {
  const priceGroup = this.fb.group({
    minQuantity: ['', Validators.required],
    maxQuantity: ['', Validators.required],
    price: ['', Validators.required]
  });

  this.priceRanges.push(priceGroup);
}
  // get productImages(): FormArray {
  //   return this.productForm.get('productImages') as FormArray;
  // }

  addAttribute(): void {
    const attributeGroup = this.fb.group({
      label: ['', Validators.required], // FormControl for label
      value: ['', Validators.required]  // FormControl for value
    });
  
    this.attributes.push(attributeGroup);
  }

  removeAttribute(index: number): void {
    if (this.attributes.length > 1) { // Prevent removing if only one attribute remains
      this.attributes.removeAt(index);
    }
  }

  
  removePriceRange(index: number): void {
    if (this.attributes.length > 1) { // Prevent removing if only one attribute remains
   
    this.priceRanges.removeAt(index);
    }
  }


  // onImageSelect(event: any, index: number): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.productImages.at(index).setValue(file);
  //   }
  // }

  onVideoSelect(event: any): void {
    const file = event.target.files[0];
    
    if (file && file.type === 'video/mp4' && file.size <= 10 * 1024 * 1024) {
        this.productForm.patchValue({ productVideo: file }); // ✅ Store in FormControl
    } else {
        console.error('Invalid video file');
        this.productForm.patchValue({ productVideo: null }); // Reset if invalid
    }
}

  submitProduct(): void {
    // if (this.productForm.invalid) {
    //   alert("Please fill all required fields.");
    //   return;
    // }

    // const formData = new FormData();
    // const productData: ProductCreateRequest = this.productForm.value;

    // // Append text data
    // (Object.keys(productData) as Array<keyof ProductCreateRequest>).forEach((key) => {
    //   const value = productData[key];
    
    //   if (value !== undefined && value !== null) { // ✅ Prevents undefined or null values
    //     if (Array.isArray(value)) {
    //       value.forEach((item) => {
    //         formData.append(`${key}[]`, typeof item === 'object' ? JSON.stringify(item) : item);
    //       });
    //     } else {
    //       formData.append(key, value.toString());
    //     }
    //   }
    // });

    // // Append Images
    // const imagesArray = this.productForm.get('productImages')?.value; // Ensure it's an array
    // if (imagesArray && Array.isArray(imagesArray)) {
    //   imagesArray.forEach((file: File, index: number) => {
    //     if (file instanceof File) {
    //       formData.append('productImages', file); // Ensure files are appended properly
    //     } else {
    //       console.warn(`Skipping non-file entry in productImages at index ${index}`);
    //     }
    //   });
    // }

    const formData = new FormData();
    const productData: ProductCreateRequest = this.productForm.value;

    // Append simple form fields
    Object.keys(productData).forEach((key) => {
        const value = productData[key as keyof ProductCreateRequest];
       if(key!="productImages" && key!="productGroup" && key!="productVideo"){
        if (value !== undefined && value !== null) {
            if (Array.isArray(value) && typeof value[0] === 'object') {
                formData.append(key, JSON.stringify(value)); // Properly format arrays of objects
            } else if (Array.isArray(value)) {
                value.forEach((item) => formData.append(`${key}[]`, item.toString()));
            } else {
                formData.append(key, value.toString());
            }
          }
        }
    });

    // Append images
    const imagesArray = this.productForm.get('productImages')?.value;
    if (imagesArray && Array.isArray(imagesArray)) {
        imagesArray.forEach((file: File, index: number) => {
            if (file instanceof File) {
                formData.append(`productImages[${index}]`, file);
            }
        });
    }

    // Append video if available
    const videoFile = this.productForm.get('productVideo')?.value;
    if (videoFile instanceof File) {
        formData.append('productVideo', videoFile);
    } else {
        console.warn("No valid video file selected.");
    }

  
    console.log("Final FormData:", Array.from(formData.entries()));

    alert("console printed");
    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        alert('Product added successfully!');
     //   this.productForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add product.');
      }
    });
  }
}
//   onSubmit(): void {
//     if (this.productForm.valid) {
//       console.log('Form Submitted:', this.productForm.value);
//     } else {
//       this.productForm.markAllAsTouched();
//     }
//   }
// }