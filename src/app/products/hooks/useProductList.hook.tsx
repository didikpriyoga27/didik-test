"use client";

import ButtonComponent from "@/components/atoms/Button";
import { DeleteIcon, EditIcon } from "@/components/atoms/Icons";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import ProductImageComponent from "../components/ProductImage";
import { Column } from "../type";
import useQueryProductsHook from "./useQueryProducts.hook";

const columnHelper = createColumnHelper<Column>();

const columns = [
  columnHelper.accessor("id", {
    header: "Product ID",
    size: 100,
    cell: (info) => "#" + info.getValue(),
  }),
  columnHelper.accessor("images", {
    header: "Image",
    size: 200,
    cell: (info) => (
      <div className="flex items-center justify-center w-full">
        <ProductImageComponent info={info} />
      </div>
    ),
  }),
  columnHelper.accessor("title", {
    header: "Title",
    size: 120,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    size: 300,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    size: 80,
    cell: (info) => info.getValue().name,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    size: 60,
    cell: (info) => "$" + info.getValue(),
  }),
  columnHelper.accessor("creationAt", {
    header: "Created At",
    size: 80,
    cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    size: 80,
    cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
  }),
  columnHelper.display({
    header: "Actions",
    size: 100,
    cell: (info) => (
      <div className="flex gap-2 justify-center">
        <ButtonComponent href={`/products/${info.row.original.id}`}>
          <EditIcon className="dark:invert" />
        </ButtonComponent>
        <ButtonComponent>
          <DeleteIcon className="dark:invert" />
        </ButtonComponent>
      </div>
    ),
  }),
];

const useProductListHook = () => {
  const queryProducts = useQueryProductsHook();

  const data = useMemo(() => {
    return queryProducts.productsData ?? [];
  }, [queryProducts.productsData]);

  return { data, columns };
};

export default useProductListHook;
