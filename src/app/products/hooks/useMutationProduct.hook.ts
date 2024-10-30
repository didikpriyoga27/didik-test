import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { CreateProductParams } from "../type";

/**
 * A custom hook for creating a new product via an API.
 *
 * This hook provides a mutation function `mutateCreateProduct` that can be
 * used to trigger the product creation process. It uses `useMutation` from
 * React Query to handle the mutation logic.
 *
 * The hook utilizes the `baseUrl` from environment variables and a `createProduct`
 * function that sends a POST request to the API endpoint for product creation.
 *
 * @returns {Object} An object containing:
 * - mutateCreateProduct: A function to trigger the product creation mutation.
 */
const useMutationProductHook = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const createProduct = useCallback(
    async (data: CreateProductParams) =>
      axios.post<CreateProductParams>(`${baseUrl}/products`, data),
    [baseUrl]
  );

  const { mutateAsync: mutateCreateProduct } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
  });

  return { mutateCreateProduct };
};

export default useMutationProductHook;
