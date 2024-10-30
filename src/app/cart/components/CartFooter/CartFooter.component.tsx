"use client";

import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import useToastHook from "@/hooks/useToast.hook";
import { useCartStore } from "@/stores/cart";
import { useCallback } from "react";
import useCartListHook from "../../hooks/useCartList.hook";

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
    <footer className="w-1/2 mx-auto mt-12 flex items-center justify-between">
      <TypographyComponent className="font-bold">
        Total: ${total}
      </TypographyComponent>
      <ButtonComponent onClick={handleSubmit}>Checkout</ButtonComponent>
    </footer>
  );
};

export default CartFooterComponent;
