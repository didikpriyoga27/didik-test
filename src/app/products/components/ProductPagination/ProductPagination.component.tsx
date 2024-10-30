import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import { IProductPaginationComponentProps } from "./type";

/**
 * A component that renders a pagination control for a table.
 *
 * The component displays first, previous, next, and last page buttons,
 * as well as a page number input and a page size select.
 *
 * @param {IProductPaginationComponentProps} props - The props object, which contains a
 * `table` property that is an instance of `Table` from `@tanstack/react-table`.
 */
function ProductPaginationComponent({
  table,
}: IProductPaginationComponentProps) {
  return (
    <section className="flex items-center justify-end gap-2">
      <ButtonComponent>{"<"}</ButtonComponent>
      <TypographyComponent as="span" className="flex items-center gap-1">
        <strong>{table.getState().pagination.pageIndex}</strong>
      </TypographyComponent>
      <ButtonComponent>{">"}</ButtonComponent>
    </section>
  );
}

export default ProductPaginationComponent;
