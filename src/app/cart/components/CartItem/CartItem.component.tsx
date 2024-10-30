import ButtonComponent from "@/components/atoms/Button";
import { DeleteIcon } from "@/components/atoms/Icons";
import TypographyComponent from "@/components/atoms/Typography";
import CartImageComponent from "../CartImage";
import { ICartitemComponentProps } from "./type";

/**
 * A component that renders an item in the shopping cart.
 *
 * The component displays the product image, title, quantity, price per item,
 * and the total price for the quantity. It also provides buttons to increase or
 * decrease the quantity, and a button to remove the item from the cart.
 *
 * @param {ICartitemComponentProps} props - The props for the component.
 * @param {ReturnType<typeof useCartListHook>["data"][number]} props.item - The cart item data, including product details and quantity.
 *
 * @returns {JSX.Element} A JSX element representing the cart item component.
 */
const CartItemComponent = ({ item }: ICartitemComponentProps): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-between mb-4">
      <div className="flex flex-row items-center gap-4">
        <CartImageComponent src={item.product.images[0]} />
        <div>
          <TypographyComponent as="h2" className="text-lg font-bold">
            {item.product.title}
          </TypographyComponent>
          <TypographyComponent className="text-sm">
            {item.qty} x ${item.product.price}
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
          ${item.qty * item.product.price}
        </TypographyComponent>
      </div>
    </div>
  );
};

export default CartItemComponent;
