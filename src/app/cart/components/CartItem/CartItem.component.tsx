import { ICartitemComponentProps } from "./type";

const CartItemComponent = ({ item }: ICartitemComponentProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <p className="text-sm">
          {item.qty} x ${item.price}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <span className="pr-16">${item.qty * item.price}</span>
        <button className="px-4 rounded">-</button>
        <span className="px-2">{item.qty}</span>
        <button className="px-4 rounded">+</button>
      </div>
    </div>
  );
};

export default CartItemComponent;
