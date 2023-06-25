import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from "ms";
import Platform from "../entities/Platform";

// const usePlatforms = () => useData<Platform>("/platforms/lists/parents");

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

// refactor with react-query
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });

export default usePlatforms;
