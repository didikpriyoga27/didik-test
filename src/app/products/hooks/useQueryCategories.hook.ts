import { Option } from "@/components/atoms/Select/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Category } from "../type";

/**
 * A hook for fetching the list of categories with pagination support.
 *
 * The hook returns an object with the following properties:
 * - categoryOptions: An array of category options formatted for use in select inputs.
 * - limit: The current limit of categories per page.
 *
 * The hook uses the useQuery hook from react-query to fetch the categories
 * from the server. It handles the pagination by utilizing the limit from
 * the URL search parameters.
 *
 * @returns {Object} An object containing categoryOptions and limit.
 */
const useQueryCategoriesHook = () => {
  const searchParams = useSearchParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const limit = Number(searchParams.get("limit") ?? 20);

  const fetchCategories = useCallback(async () => {
    const response = await axios.get(`${baseUrl}/categories?limit=${limit}`);
    return response.data;
  }, [baseUrl, limit]);

  const { data: categoriesData } = useQuery<Category[]>({
    queryKey: ["categories", limit],
    queryFn: fetchCategories,
    placeholderData: keepPreviousData,
  });

  const categoryOptions: Option[] =
    categoriesData?.map((category) => ({
      value: String(category.id),
      label: category.name,
    })) ?? [];

  return {
    categoryOptions,
    limit,
  };
};

export default useQueryCategoriesHook;
