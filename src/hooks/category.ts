import { createCategoryApi, getCategoryListApi } from "@/apis/category";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createCategoryApi, {
    onSuccess: () => queryClient.invalidateQueries("CATEGORY_LIST"),
  });
};

export const useGetCategoryList = () =>
  useQuery({
    queryKey: ["CATEGORY_LIST"],
    queryFn: () => getCategoryListApi(),
    select: (res) => res.data.data,
  });
