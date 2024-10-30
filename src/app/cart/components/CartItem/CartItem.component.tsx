import ButtonComponent from "@/components/atoms/Button";
import { DeleteIcon } from "@/components/atoms/Icons";
import TypographyComponent from "@/components/atoms/Typography";
import CartImageComponent from "../CartImage";
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
    <div className="flex flex-row items-center justify-between mb-4">
      <div className="flex flex-row items-center gap-4">
        <CartImageComponent src={item.images[0]} />
        <div>
          <TypographyComponent as="h2" className="text-lg font-bold">
            {item.title}
          </TypographyComponent>
          <TypographyComponent className="text-sm">
            {item.qty} x ${item.price}
          </TypographyComponent>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <ButtonComponent className="mr-4">
          <DeleteIcon className="dark:invert" />
        </ButtonComponent>
        <ButtonComponent>-</ButtonComponent>
        <TypographyComponent as="span" className="px-2">
          {item.qty}
        </TypographyComponent>
        <ButtonComponent>+</ButtonComponent>
        <TypographyComponent as="span" className="pl-16">
          ${item.qty * item.price}
        </TypographyComponent>
      </div>
    </div>
  );
};

export default CartItemComponent;
