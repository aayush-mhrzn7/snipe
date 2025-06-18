import { CreateCategoryFormSchema } from "@/utils/schema/category.schema";
import { axiosInstance, getBody } from "./api.service";

export const getCategories = async () => {
  const response = await axiosInstance.get("/category");
  return response;
};
export const createCategories = async (data: CreateCategoryFormSchema) => {
  const response = await axiosInstance.post("/create-category/", getBody(data));
  return response;
};
export const deleteCategories = async (id: string) => {
  const response = await axiosInstance.delete("/category/" + id);
  return response;
};
