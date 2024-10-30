"use client";

import ButtonComponent from "@/components/atoms/Button";
import { CartIcon, DeleteIcon, EditIcon } from "@/components/atoms/Icons";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import ProductImageComponent from "../components/ProductImage";
import { Column } from "../type";
import useQueryProductsHook from "./useQueryProducts.hook";

const columnHelper = createColumnHelper<Column>();

/**
 * A custom hook for generating a table with a list of products.
 *
 * The hook provides the following properties:
 * - data: The list of products.
 * - columns: The columns of the table.
 * - isShowDeleteModal: A boolean indicating whether the delete product modal is shown.
 * - selectedId: The id of the product selected for deletion.
 * - setIsShowDeleteModal: A function to set whether the delete product modal is shown.
 *
 * The hook uses the useQueryProductsHook hook to fetch the list of products.
 * The hook also defines columns for the table, including product id, image, title, description, category, price, created at, updated at, and actions.
 *
 * @returns {Object} An object containing the properties above.
 */
const useProductListHook = () => {
  const selectedIdRef = useRef<number>(0);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const queryProducts = useQueryProductsHook();

  const data = useMemo(() => {
    return queryProducts.productsData ?? [];
  }, [queryProducts.productsData]);

  const handleDeleteOnClick = useCallback((id: number) => {
    selectedIdRef.current = id;
    setIsShowDeleteModal(true);
  }, []);

  const columns = useMemo(
    () => [
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
          <div className="flex gap-2 justify-center flex-wrap">
            <ButtonComponent href={`/products/${info.row.original.id}`}>
              <EditIcon className="dark:invert" />
            </ButtonComponent>
            <ButtonComponent>
              <CartIcon className="dark:invert" />
            </ButtonComponent>
            <ButtonComponent
              onClick={() => handleDeleteOnClick(info.row.original.id)}
            >
              <DeleteIcon className="dark:invert" />
            </ButtonComponent>
          </div>
        ),
      }),
    ],
    [handleDeleteOnClick]
  );

  return {
    data,
    columns,
    isShowDeleteModal,
    selectedId: selectedIdRef.current,
    setIsShowDeleteModal,
  };
};

export default useProductListHook;
