import HeaderComponent from "@/components/organisms/Header";
import { ReactElement } from "react";
import ProductHeaderComponent from "./components/ProductHeader";
import ProductListComponent from "./components/ProductList";

/**
 * A component that renders a page with a header, a product header and a product list.
 *
 * The component renders a grid with three rows. The first row contains the header,
 * the second row contains the product header and the third row contains the product list.
 *
 * @returns {ReactElement} A JSX element representing the products page.
 */
const Products = (): ReactElement => {
  return (
    <div>
      <HeaderComponent />
      <ProductHeaderComponent />
      <ProductListComponent />
    </div>
  );
};

export default Products;
