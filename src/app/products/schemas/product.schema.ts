import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  // price: z.number().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  // categoryId: z.number().min(1, { message: "Category is required" }),
  // images: z
  //   .array(z.string().url({ message: "Image URL is not valid" }))
  //   .min(1, { message: "At least one image is required" }),
});

export default productSchema;
