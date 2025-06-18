import { z } from "zod";

const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
});
type CreateCategoryFormSchema = z.infer<typeof CreateCategorySchema>;
export { CreateCategorySchema };
export type { CreateCategoryFormSchema };
