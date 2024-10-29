import HeaderComponent from "@/components/organisms/Header";
import CartListComponent from "./components/CartList";

const Cart = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <HeaderComponent />
      <CartListComponent />
    </div>
  );
};

export default Cart;
