"use client";

import { useParams } from "next/navigation";
import { ReactElement } from "react";

/**
 * A component that renders the details of a product.
 *
 * The component retrieves the product ID from the URL parameters
 * and displays it in a heading and paragraph.
 *
 * @returns {ReactElement} A JSX element displaying the product details.
 */
const ProductDetails = (): ReactElement => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Product Details</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
