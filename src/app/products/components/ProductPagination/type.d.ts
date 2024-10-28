import useProductListHook from "@/app/products/hooks/useProductList.hook";

export interface IProductPaginationComponentProps {
  table: ReturnType<typeof useProductListHook>["table"];
}
