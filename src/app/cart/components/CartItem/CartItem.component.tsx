import ButtonComponent from "@/components/atoms/Button";
import { ICartitemComponentProps } from "./type";

/**
 * A component that renders an item within a shopping cart.
 *
 * The component displays the item's title, quantity, and price,
 * and provides controls to adjust the quantity or delete the item.
 *
 * @param {ICartitemComponentProps} props - The props object containing the cart item data.
 * @param {Object} props.item - The cart item data.
 * @param {string} props.item.title - The title of the cart item.
 * @param {number} props.item.qty - The quantity of the cart item.
 * @param {number} props.item.price - The price of the cart item.
 *
 * @returns {JSX.Element} A JSX element representing the cart item.
 */
const CartItemComponent = ({ item }: ICartitemComponentProps): JSX.Element => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <p className="text-sm">
          {item.qty} x ${item.price}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <ButtonComponent>Delete</ButtonComponent>
        <button className="px-4 rounded">-</button>
        <span className="px-2">{item.qty}</span>
        <button className="px-4 rounded">+</button>
        <span className="pl-4">${item.qty * item.price}</span>
      </div>
    </div>
  );
};

export default CartItemComponent;
