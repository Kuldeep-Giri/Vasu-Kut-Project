import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryResponseModel } from '../../Models/category.model';
import { CategoryService } from '../../services/category.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { QuillModule } from 'ngx-quill';
import { IProductResponse, ProductCreateRequest } from '../../Models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories1 = []; // Fill from API if needed
  SelectedCategory!: FormControl; // Moved initialization to ngOnInit()
  categories: CategoryResponseModel[] = [];
  loading = false;
  previewImages: string[] = [];
  imageErrors: string[] = [];
  productGroups = ['Group A', 'Group B', 'Group C'];
  productId: string | null = null;

  product: IProductResponse | null = null;
  imageCount=0;
   baseUrl=environment.apiBaseUrl.replace('/api','');
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
    ,private route: ActivatedRoute
  ) {}

  // Custom Validator Function
  quillRequiredValidator(control: FormControl) {
    const value = control.value?.replace(/<(.|\n)*?>/g, '').trim(); // Remove HTML tags and trim whitespace
    return value ? null : { required: true };
  }

  ngOnInit(): void {
   
    this.productId = this.route.snapshot.paramMap.get('id');


    this.SelectedCategory = this.fb.control(''); // ✅ Moved initialization to avoid 'fb used before initialization' error

    this.productForm = this.fb.group({
      industry: ['', Validators.required],
      categoryId: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      productGroup: ['', Validators.required],
      description: ['', [Validators.required, this.quillRequiredValidator]],
      keywords: ['', Validators.required],
      packagingDetails: [''],
      minPricePerUnit: ['', Validators.required],
      maxPricePerUnit: ['', Validators.required],
      unit: ['', Validators.required],
      minimumOrderQuantity: ['', Validators.required],
      totalProductQuantity: ['', Validators.required],
      nearestPort: ['', Validators.required],
      dispatchDays: ['', Validators.required],
      showcaseStatus: [true, Validators.required],
      productVideo: [null],
      productImages: this.fb.array([], Validators.required),
      specifications: this.fb.array([], Validators.required),
      priceRanges: this.fb.array([
        this.fb.group({
          minimumQuantity: ['', Validators.required],
          maximumQuantity: ['', Validators.required],
          pricePerUnit: ['', Validators.required]
        })
      ])
    });
       
    this.addAttribute(); // Add one default attribute
    this.addPriceRange(); // Add one default price range
    this.productImages.clear();
    
    this.productForm.get('industry')?.valueChanges.pipe(
      debounceTime(300),
      switchMap(keyword => this.categoryService.searchCategories(keyword))
    ).subscribe(categories => this.categories = categories);

    if (this.productId) {
      this.productService.getProductById(Number(this.productId)).subscribe((data) => {
          this.productForm.patchValue(data);
console.log(this.productForm);
 var category=this.categoryService.getCategoriesById(data.categoryId).subscribe(categorie =>
  
  this.selectCategory(categorie)

);;
        // Set specifications
        data.specifications.forEach((spec: any) => {
          this.attributes.push(
            this.fb.group({
              name: [spec.name, Validators.required],
              value: [spec.value, Validators.required]
            })
          );
        });
         
        // Set price ranges
        data.priceRanges.forEach((range: any) => {
          this.priceRanges.push(
            this.fb.group({
              minimumQuantity: [range.minimumQuantity, Validators.required],
              maximumQuantity: [range.maximumQuantity, Validators.required],
              pricePerUnit: [range.pricePerUnit, Validators.required]
            })
          );
        });

        // Set images
        this.productImages.clear();
        data.productImageUrls.forEach((image: any, index: number) => {
          this.productImages.push(this.fb.control(image, Validators.required));
          this.previewImages[index] = this.baseUrl+image; // If images are URLs
          this.imageCount++;

        });
        this.initializeImageFields(this.imageCount);

      });
    }
    this.productImages.clear();
    this.initializeImageFields(this.imageCount);

    
  }
  initializeImageFields(i:number) {
    console.log(i);
    for (; i < 5; i++) {
      this.productImages.push(this.fb.control(null, Validators.required));
    }
  }

  get productImages(): FormArray {
    return this.productForm.get('productImages') as FormArray;
  }

  fieldInvalid(field: string, index: number = -1): boolean {
    const formArray = this.productForm.get(field);
    
    if (index >= 0 && formArray instanceof FormArray) {
      return !!(formArray.at(index)?.invalid && formArray.at(index)?.touched);
    }
    return false;
  }
  selectCategory(category: CategoryResponseModel) {
    this.productForm.patchValue({ industry: category.categoryPath, categoryId: category.categoryId });
  }

  get attributes(): FormArray {
    return this.productForm.get('specifications') as FormArray;
  }

  get priceRanges(): FormArray {
    return this.productForm.get('priceRanges') as FormArray;
  }

  addPriceRange(): void {
    const priceGroup = this.fb.group({
      minimumQuantity: ['', Validators.required],
      maximumQuantity: ['', Validators.required],
      pricePerUnit: ['', Validators.required]
    });
    this.priceRanges.push(priceGroup);
  }

  addAttribute(): void {
    const attributeGroup = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.attributes.push(attributeGroup);
  }

  removeAttribute(index: number): void {
    if (this.attributes.length > 1) {
      this.attributes.removeAt(index);
    }
  }

  removePriceRange(index: number): void {
    if (this.priceRanges.length > 1) {
      this.priceRanges.removeAt(index);
    }
  }

  onImageSelect(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.imageErrors[index] = "Only JPG, PNG, and GIF files are allowed.";
      this.productImages.at(index).setErrors({ invalidType: true });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.imageErrors[index] = "File size must be less than 5MB.";
      this.productImages.at(index).setErrors({ invalidSize: true });
      return;
    }

    this.imageErrors[index] = "";
    this.productImages.at(index).setErrors(null);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewImages[index] = e.target.result;
      this.productImages.at(index).setValue(file);
    };
    reader.readAsDataURL(file);
  }

  onVideoSelect(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4' && file.size <= 10 * 1024 * 1024) {
      this.productForm.patchValue({ productVideo: file });
    } else {
      console.error('Invalid video file');
      this.productForm.patchValue({ productVideo: null });
    }
  }

  submitProduct(): void {
    // if (this.productForm.invalid) {
    //   alert("Please fill all required fields.");
    //   return;
    // }
  
    const formData = new FormData();
    const productData: ProductCreateRequest = this.productForm.value;
  // append sellerid

  var sellerid=localStorage.getItem('LoggedInUserId');
  if(sellerid==null){
    sellerid="0";
  }
   productData.sellerId=sellerid;

   productData.isApproved=false;

   productData.isDeleted=false;
    // Append simple fields (excluding files, specifications, priceRanges)
    Object.keys(productData).forEach((key) => {
      const value = productData[key as keyof ProductCreateRequest];
      if (key !== "productImages" && key !== "productVideo" && key !== "specifications" && key !== "priceRanges") {  
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      }
    });
  
    // ✅ Append Specifications
    if (productData.specifications?.length) {
      productData.specifications.forEach((spec, index) => {
        formData.append(`specifications[${index}][name]`, spec.name);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    }
  
    // ✅ Append Price Ranges
    if (productData.priceRanges?.length) {
      productData.priceRanges.forEach((price, index) => {
        formData.append(`priceRanges[${index}][MinimumQuantity]`,String(price.minimumQuantity));
        formData.append(`priceRanges[${index}][MaximumQuantity]`, String(price.maximumQuantity));
        formData.append(`priceRanges[${index}][PricePerUnit]`, String(price.pricePerUnit));
      });
    }
  
    // ✅ Append Images
  const imagesArray = this.productForm.get("productImages")?.value;
  if (imagesArray && Array.isArray(imagesArray)) {
    imagesArray.forEach((file: File, index: number) => {
      if (file instanceof File) {
        formData.append(`productImages`, file); // Try []
        // formData.append(`productImages[${index}]`, file); // Or try indexed format
      }
    });
  }

  // ✅ Append Video
  const videoFile = this.productForm.get("productVideo")?.value;
  if (videoFile instanceof File) {
    formData.append("productVideo", videoFile);
  }

    // Debugging
    console.log("Final FormData:", Array.from(formData.entries()));
  
    // Submit

    if (this.productId) {
      // Update Product API
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => alert('Product updated successfully!'),
        error: (err: any) => console.error('Update Error:', err)
      });;;;
    }
    else{
    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        alert("Product added successfully!");
      },
      error: (err) => {
        console.error("Upload Error:", err);
        alert("Failed to add product.");
      },
    });
  }
}
  
}
