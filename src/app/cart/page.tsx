import HeaderComponent from "@/components/organisms/Header";
import { ReactElement } from "react";
import CartFooterComponent from "./components/CartFooter";
import CartListComponent from "./components/CartList";

/**
 * A component that renders the cart page.
 *
 * The component includes a header, a list of items in the cart, and a footer with the total and checkout button.
 *
 * @returns {JSX.Element} A JSX element representing the cart page.
 */
const Cart = (): ReactElement => {
  return (
    <div className="min-h-screen bg-background dark:bg-foreground py-4">
      <HeaderComponent hiddenComponent={["search", "cart"]} />
      <CartListComponent />
      <CartFooterComponent />
    </div>
  );
};

export default Cart;
