import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Product } from "../type";

const useQueryProductsHook = () => {
  const searchParams = useSearchParams();

  const baseUrl = "https://api.escuelajs.co/api/v1";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 5);
  const offset = (page - 1) * limit;

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

  return { productsData };
};

export default useQueryProductsHook;
