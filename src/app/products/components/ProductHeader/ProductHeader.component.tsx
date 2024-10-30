"use client";

import ButtonComponent from "@/components/atoms/Button";
import TitleComponent from "@/components/atoms/Title";

import { ReactElement, useState } from "react";
import ProductModal from "../../modals/Product";

const ProductHeaderComponent = (): ReactElement => {
  const [isShowProductModal, setIsShowProductModal] = useState(false);

  return (
    <section className="flex justify-between items-center w-11/12 mx-auto">
      <TitleComponent>Products</TitleComponent>
      <ButtonComponent onClick={() => setIsShowProductModal(true)}>
        Add Product
      </ButtonComponent>
      {isShowProductModal && (
        <ProductModal setIsShowProductModal={setIsShowProductModal} />
      )}
    </section>
  );
};

export default ProductHeaderComponent;
