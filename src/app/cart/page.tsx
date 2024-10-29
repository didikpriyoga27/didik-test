import HeaderComponent from "@/components/organisms/Header";
import CartFooterComponent from "./components/CartFooter";
import CartListComponent from "./components/CartList";

const Cart = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <HeaderComponent />
      <CartListComponent />
      <CartFooterComponent />
    </div>
  );
};

export default Cart;
