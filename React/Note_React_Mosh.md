#

## Building Components

### 7 : Managing State

```tsx
import { MouseEvent } from "react";
import { useState } from "react";

function ListGroup() {
  const items = ["new york", "jiananda", "shanxi", "shandong", "yingguo"];
  const handleClick = (e: MouseEvent) => {
    console.log(e); // 从 tsx 语句中可以获得 e 的 type，然后移入即可
  };
  let [clickedItem, setClickedItem] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        // .map 的第二个参数是数组中每个元素的索引
        {items.map((item, index) => (
          <li
            key={item}
            // onClick={handleClick}
            onClick={() => {
              setClickedItem(index);
            }}
            className={clickedItem === index ? "list-group-item  active" : "list-group-item"}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

### 8 : Passing Data via Props

App.tsx

```tsx
import ListGroup from "./components/ListGroup";

function App() {
  const items = ["new york", "jiananda", "shanxi", "shandong", "yingguo"];

  return <ListGroup items={items} heading="Cities" />;
}

export default App;
```

ListGroup.tsx

```tsx
import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  let [clickedItem, setClickedItem] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            onClick={() => {
              setClickedItem(index);
            }}
            className={clickedItem === index ? "list-group-item  active" : "list-group-item"}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

### 9 : Passing Functions via Props

App.tsx

```tsx
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["new york", "jiananda", "shanxi", "shandong", "yingguo"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />;
}

export default App;
```

ListGroup.tsx

```tsx
import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  let [clickedItem, setClickedItem] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            onClick={() => {
              setClickedItem(index);
              onSelectItem(item);
            }}
            className={clickedItem === index ? "list-group-item  active" : "list-group-item"}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

### 10 : State vs Props

// 传入的 props 在组件的内部是只读的

### 11 ： Passing Children (相当于 Vue 的插槽)

App.tsx

```tsx
import Alert from "./components/Alert";

function App() {
  return (
    <div>
      <Alert>
        Hello <p>Fucker!!!</p>
      </Alert>
    </div>
  );
}

export default App;
```

Alert.tsx

```tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Alert = ({ children }: Props) => {
  return <div className="alert alert-primary">{children}</div>;
};

export default Alert;
```

### 14 : Exercise

App.tsx

```tsx
import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && <Alert onClose={() => setAlertVisible(false)}>Alert something...</Alert>}
      <Button name="点我" onClick={() => setAlertVisible(!alertVisible)} type={"warning"} />
    </div>
  );
}

export default App;
```

Alert.tsx

```tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show ">
      {children}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
```

Button.tsx

```tsx
interface Props {
  name: string;
  type?: "primary" | "success" | "danger" | "warning";
  onClick: () => void;
}

