import useProductListHook from "@/app/products/hooks/useProductList.hook";

export interface ITableHeaderComponentProps {
  table: ReturnType<typeof useProductListHook>["table"];
}
