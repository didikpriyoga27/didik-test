"use client";
/* eslint-disable @next/next/no-img-element */

import { ICartImageComponentProps } from "./type";

/**
 * A component that renders a product image.
 *
 * The component displays an image with a specified source URL.
 * If the image fails to load, a default image is displayed instead.
 *
 * @param {ICartImageComponentProps} props - The props for the component.
 * @param {string} props.src - The source URL of the image to display.
 *
 * @returns {JSX.Element} A JSX element representing the product image.
 */
const CartImageComponent = ({ src }: ICartImageComponentProps): JSX.Element => {
  return (
    <img
      src={src}
      alt="product image"
      className="w-20 h-20 object-cover rounded-md"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/default.png";
      }}
      width="auto"
      height="auto"
    />
  );
};

export default CartImageComponent;
