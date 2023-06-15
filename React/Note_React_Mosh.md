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
