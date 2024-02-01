import { FileInterface } from "./file";

export interface BaseListResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface CreateCategoryPayload {
  title: string;
  description: string;
  slug: string;
  feature_image: string;
}

export interface CreateCategoryFormValue
  extends Omit<CreateCategoryPayload, "feature_image"> {
  feature_image: FileInterface[];
}

export interface CategoryListItem {
  _id: string;
  title: string;
  description: string;
  slug: string;
  feature_image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
