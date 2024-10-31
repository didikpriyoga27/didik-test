"use client";

import ButtonComponent from "@/components/atoms/Button";
import TitleComponent from "@/components/atoms/Title";
import TypographyComponent from "@/components/atoms/Typography";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import useCartListHook from "../../hooks/useCartList.hook";
import CartItemComponent from "../CartItem";

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

  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/empty_cart.json",
      });
    }
  }, [data.length]);

  return (
    <section className="w-11/12 mx-auto space-y-4">
      <TitleComponent>Cart</TitleComponent>
      {data.length === 0 ? (
        <div className="items-center flex flex-col space-y-4">
          <div ref={animationContainer}></div>
          <TypographyComponent>Your cart is empty</TypographyComponent>
          <ButtonComponent onClick={() => (window.location.href = "/products")}>
            Go to Products
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
