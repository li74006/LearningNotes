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