const Button = ({ name, type, onClick }: Props) => {
  return (
    <button className={"btn btn-" + type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
```

## Styling Components

### 3 : CSS Modules

如何像 clacsName 中添加多个 styles：
`<ul className={[styles.listGroup, styles.container].join(' ')}>`

## Managing Component State

### 6 : Updating Objects

useState 中的对象是只读的，需要声明一个新对象然后用 setDrink 对 drink 进行赋值。

```tsx
const [drink, setDrink] = useState({
  title: "Mojito",
  price: 5,
  taste：{
    ice:10,
    sweet:10
  }
});

const [names, setNames] = useState(['ohc','li74006'])


const handleClick = () => {

  // 更新对象
  setDrink({ ...drink, price: 6, taste:{...drink.taste, sweet:5} }); // 这里使用扩展操作符更加简洁

  // 更新数组

  // Add
  setNames([...names, 'lanlan'])

  // Remove
  setNames(names.filter(name => name !== 'li74006'))

  // Update
  setNames(names.map(name => name == 'ohc' ? 'ohcysp' : name))
};

```

`npm i immer` 使用 immer 进行数据更新

```tsx
import produce from "immer";

setBugs(
  produce((draft) => {
    const bug = draft.find((bug) => bug.id === 1);
    if (bug) bug.fixed = true;
  })
);
```

## Building Forms

### useRef Hook

Form.tsx

```tsx
import { FormEvent, useRef } from "react";

const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = {
    name: "",
    age: 0,
  };

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value); // 因为 useRef 的 value 是字符串，但是上面声明的 person.age 变量是 number,所以将其解析为数字就不会报错了
    console.log(person);
  };

  return (
    <form onSubmit={handelSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input ref={nameRef} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input ref={ageRef} type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

### useState Hook

Form.tsx

```tsx
import { FormEvent, useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: "",
  });

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(person);
  };

  return (
    <form onSubmit={handelSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          value={person.name}
          onChange={(e) => {
            setPerson({ ...person, name: e.target.value });
          }}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input
          value={person.age}
          onChange={(e) => {
            setPerson({ ...person, age: parseInt(e.target.value) });
          }}
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

### Managing Forms with React Hook Form

`npm i react-hook-form`

Form.tsx

```tsx
import { useForm, FieldValues } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input {...register("name")} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input {...register("age")} type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

### Applying Validation

Form.tsx

```tsx
import { useForm, FieldValues } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); // formState 使用到了嵌套解构

  console.log(errors);

  const onSubmit = (data: FieldValues) => console.log(errors, data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input {...register("name", { required: true, minLength: 3 })} id="name" type="text" className="form-control" />
        {errors.name?.type === "required" && <p className="text-danger">The name is required.</p>}
        {errors.name?.type === "minLength" && <p className="text-danger">The name must be at least 3 characters.</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input {...register("age")} type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

### Schema based Validation

常用认证库：Joi、Yup、Zod
`npm i zod`

### Exercise

App.tsx

```tsx
import { useState } from "react";
import ExpenseList from "./components/Exercise_Expense/components/ExpenseList";
import ExpenseFilter from "./components/Exercise_Expense/components/ExpenseFilter";
import ExpenseForm from "./components/Exercise_Expense/components/ExpenseForm";
function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Groceries" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Entertainment" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleExpenses = selectedCategory ? expenses.filter((e) => e.category === selectedCategory) : expenses;

  return (
    <div>
      <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])} />
      <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)} />
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => {
          setExpenses(expenses.filter((e) => e.id !== id));
        }}
      />
    </div>
  );
}

export default App;
```

其他 .tsx

React\playground\Course-Mosh\src\components\Exercise_Expense

## Connecting to the Backend

### Understanding the Effect Hook

App.tsx

```tsx
import { useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLInputElement>(null);

  // after render
  useEffect(() => {
    console.log(ref);
    if (ref.current) ref.current.focus();
  });

  useEffect(() => {
    document.title = "Psycho";
  });

  return (
    <div>
      <input ref={ref} type="text" className="form-control" />
    </div>
  );
}

export default App;
```

### Effect Dependencies

App.tsx

```tsx
import { useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [category, setCategory] = useState("");

  return (
    <div>
      <select name="" id="" className="form-select" onChange={(e) => setCategory(e.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}

export default App;
```

ProductList.tsx

```tsx
import { useState, useEffect } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [product, setProduct] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fecting products in", category);
    setProduct(["clothing", "household"]);
  }, [category]);

  return <div>ProductList</div>;
};

export default ProductList;
```

### Effect Clean Up

App.tsx

```tsx
import { useEffect } from "react";
import ProductList from "./components/ProductList";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

function App() {
  useEffect(() => {
    connect();

    return () => disconnect(); // 这一步相当于会在组件 unmount 时候执行
  });

  return <div></div>;
}

export default App;
```

### Fetching Data

有各种假数据：[JSONPlaceholder](https://jsonplaceholder.typicode.com/)

App.tsx

```tsx
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>("https://jsonplaceholder.typicode.com/users").then((res) => setUsers(res.data));
  }, []);
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default App;
```

### Handling Errors

App.tsx

```tsx
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

