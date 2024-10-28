"use client";

import useProductListHook from "../../hooks/useProductList.hook";
import ProductPaginationComponent from "../ProductPagination";
import TableBodyComponent from "./components/TableBody";
import TableHeaderComponent from "./components/TableHeader";

/**
 * A component that renders a table of products.
 *
 * It calls the useProductListHook hook to get the table data and
 * props, and then renders the table with the TableHeaderComponent
 * and TableBodyComponent.
 *
 * @returns {JSX.Element} - A JSX element representing the table
 * component.
 */
const ProductListComponent = (): JSX.Element => {
  const { table } = useProductListHook();

  return (
    <section className="w-11/12 mx-auto">
      <table className="w-full bg-slate-300 text-background my-4">
        <TableHeaderComponent table={table} />
        <TableBodyComponent table={table} />
      </table>
      <ProductPaginationComponent table={table} />
    </section>
  );
};

export default ProductListComponent;
