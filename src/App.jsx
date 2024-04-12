import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(1);

  const productList = async () => {
    const product = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await product.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    productList();
  }, []);

  const setPagination = (value)=>{
    if(value>=1 && !value<=products.length/10 && value !== limit){
      setLimit(value)
    }
  }

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(limit * 10 - 10, limit * 10).map((prod) => {
            return (
              <span key={prod.id} className="product__single">
                <img src={prod.thumbnail} alt="thumbnail" />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      <div className="pagination">
        <span className={limit > 1 ? "" : "pagination__disable"} onClick={()=>setPagination(limit-1)}>◀️</span>
        {[...Array(products.length/10)].map((_,i)=>{
          return <span className = {limit === i + 1 ? "pagination__selected" : ""} key={i+1} onClick={()=>setPagination(i+1)}>{i+1}</span>
          })}
        <span className={limit < products.length/10 ? "" : "pagination__disable"} onClick={()=>setPagination(limit+1)}>▶️</span>
      </div>
    </>
  );
}
export default App;
