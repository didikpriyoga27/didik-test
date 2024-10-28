import useProductListHook from "@/app/products/hooks/useProductList.hook";

export interface ITableBodyComponentProps {
  table: ReturnType<typeof useProductListHook>["table"];
}
