import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    // queryFn: apiClient.getAll.bind(apiClient), // APIClient 中未使用箭头函数会丢失上下文，会导致其中的 this.endpoint 丢失变为 undefined，所以这里可以用 .bind
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
