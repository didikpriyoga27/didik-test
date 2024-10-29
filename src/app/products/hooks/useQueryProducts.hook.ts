import useQueryStringHook from "@/hooks/useQueryString.hook";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Product } from "../type";

/**
 * A custom hook for querying the products from the API.
 *
 * The hook returns an object with the following properties:
 * - productsData: The list of products.
 * - page: The current page number.
 * - limit: The current limit of products per page.
 * - setPage: A function to update the current page and store it in the browser's URL.
 * - incrementPage: A function to increment the current page.
 * - decrementPage: A function to decrement the current page.
 */
const useQueryProductsHook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseUrl = "https://api.escuelajs.co/api/v1";
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
  }, [limit, offset, search]);

  const { data: productsData } = useQuery<Product[]>({
    queryKey: ["products", page, limit, search],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
  });

  return { productsData, page, limit, setPage, incrementPage, decrementPage };
};

export default useQueryProductsHook;
