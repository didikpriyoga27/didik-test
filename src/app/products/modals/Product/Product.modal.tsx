import ButtonComponent from "@/components/atoms/Button";
import InputComponent from "@/components/atoms/Input";
import ModalComponent from "@/components/atoms/Modal";
import TextAreaComponent from "@/components/atoms/TextArea";
import TypographyComponent from "@/components/atoms/Typography";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryListComponent from "../../components/CategoryList";
import ProductImageUploaderComponent from "../../components/ProductImageUploader";
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
    setValue,
    watch,
  } = useForm<
    z.input<typeof productSchema>,
    unknown,
    z.output<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
    defaultValues: selectedProduct
      ? {
          title: selectedProduct.title,
          price: String(selectedProduct.price),
          description: selectedProduct.description,
          categoryId: String(selectedProduct.category.id),
          uploadedImages: selectedProduct.images,
        }
      : undefined,
  });

  const { t } = useTranslationHook();
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
        images: watch("uploadedImages"),
      };

      console.log(dataSubmit);
      if (selectedProduct) {
        return handleUpdateProduct(dataSubmit);
      }
      return handleCreateProduct(dataSubmit);
    },
    [handleCreateProduct, handleUpdateProduct, selectedProduct, watch]
  );

  console.log(errors);

  return (
    <ModalComponent>
      <div className="flex justify-between items-center mb-2">
        <TypographyComponent as="h2" className="text-lg font-bold">
          {selectedProduct
            ? t("products:editProduct")
            : t("products:addProduct")}
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-y-auto max-h-[calc(100vh-200px)] pr-4"
      >
        <TypographyComponent as="label">
          {t("products:title")}:
          <InputComponent
            type="text"
            {...register("title")}
            className="block w-full bg-transparent my-2 p-2 border rounded"
            placeholder={t("products:input") + " " + t("products:title")}
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
          {t("products:price")}:
          <InputComponent
            type="number"
            {...register("price")}
            className="block w-full bg-transparent my-2 p-2 border rounded"
            placeholder={t("products:input") + " " + t("products:price")}
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
          {t("products:description")}:
          <TextAreaComponent
            {...register("description")}
            className="block w-full bg-transparent my-2 p-2 border rounded"
            placeholder={t("products:input") + " " + t("products:description")}
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
        <ProductImageUploaderComponent
          register={register}
          errors={errors}
          setValue={setValue}
          defaultValue={selectedProduct?.images[0]}
        />
        <div className="flex justify-end w-full mt-4">
          <ButtonComponent variant="success" onClick={handleSubmit(onSubmit)}>
            Submit
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>
  );
};

export default ProductModal;
