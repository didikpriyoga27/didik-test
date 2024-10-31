"use client";

import ButtonComponent from "@/components/atoms/Button";
import TitleComponent from "@/components/atoms/Title";
import TypographyComponent from "@/components/atoms/Typography";
import useTranslationHook from "@/i18n/useTranslation.hook";
import Lottie from "lottie-react";
import useCartListHook from "../../hooks/useCartList.hook";
import CartItemComponent from "../CartItem";
import emptyCartAnimation from "./empty_cart.json";

/**
 * A component that renders a list of items in the cart.
 *
 * The component displays a title, "Cart", and a list of items in the cart.
 * If the cart is empty, the component displays a message, "Your cart is empty",
 * and a button, "Go to Products", which navigates to the products page.
 *
 * @returns {JSX.Element} A JSX element representing the cart list component.
 */
const CartListComponent = (): JSX.Element => {
  const { data } = useCartListHook();
  const { t } = useTranslationHook();

  return (
    <section className="w-11/12 mx-auto space-y-4">
      <TitleComponent>{t("commons:cart")}</TitleComponent>
      {data.length === 0 ? (
        <div className="items-center flex flex-col space-y-4">
          <Lottie
            animationData={emptyCartAnimation}
            className="flex justify-center items-center"
            loop={true}
          />
          <TypographyComponent>{t("cart:empty")}</TypographyComponent>
          <ButtonComponent onClick={() => (window.location.href = "/products")}>
            {t("cart:goToProducts")}
          </ButtonComponent>
        </div>
      ) : (
        <div className="space-y-2">
          {data.map((item) => (
            <CartItemComponent key={item.product.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CartListComponent;
