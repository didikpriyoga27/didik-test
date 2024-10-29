import HeaderComponent from "@/components/organisms/Header";
import { ReactElement, Suspense } from "react";
import ProductHeaderComponent from "./components/ProductHeader";
import ProductListComponent from "./components/ProductList";

/**
 * A component that renders the products page.
 *
 * The component renders a header, a product header component (with a title and an "Add Product" button),
 * and a product list component wrapped in a suspense fallback.
 *
 * @returns {JSX.Element} A JSX element representing the products page.
 */
const Products = (): ReactElement => {
  return (
    <div className="min-h-screen bg-background dark:bg-foreground py-4">
      <HeaderComponent />
      <ProductHeaderComponent />
      <Suspense>
        <ProductListComponent />
      </Suspense>
    </div>
  );
};

export default Products;
