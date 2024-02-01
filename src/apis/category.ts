import baseClient from "@/configs/baseClient";
import {
  BaseListResponse,
  CategoryListItem,
  CreateCategoryPayload,
} from "@/interface/category";

const url = "/category";

export const getCategoryListApi = () =>
  baseClient.get<BaseListResponse<CategoryListItem[]>>(url);

export const createCategoryApi = (payload: CreateCategoryPayload) =>
  baseClient.post(url, payload);
