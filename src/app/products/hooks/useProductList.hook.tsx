"use client";

import ButtonComponent from "@/components/atoms/Button";
import { CartIcon, DeleteIcon, EditIcon } from "@/components/atoms/Icons";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
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

  const { t } = useTranslationHook();
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
        header: t("products:productId"),
        size: 40,
        cell: (info) => "#" + info.getValue(),
      }),
      columnHelper.accessor("images", {
        header: t("products:image"),
        size: 100,
        cell: (info) => (
          <div className="flex items-center justify-center w-full">
            <ProductImageComponent info={info} />
          </div>
        ),
      }),
      columnHelper.accessor("title", {
        header: t("products:title"),
        size: 120,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: t("products:description"),
        size: 400,
        cell: (info) => (
          <p title={info.getValue()}>
            {info.getValue().length > 120
              ? info.getValue().slice(0, 120) + "..."
              : info.getValue()}
          </p>
        ),
      }),
      columnHelper.accessor("category", {
        header: t("products:category"),
        size: 80,
        cell: (info) => info.getValue().name,
      }),
      columnHelper.accessor("price", {
        header: t("products:price"),
        size: 60,
        cell: (info) => "$" + info.getValue(),
      }),
      columnHelper.accessor("creationAt", {
        header: t("products:createdAt"),
        size: 80,
        cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
      }),
      columnHelper.accessor("updatedAt", {
        header: t("products:updatedAt"),
        size: 80,
        cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
      }),
      columnHelper.display({
        header: t("products:actions"),
        size: 120,
        cell: (info) => (
          <div className="flex gap-2 justify-center flex-wrap">
            <ButtonComponent
              className="p-1"
              variant="info"
              onClick={() => handleEditOnClick(info.row.original)}
            >
              <EditIcon className="invert" width={16} height={16} />
            </ButtonComponent>
            <ButtonComponent
              className="p-1"
              variant="success"
              onClick={() => handleAddItem(info)}
            >
              <CartIcon className="invert" width={16} height={16} />
            </ButtonComponent>
            <ButtonComponent
              className="p-1"
              variant="danger"
              onClick={() => handleDeleteOnClick(info.row.original)}
            >
              <DeleteIcon className="invert" width={16} height={16} />
            </ButtonComponent>
          </div>
        ),
      }),
    ],
    [handleAddItem, handleDeleteOnClick, handleEditOnClick, t]
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
