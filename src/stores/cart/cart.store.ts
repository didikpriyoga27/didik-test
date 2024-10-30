"use client";

import { Product } from "@/app/products/type";
import { create } from "zustand";
import { CartItem, CartStore } from "./type";

export const useCartStore = create<CartStore>()((set) => ({
  products: JSON.parse(<string>localStorage.getItem("cart")) ?? [],

  /**
   * Adds an item to the cart. If the item already exists in the cart,
   * it increases the quantity of the item. Otherwise, it adds the item
   * to the cart. The updated cart is then stored in local storage.
   *
   * @param {CartItem} p - The item to add to the cart.
   */
  addItem: (p: CartItem) => {
    set((state) => {
      if (state.products.map((p) => p.product.id).includes(p.product.id)) {
        state.increaseQuantity(p.product.id);
      } else {
        state.products.push(p);
      }

      localStorage.setItem("cart", JSON.stringify(state.products));

      return { products: state.products };
    });
  },

  /**
   * Removes an item from the cart based on its product ID.
   * The updated cart is then stored in local storage.
   *
   * @param {Product["id"]} id - The ID of the product to remove from the cart.
   */
  removeItem: (id: Product["id"]) => {
    set((state) => {
      const updatedCart = state.products.filter((p) => p.product.id !== id);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { products: updatedCart };
    });
  },

  /**
   * Removes all items from the cart.
   * The updated cart is then stored in local storage.
   */
  removeAll: () =>
    set(() => {
      localStorage.setItem("cart", "[]");

      return { products: [] };
    }),

  /**
   * Increases the quantity of a product in the cart by one.
   * If the product does not exist in the cart, it does nothing.
   * The updated cart is then stored in local storage.
   *
   * @param {Product["id"]} id - The ID of the product to increase the quantity of.
   */
  increaseQuantity: (id: Product["id"]) => {
    set((state) => {
      const updatedCart = state.products.map((p) => {
        if (p.product.id === id) {
          p.qty++;

          return p;
        }

        return p;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { products: updatedCart };
    });
  },

  /**
   * Decreases the quantity of a product in the cart by one.
   * If the product does not exist in the cart or the quantity is zero,
   * the product is removed from the cart.
   * The updated cart is then stored in local storage.
   *
   * @param {Product["id"]} id - The ID of the product to decrease the quantity of.
   */
  decreaseQuantity: (id: Product["id"]) => {
    set((state) => {
      const updatedCart = state.products.filter((p) => {
        if (p.product.id === id && p.qty > 0) {
          p.qty--;

          if (p.qty <= 0) {
            return false;
          }
        }

        return true;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { products: updatedCart };
    });
  },
}));
