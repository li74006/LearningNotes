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
