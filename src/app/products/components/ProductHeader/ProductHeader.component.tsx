"use client";

import ButtonComponent from "@/components/atoms/Button";
import TitleComponent from "@/components/atoms/Title";

import { ReactElement, useState } from "react";
import ProductModal from "../../modals/Product";

/**
 * A component that renders the header for the products page.
 *
 * The component displays a title, "Products", and an "Add Product" button.
 * When the "Add Product" button is clicked, a modal for adding or editing a product is displayed.
 *
 * @returns {ReactElement} A JSX element representing the product header.
 */

const ProductHeaderComponent = (): ReactElement => {
  const [isShowProductModal, setIsShowProductModal] = useState(false);

  return (
    <section className="flex justify-between items-center w-11/12 mx-auto">
      <TitleComponent>Products</TitleComponent>
      <ButtonComponent
        variant="info"
        onClick={() => setIsShowProductModal(true)}
      >
        Add Product
      </ButtonComponent>
      {isShowProductModal && (
        <ProductModal setIsShowProductModal={setIsShowProductModal} />
      )}
    </section>
  );
};

export default ProductHeaderComponent;