### Working with Async and Await

App.tsx

```tsx
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/user");
        setUsers(res.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
```

### Cancelling a Fetch Request

App.tsx

```tsx
import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

### Showing a Loading Indicator

App.tsx

```tsx
import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      })
      .finally(() => {
        // setIsLoading(false); // 据说在 react 的 strict 模式下不好使
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

### Extracting a Reusable API Client

http-service.ts

```ts
import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
```

### Creating a Custom Data Fetching Hook

useUsers.ts

```ts
import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { User } from "../services/user-service";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
```

# Part-2

## Fetching and Updating Data with React Query

### What is React Query

A powerful library for managing data fetching and caching in React applications.

### Handling Errors

TodoList.tsx

```tsx
import axios from "axios";
import { useQuery } from "react-query";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  const fetchTodos = () => axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => res.data);

  const { data: todos, error } = useQuery<Todo[], Error>({
    // ReactQuery 不知道使用者用 axios 或者其他方法获取数据，所以要声明相应的 type，否则下面 todos 会报错
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

### Creating a Custom Query Hook

`npm i @tanstack/react-query`

useTodos.ts

```ts
import axios from "axios";
import { useQuery } from "react-query";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () => axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
```

TodoList.tsx

```tsx
import useTodos from "../hooks/useTodos";

const TodoList = () => {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

### Using React Query Settings

`npm i @tanstack/react-query`

### Parameterized Queries

usePosts.ts

```ts
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => {
  const fetchPosts = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
  });
};

export default usePosts;
```

PostList.tsx

```tsx
import { useState } from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const [userId, setUserId] = useState<number>();

  const { data: posts, error, isLoading } = usePosts(userId);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select onChange={(e) => setUserId(parseInt(e.target.value))} value={userId} className="form-select mb-3">
        <option>All</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
```

### Paginated Queries

usePosts.ts

```ts
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ["posts", query], // useQuery 会监测数组中参数变化而发起请求
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true, // 翻页后页面会保持上一页浏览位置
  });
};

export default usePosts;
```

PostList.tsx

```tsx
import { useState } from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-primary my-3 me-3">
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} className="btn btn-primary">
        Next
      </button>
    </>
  );
};

export default PostList;
```

### Infinite Quries

usePosts.ts

```ts
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
```

PostList.tsx

```tsx
import { useState } from "react";
import usePosts from "../hooks/usePosts";
import React from "react";

const PostList = () => {
  const pageSize = 10;

  const { data: posts, error, isLoading, fetchNextPage, isFetchingNextPage } = usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-itme">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} className="btn btn-primary">
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
```

### Mutating Data

TodoForm.tsx

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo).then((res) => res.data),

    onSuccess(savedTodo, newTodo) {
      // 方法一：invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // 方法二：在 cache 中更新数据
      queryClient.setQueriesData<Todo[]>(["todos"], (todos) => [savedTodo, ...(todos || [])]);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      className="row mb-3"
      onSubmit={(e) => {
        e.preventDefault();

        if (ref.current && ref.current.value)
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: false,
            userId: 1,
          });
      }}
    >
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
```

### Inplement Infinite Scroll

`npm i react-infinite-scroll-component`

### Simplifying Time Calculations

`npm i ms`
`npm i -D @types/ms` // @types 只需要在开发环境，所以 -D 或 --save-dev

快捷键：
<kbd>Shift</kbd> + <kbd>F12</kbd> 或 右键 ：查看被谁引用
<kbd>Ctrl</kbd> + <kbd>T</kbd> ：可在不同文件中查找

## Global State Management

### Consolidating State Logic with a Reducer

Reducer : A function that allows us to centralize state updates in a component.

### Sharing State using React Context

React Context : Allows sharing data without passing it down through many components in the middle.

### Inspecting Stores with Zustand DevTools

`npm i npm i simple-zustand-devtools`

`npm i -D @types/node`
