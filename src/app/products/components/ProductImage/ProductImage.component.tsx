/* eslint-disable @next/next/no-img-element */

import { IProductImageComponentProps } from "./type";

const ProductImageComponent = ({ info }: IProductImageComponentProps) => {
  return (
    <img
      src={info.getValue()[0]}
      alt="product image"
      className="w-40 h-40 object-cover rounded-md"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/default.png";
      }}
      width="auto"
      height="auto"
    />
  );
};

export default ProductImageComponent;
