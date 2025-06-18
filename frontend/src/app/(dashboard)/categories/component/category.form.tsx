"use client";
import { CustomInput, CustomSelect } from "@/components/custom-forms-fields";
import { Button } from "@/components/ui/button";
import { createCategories } from "@/services/categories.service";
import { GoogleScrapperOptionSize } from "@/utils/constants/index.constants";
import {
  CreateCategoryFormSchema,
  CreateCategorySchema,
} from "@/utils/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CategoryForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateCategorySchema),
  });
  const { mutate } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategories,
  });
  const queryClient = useQueryClient();
  const onSubmit = (data: CreateCategoryFormSchema) => {
    mutate(data, {
      onSuccess: ({ data, status }) => {
        if ([200, 201].includes(status)) toast.success(data.message);
        else toast.error(data.message);
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        //   @ts-ignore TODO: Fix control
        control={control}
        placeholder="Category Name"
        name="name"
        inputType="text"
        label="Category Name"
        error=""
      />

      <Button className="mt-4">Submit</Button>
    </form>
  );
};
export { CategoryForm };
