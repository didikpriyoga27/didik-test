import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Product } from "../type";

const useQueryProductsHook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseUrl = "https://api.escuelajs.co/api/v1";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 5);
  const offset = (page - 1) * limit;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  /**
   * Updates the current page and stores it in the browser's URL
   * using the query parameter `page`.
   *
   * @param {number} newPage The new page number.
   */
  const setPage = (newPage: number) => {
    router.push(pathname + "?" + createQueryString("page", newPage.toString()));
  };

  const incrementPage = () => setPage(page + 1);
  const decrementPage = () => setPage(page - 1);

  /**
   * Fetches the products from the API given the current page and limit.
   *
   * @returns The list of products.
   */
  const fetchProducts = async () => {
    const response = await axios.get(
      `${baseUrl}/products?offset=${offset}&limit=${limit}`
    );
    return response.data;
  };

  const { data: productsData } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { productsData, page, limit, setPage, incrementPage, decrementPage };
};

export default useQueryProductsHook;
