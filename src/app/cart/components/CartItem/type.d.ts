import useCartListHook from "../../hooks/useCartList.hook";

export interface ICartitemComponentProps {
  item: ReturnType<typeof useCartListHook>["data"][number];
}
