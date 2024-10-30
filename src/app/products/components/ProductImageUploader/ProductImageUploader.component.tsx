/* eslint-disable @next/next/no-img-element */
import InputComponent from "@/components/atoms/Input";
import TypographyComponent from "@/components/atoms/Typography";
import useParseImageStringHook from "@/hooks/useParseImageString.hook";
import axios from "axios";
import { useCallback, useState } from "react";
import { IProductImageUploaderComponentProps } from "./type";

const ProductImageUploaderComponent = ({
  register,
  errors,
  setValue,
  defaultValue = null,
}: IProductImageUploaderComponentProps) => {
  const { parseImageString } = useParseImageStringHook();
  const parsedDefaultValue = parseImageString(defaultValue || "");

  const [previewImage, setPreviewImage] = useState<string | null>(
    parsedDefaultValue || ""
  );

  const uploadImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.[0];
      if (!image) return;

      const formData = new FormData();
      formData.append("file", image, image.name);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.location) {
        setPreviewImage(response.data.location);
        setValue("uploadedImages", [response.data.location]);
        if (errors.images) {
          delete errors.images;
        }
      }
    },
    [errors.images, setValue]
  );

  return (
    <>
      <TypographyComponent as="label">
        Image:
        <InputComponent
          type="file"
          {...register("images")}
          className="block w-full bg-transparent my-2 p-2 border rounded"
          placeholder="Input Image"
          accept="image/*"
          onChange={(e) => {
            register("images").onChange(e);
            uploadImage(e);
          }}
        />
        {errors.uploadedImages && (
          <TypographyComponent
            as="p"
            className="text-red-500 dark:text-red-500 mb-2"
          >
            {errors.uploadedImages.message as string}
          </TypographyComponent>
        )}
      </TypographyComponent>
      {previewImage && (
        <img
          src={previewImage}
          alt="preview image"
          className="w-24 h-24 object-cover rounded-md mt-2"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/default.png";
          }}
        />
      )}
    </>
  );
};

export default ProductImageUploaderComponent;
