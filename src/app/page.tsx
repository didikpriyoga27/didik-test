import { ReactElement } from "react";
import HeaderComponent from "../components/organisms/Header";
import ProductListComponent from "./products/components/ProductList";

/**
 * The root component of the app.
 *
 * It renders the main layout of the app, which consists of a header and a list of products.
 *
 * @returns {ReactElement} A JSX element representing the root component.
 */
export default function Home(): ReactElement {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <HeaderComponent />
      <ProductListComponent />
    </div>
  );
}
