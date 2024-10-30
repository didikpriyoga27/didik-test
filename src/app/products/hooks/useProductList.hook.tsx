"use client";

import ButtonComponent from "@/components/atoms/Button";
import { CartIcon, DeleteIcon, EditIcon } from "@/components/atoms/Icons";
import useToastHook from "@/hooks/useToast.hook";
import { useCartStore } from "@/stores/cart";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import ProductImageComponent from "../components/ProductImage";
import { Column, Product } from "../type";
import useQueryProductsHook from "./useQueryProducts.hook";

const columnHelper = createColumnHelper<Column>();

/**
 * A hook for getting the list of products.
 *
 * The hook returns an object with the following properties:
 * - data: The list of products.
 * - columns: The columns of the table.
 * - isShowDeleteModal: A boolean indicating whether the delete modal should be shown or not.
 * - selectedProduct: The selected product to be deleted.
 * - setIsShowDeleteModal: A function to set the value of isShowDeleteModal.
 *
 * The hook also provides functions to add a product to the cart, and to delete a product.
 */
const useProductListHook = () => {
  const selectedProductRef = useRef<Product | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const { addItem } = useCartStore();
  const { successMessage, errorMessage } = useToastHook();

  const handleAddItem = useCallback(
    async (info: CellContext<Column, unknown>) => {
      try {
        addItem({
          product: {
            id: info.row.original.id,
            category: info.row.original.category,
            description: info.row.original.description,
            images: info.row.original.images,
            price: info.row.original.price,
            title: info.row.original.title,
            creationAt: info.row.original.creationAt,
            updatedAt: info.row.original.updatedAt,
          },
          qty: 1,
        });
        successMessage(`${info.row.original.title} added to cart`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        errorMessage("Failed to add product to cart");
      }
    },
    [addItem, errorMessage, successMessage]
  );

  const queryProducts = useQueryProductsHook();

  const data = useMemo(() => {
    return queryProducts.productsData ?? [];
  }, [queryProducts.productsData]);

  const handleEditOnClick = useCallback((product: Product) => {
    selectedProductRef.current = product;
    setIsShowEditModal(true);
  }, []);

  const handleDeleteOnClick = useCallback((product: Product) => {
    selectedProductRef.current = product;
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
            <ButtonComponent
              onClick={() => handleEditOnClick(info.row.original)}
            >
              <EditIcon className="dark:invert" />
            </ButtonComponent>
            <ButtonComponent onClick={() => handleAddItem(info)}>
              <CartIcon className="dark:invert" />
            </ButtonComponent>
            <ButtonComponent
              onClick={() => handleDeleteOnClick(info.row.original)}
            >
              <DeleteIcon className="dark:invert" />
            </ButtonComponent>
          </div>
        ),
      }),
    ],
    [handleAddItem, handleDeleteOnClick, handleEditOnClick]
  );

  return {
    columns,
    data,
    isShowDeleteModal,
    isShowEditModal,
    isShowLoading: queryProducts.isShowLoading,
    selectedProduct: selectedProductRef.current,
    setIsShowDeleteModal,
    setIsShowEditModal,
  };
};

export default useProductListHook;
