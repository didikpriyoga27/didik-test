"use client";

import { useCartStore } from "@/stores/cart";

/**
 * A hook for getting the list of items in the cart.
 *
 * @returns {Object} An object with a single property, `data`, which is an array of items in the cart.
 */
const useCartListHook = () => {
  const { products } = useCartStore();
  const data = products;

  return { data };
};

export default useCartListHook;
