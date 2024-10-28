"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import products from "../mock/products.json";
import { Product } from "../type";

/**
 * Custom hook for generating a table with a list of products.
 *
 * The hook returns an object with the following properties:
 * - data: The list of products.
 * - columns: The columns of the table.
 * - table: The table instance.
 *
 * The hook uses the `useMemo` hook to memoize the data and columns, so they are
 * only recreated when the component is mounted or the dependencies change.
 *
 * The hook also uses the `useReactTable` hook to generate the table instance.
 */
const useProductListHook = () => {
  const data: Product[] = useMemo(
    () =>
      products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        images: product.images,
      })),
    []
  );

  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Product Id",
        cell: (info) => info.getValue(),
        footer: "Product Id",
      }),
      columnHelper.accessor("images", {
        header: "Image",
        cell: (info) => info.getValue(),
        footer: "Image",
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
        footer: "Title",
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
        footer: "Description",
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => "$" + info.getValue(),
        footer: "Price",
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { data, columns, table };
};

export default useProductListHook;
