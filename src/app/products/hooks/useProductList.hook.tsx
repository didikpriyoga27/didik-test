"use client";

import ButtonComponent from "@/components/atoms/Button";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Column, Product } from "../type";

import useQueryProductsHook from "./useQueryProducts.hook";

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
  const queryProducts = useQueryProductsHook();

  const data: Product[] = useMemo(
    () =>
      (queryProducts.productsData ?? []).map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        images: product.images,
        creationAt: product.creationAt,
        updatedAt: product.updatedAt,
      })),
    [queryProducts]
  );

  const columnHelper = createColumnHelper<Column>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Product Id",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("images", {
        header: "Image",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => "$" + info.getValue(),
      }),
      columnHelper.accessor("creationAt", {
        header: "Created At",
        cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
      }),
      columnHelper.accessor("updatedAt", {
        header: "Updated At",
        cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
      }),
      columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2 justify-center">
            <ButtonComponent href={`/products/${info.row.original.id}`}>
              Edit
            </ButtonComponent>
            <ButtonComponent>Delete</ButtonComponent>
          </div>
        ),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageIndex: 1,
        pageSize: queryProducts.limit,
      },
    },
  });

  return { data, columns, table };
};

export default useProductListHook;
