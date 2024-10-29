import ButtonComponent from "@/components/atoms/Button";
import TitleComponent from "@/components/atoms/Title";

import { ReactElement } from "react";

const ProductHeaderComponent = (): ReactElement => {
  return (
    <section className="flex justify-between items-center w-11/12 mx-auto">
      <TitleComponent>Products</TitleComponent>
      <ButtonComponent href="/products/add">Add Product</ButtonComponent>
    </section>
  );
};

export default ProductHeaderComponent;
