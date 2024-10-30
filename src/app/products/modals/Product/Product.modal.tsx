import ButtonComponent from "@/components/atoms/Button";
import InputComponent from "@/components/atoms/Input";
import TextAreaComponent from "@/components/atoms/TextArea/TextArea.component";
import TypographyComponent from "@/components/atoms/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "../../schemas";
import { IProductModalProps } from "./type";

const ProductModal = ({ setIsShowProductModal }: IProductModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = () => {};

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
