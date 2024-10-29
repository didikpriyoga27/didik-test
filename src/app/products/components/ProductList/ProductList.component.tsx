"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useProductListHook from "../../hooks/useProductList.hook";
import ProductPaginationComponent from "../ProductPagination";
import TableBodyComponent from "./components/TableBody";
import TableHeaderComponent from "./components/TableHeader";

/**
 * A component that renders a table with a list of products.
 *
 * The component uses the `useProductListHook` hook to generate the table data.
 * The hook returns an object with the following properties:
 * - data: The list of products.
 * - columns: The columns of the table.
 * - table: The table instance.
 *
 * The component renders a table with the following structure:
 * - The first row contains table cells with the column headers.
 * - The second row contains table cells with the table data.
 * - The third row contains a pagination component.
 *
 * The component styles the table and pagination component using Tailwind CSS.
 *
 * @returns {JSX.Element} A JSX element representing the table component.
 */
const ProductListComponent = (): JSX.Element => {
  const { data, columns } = useProductListHook();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="w-11/12 mx-auto">
      <table className="w-full bg-slate-800 dark:bg-slate-600 text-background my-4 rounded-md">
        <TableHeaderComponent table={table} />
        <TableBodyComponent table={table} />
      </table>
      <ProductPaginationComponent table={table} />
    </section>
  );
};

export default ProductListComponent;
