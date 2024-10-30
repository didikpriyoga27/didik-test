import ButtonComponent from "@/components/atoms/Button";
import InputComponent from "@/components/atoms/Input";
import TextAreaComponent from "@/components/atoms/TextArea/TextArea.component";
import TypographyComponent from "@/components/atoms/Typography";
import useToastHook from "@/hooks/useToast.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useMutationProductHook from "../../hooks/useMutationProduct.hook";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";
import { productSchema } from "../../schemas";
import { CreateProductParams } from "../../type";
import { IProductModalProps } from "./type";

/**
 * A modal component for adding a new product.
 *
 * The component renders a modal with a form that takes the title, price, and description of the product.
 * The form is validated using Zod.
 * When the form is submitted, the component sends a POST request to the API to create a new product.
 * If the request is successful, the component closes the modal and refetches the list of products.
 * If the request fails, the component displays an error message.
 *
 * @param {IProductModalProps} props
 * @returns {JSX.Element}
 */
const ProductModal = ({
  setIsShowProductModal,
}: IProductModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    z.input<typeof productSchema>,
    unknown,
    z.output<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
  });
  const { mutateCreateProduct } = useMutationProductHook();
  const { refetch } = useQueryProductsHook();
  const { successMessage, errorMessage } = useToastHook();

  const onSubmit = useCallback(
    (data: z.output<typeof productSchema>) => {
      const dataSubmit: CreateProductParams = {
        ...data,
        categoryId: 1,
        images: ["https://placeimg.com/640/480/any"],
      };

      mutateCreateProduct(dataSubmit)
        .then(() => {
          setIsShowProductModal(false);
          refetch();
          successMessage("Product created successfully");
        })
        .catch(() => {
          setIsShowProductModal(false);
          errorMessage("Failed to create product");
        });
    },
    [
      errorMessage,
      mutateCreateProduct,
      refetch,
      setIsShowProductModal,
      successMessage,
    ]
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background dark:bg-foreground p-6 rounded-md shadow-md min-w-[300px] md:min-w-[500px]">
        <div className="flex justify-between items-center mb-2">
          <TypographyComponent as="h2" className="text-lg font-bold">
            Add Product
          </TypographyComponent>
          <ButtonComponent
            onClick={() => setIsShowProductModal(false)}
            className="text-xl font-bold text-black dark:text-white"
          >
            &times;
          </ButtonComponent>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TypographyComponent as="label">
            Title:
            <InputComponent
              type="text"
              {...register("title")}
              className="block w-full my-2 p-2 border rounded"
              placeholder="Input Title"
            />
            {errors.title && (
              <TypographyComponent
                as="p"
                className="text-red-500 dark:text-red-500 mb-2"
              >
                {errors.title.message as string}
              </TypographyComponent>
            )}
          </TypographyComponent>
          <TypographyComponent as="label">
            Price:
            <InputComponent
              type="number"
              {...register("price")}
              className="block w-full my-2 p-2 border rounded"
              placeholder="Input Price"
            />
            {errors.price && (
              <TypographyComponent
                as="p"
                className="text-red-500 dark:text-red-500 mb-2"
              >
                {errors.price.message as string}
              </TypographyComponent>
            )}
          </TypographyComponent>
          <TypographyComponent as="label">
            Description:
            <TextAreaComponent
              {...register("description")}
              className="block w-full mt-1 p-2 border rounded"
              placeholder="Input Description"
            />
            {errors.description && (
              <TypographyComponent
                as="p"
                className="text-red-500 dark:text-red-500 mb-2"
              >
                {errors.description.message as string}
              </TypographyComponent>
            )}
          </TypographyComponent>
          <div className="flex justify-end w-full mt-4">
            <ButtonComponent type="submit">Submit</ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
