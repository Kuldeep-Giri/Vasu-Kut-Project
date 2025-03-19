export interface Category {
    id: number;
    name: string;
    parentCategoryId?: number;
    subCategories?: Category[];
}
export interface CategoryResponseModel {
    categoryId: number;
    categoryPath: string;
}