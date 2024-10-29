import cart from "../mock/cart.json";
const useCartListHook = () => {
  const data = cart;

  return { data };
};

export default useCartListHook;
