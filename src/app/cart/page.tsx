import HeaderComponent from "@/components/organisms/Header";
import CartFooterComponent from "./components/CartFooter";
import CartListComponent from "./components/CartList";

const Cart = () => {
  return (
    <div>
      <HeaderComponent />
      <CartListComponent />
      <CartFooterComponent />
    </div>
  );
};

export default Cart;
