"use client";

import useProductListHook from "../../hooks/useProductList.hook";
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
    <table className="w-11/12 bg-slate-300 text-background mx-auto my-4">
      <TableHeaderComponent table={table} />
      <TableBodyComponent table={table} />
    </table>
  );
};

export default ProductListComponent;
