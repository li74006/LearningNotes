import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  // ? 后面的参数也的是 可以选的
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true); // 请求发出去前，就将 isLoading 状态改为 true，用于展示骨架屏

      apiClient
        .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
        .then((res) => {
          setData(res.data.results);
          setLoading(false); // 用于隐藏骨架屏，展示实际返回数据
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort(); // 中断请求
      // return 会在组件 unmounted 时执行
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};
export default useData;
