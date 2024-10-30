import ButtonComponent from "@/components/atoms/Button";
import InputComponent from "@/components/atoms/Input";
import TextAreaComponent from "@/components/atoms/TextArea";
import TypographyComponent from "@/components/atoms/Typography";
import ModalComponent from "@/components/organisms/Modal";
import useToastHook from "@/hooks/useToast.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryListComponent from "../../components/CategoryList";
import useMutationProductHook from "../../hooks/useMutationProduct.hook";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";
import { productSchema } from "../../schemas";
import { CreateProductParams } from "../../type";
import { IProductModalProps } from "./type";

/**
 * A modal component for adding or editing a product.
 *
 * The component displays a form with input fields for title, price, and description.
 * When the form is submitted, it triggers a mutation to create or update a product.
 * It also shows a success or error message based on the outcome.
 * It also updates the product list by invalidating the relevant query.
 *
 * @param {IProductModalProps} props - The props for the modal component.
 * @returns {JSX.Element} A JSX element representing the add product modal.
 */
const ProductModal = ({
  selectedProduct,
  setIsShowProductModal,
}: IProductModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<
    z.input<typeof productSchema>,
    unknown,
    z.output<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
    defaultValues: selectedProduct
      ? {
          title: selectedProduct.title,
          price: selectedProduct.price,
          description: selectedProduct.description,
          categoryId: selectedProduct.category.id,
        }
      : undefined,
  });

  const { mutateCreateProduct, mutateUpdateProduct } = useMutationProductHook();
  const { refetch } = useQueryProductsHook();
  const { successMessage, errorMessage } = useToastHook();

  const handleUpdateProduct = useCallback(
    (dataSubmit: CreateProductParams) => {
      mutateUpdateProduct({ data: dataSubmit, id: selectedProduct!.id })
        .then(() => {
          setIsShowProductModal(false);
          refetch();
          successMessage("Product updated successfully");
        })
        .catch(() => {
          setIsShowProductModal(false);
          errorMessage("Failed to update product");
        });
    },
    [
      errorMessage,
      mutateUpdateProduct,
      refetch,
      selectedProduct,
      setIsShowProductModal,
      successMessage,
    ]
  );

  const handleCreateProduct = useCallback(
    (dataSubmit: CreateProductParams) => {
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

  const onSubmit = useCallback(
    (data: z.output<typeof productSchema>) => {
      const dataSubmit: CreateProductParams = {
        ...data,
        images: ["https://placeimg.com/640/480/any"],
      };
      if (selectedProduct) {
        return handleUpdateProduct(dataSubmit);
      }
      return handleCreateProduct(dataSubmit);
    },
    [handleCreateProduct, handleUpdateProduct, selectedProduct]
  );

  return (
    <ModalComponent>
      <div className="flex justify-between items-center mb-2">
        <TypographyComponent as="h2" className="text-lg font-bold">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </TypographyComponent>
        <ButtonComponent
          onClick={() => {
            reset();
            setIsShowProductModal(false);
          }}
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
        <CategoryListComponent
          register={register}
          errors={errors}
          defaultValue={selectedProduct?.category.id}
        />
        <div className="flex justify-end w-full mt-4">
          <ButtonComponent type="submit">Submit</ButtonComponent>
        </div>
      </form>
    </ModalComponent>
  );
};

export default ProductModal;
