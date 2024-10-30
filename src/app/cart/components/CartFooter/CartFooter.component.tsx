import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import useCartListHook from "../../hooks/useCartList.hook";

const CartFooterComponent = () => {
  const { data } = useCartListHook();
  const total = data.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <footer className="w-1/2 mx-auto mt-12 flex items-center justify-between">
      <TypographyComponent className="font-bold">
        Total: ${total}
      </TypographyComponent>
      <ButtonComponent>Checkout</ButtonComponent>
    </footer>
  );
};

export default CartFooterComponent;
