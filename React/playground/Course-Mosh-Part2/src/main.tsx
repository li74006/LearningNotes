import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   retry: 3, // 配置查询失败后的重试次数
    //   cacheTime: 300_000, // 配置当查询值未被组件使用时，缓存时间为 5min
    //   staleTime: 10 * 1000, // 配置数据过期时间为 1 min
    //   refetchOnWindowFocus: false, // 重新进入窗口后不重新请求数据
    //   refetchOnReconnect: false, // 断线重连后不重新请求数据
    //   refetchOnMount: false, // 组件重新挂载时不重新请求数据
    // },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
