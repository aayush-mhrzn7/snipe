import { z } from "zod";

//   /google_query, no_of_links
const GoogleScrapperSchema = z.object({
  google_query: z.string().min(1, { message: "Please enter a query" }),
  no_of_links: z.string().min(1, { message: "Please enter a number" }),
});
type GoogleScrapperFormSchema = z.infer<typeof GoogleScrapperSchema>;
export { GoogleScrapperSchema };
export type { GoogleScrapperFormSchema };
