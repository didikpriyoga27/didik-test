"use client";

import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import useToastHook from "@/hooks/useToast.hook";
import { useCartStore } from "@/stores/cart";
import { useCallback } from "react";
import useCartListHook from "../../hooks/useCartList.hook";

/**
 * A component that renders a footer with the total of the items in the cart
 * and a checkout button.
 *
 * The component is only rendered if there are items in the cart.
 *
 * @returns {JSX.Element | null} A JSX element representing the footer component,
 * or null if there are no items in the cart.
 */
const CartFooterComponent = () => {
  const { data } = useCartListHook();
  const { removeAll } = useCartStore();
  const { successMessage } = useToastHook();

  const total = data.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const handleSubmit = useCallback(() => {
    removeAll();
    successMessage(
      "Your purchase has been successfully completed. We will send you an email with the details."
    );
  }, [removeAll, successMessage]);

  if (data.length === 0) {
    return null;
  }

  return (
    <footer className="w-11/12 mx-auto mt-12 flex items-center justify-between">
      <TypographyComponent className="font-bold">
        Total: ${total}
      </TypographyComponent>
      <ButtonComponent variant="success" onClick={handleSubmit}>
        Checkout
      </ButtonComponent>
    </footer>
  );
};

export default CartFooterComponent;
