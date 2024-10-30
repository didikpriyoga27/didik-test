import useQueryStringHook from "@/hooks/useQueryString.hook";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Product } from "../type";

/**
 * A custom hook for querying products from the API.
 *
 * This hook manages pagination, search functionality, and data fetching
 * for products using React Query. It provides the current page, limit,
 * and a set of functions to navigate between pages.
 *
 * @returns {Object} An object containing:
 * - productsData: The list of fetched products.
 * - page: The current page number.
 * - limit: The number of products per page.
 * - setPage: A function to set the current page.
 * - incrementPage: A function to increment the current page.
 * - decrementPage: A function to decrement the current page.
 */
const useQueryProductsHook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 5);
  const offset = (page - 1) * limit;

  const { createQueryString } = useQueryStringHook();

  const setPage = useCallback(
    (newPage: number) => {
      router.push(
        pathname + "?" + createQueryString("page", newPage.toString())
      );
    },
    [createQueryString, pathname, router]
  );

  const incrementPage = useCallback(() => setPage(page + 1), [page, setPage]);
  const decrementPage = useCallback(() => setPage(page - 1), [page, setPage]);

  const fetchProducts = useCallback(async () => {
    const response = await axios.get(
      `${baseUrl}/products?offset=${offset}&limit=${limit}${
        search ? `&title=${encodeURIComponent(search)}` : ""
      }`
    );
    return response.data;
  }, [baseUrl, limit, offset, search]);

  const { data: productsData, refetch } = useQuery<Product[]>({
    queryKey: ["products", page, limit, search],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
  });

  return {
    productsData,
    refetch,
    page,
    limit,
    setPage,
    incrementPage,
    decrementPage,
  };
};

export default useQueryProductsHook;
