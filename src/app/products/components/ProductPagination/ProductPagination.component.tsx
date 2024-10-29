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
      <button className="border rounded p-1">{"<"}</button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>{table.getState().pagination.pageIndex}</strong>
      </span>
      <button className="border rounded p-1">{">"}</button>
    </section>
  );
}

export default ProductPaginationComponent;
