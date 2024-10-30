import ButtonComponent from "@/components/atoms/Button";
import { DeleteIcon } from "@/components/atoms/Icons";
import TypographyComponent from "@/components/atoms/Typography";
import { useCartStore } from "@/stores/cart";
import CartImageComponent from "../CartImage";
import { ICartitemComponentProps } from "./type";

/**
 * A component that renders a single item in the cart.
 *
 * The component receives an object with a `product` and a `qty` as a prop.
 * It renders the product title, price, and quantity, and provides buttons
 * to increment, decrement, and remove the item from the cart.
 *
 * @param {ICartitemComponentProps} props - The props object containing the cart item.
 * @param {Product} props.item.product - The product object.
 * @param {number} props.item.qty - The quantity of the product in the cart.
 *
 * @returns {JSX.Element} A JSX element representing the cart item.
 */
const CartItemComponent = ({ item }: ICartitemComponentProps): JSX.Element => {
  const { removeItem, decreaseQuantity, increaseQuantity } = useCartStore();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-4 sm:mb-0 gap-4">
      <div className="flex flex-1 w-full flex-row items-center gap-4">
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
      <div className="flex flex-1 w-full items-center justify-between sm:justify-end">
        <ButtonComponent
          variant="danger"
          className="mr-4"
          onClick={() => removeItem(item.product.id)}
        >
          <DeleteIcon className="invert" />
        </ButtonComponent>
        <ButtonComponent
          onClick={() => decreaseQuantity(item.product.id)}
          disabled={item.qty === 1}
          className={"disabled:opacity-50"}
        >
          -
        </ButtonComponent>
        <TypographyComponent as="span" className="px-2">
          {item.qty}
        </TypographyComponent>
        <ButtonComponent onClick={() => increaseQuantity(item.product.id)}>
          +
        </ButtonComponent>
        <TypographyComponent
          as="span"
          className="pl-4 sm:pl-16 min-w-24 sm:min-w-32 text-right"
        >
          ${item.qty * item.product.price}
        </TypographyComponent>
      </div>
    </div>
  );
};

export default CartItemComponent;
