export interface ProductCreateRequest {
    name: string;
    description: string;
    keywords: string;
    packagingDetails: string;
    minimumOrderQuantity: number;
    totalProductQuantity: number;
    nearestPort: string;
    dispatchDays: number;
    minPricePerUnit: number;
    maxPricePerUnit: number;
    unit: string;
    categoryId: number;
    specifications: SpecificationRequest[];
    priceRanges: PriceRangeRequest[];
    productImages?: File[];   // Angular uses `File` instead of `IFormFile`
    productVideo?: File;
    sellerId:string;
    showcaseStatus:boolean;
    isDeleted:boolean;
    isApproved:boolean;

  }
  
  export interface IProductResponse {
    id: number;
    name: string;
    description: string;
    keywords: string;
    packagingDetails: string;
    minimumOrderQuantity: number;
    totalProductQuantity: number;
    nearestPort: string;
    dispatchDays: number;
    minPricePerUnit: number;
    maxPricePerUnit: number;
    unit: string;
    categoryId: number;
    sellerId?: number | null;
    showcaseStatus: boolean;
    isDeleted: boolean;
    isApproved: boolean;
    specifications: SpecificationRequest[];
    priceRanges: PriceRangeRequest[];
    productVideoUrl: string;
    productImageUrls: string[];
    createdAt: string;
  }
  export interface SpecificationRequest {
    name: string;
    value: string;
  }
  
  export interface PriceRangeRequest {
    minimumQuantity: number;
    maximumQuantity: number;
    pricePerUnit: number;
  }
  