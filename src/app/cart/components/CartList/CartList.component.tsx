import TitleComponent from "@/components/atoms/Title";
import useCartListHook from "../../hooks/useCartList.hook";
import CartItemComponent from "../CartItem";

/**
 * A component that renders a list of items in the cart.
 *
 * The component uses the `useCartListHook` hook to fetch the list of items in the cart.
 * The component renders a list of `CartItemComponent`s, each representing an item in the cart.
 *
 * @returns {JSX.Element} A JSX element representing the cart list.
 */
const CartListComponent = (): JSX.Element => {
  const { data } = useCartListHook();
  return (
    <section className="w-1/2 mx-auto space-y-4">
      <TitleComponent>Cart</TitleComponent>
      <div className="space-y-2">
        {data.map((item) => (
          <CartItemComponent key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CartListComponent;
