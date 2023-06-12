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
