import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = (pageParam: number) =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query], // useQuery 会监测数组中参数变化而发起请求
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true, // 翻页后页面会保持上一页浏览位置
    getNextPageParam: (lastPage, allPages) => {
      // 如果最后一页的数组不为空，那么返回下一页页码，将该值给到 queryFn 函数，从而请求下一页内容
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
