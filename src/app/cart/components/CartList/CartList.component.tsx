import TitleComponent from "@/components/atoms/Title";
import useCartListHook from "../../hooks/useCartList.hook";
import CartItemComponent from "../CartItem";

const CartListComponent = () => {
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
