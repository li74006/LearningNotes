import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from "ms";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

// const useGenres = () => useData<Genre>("/genres");

const apiClient = new APIClient<Genre>("/genres");

// refactor with react-query
const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    // initialData: { count: genres.length, results: genres }, // 可以添加初始值，增强用户体验
  });
export default useGenres;
