import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import "./styles.css";
import { getProducts } from "../../../api/product/product";

type Products = {
  id: string;
  name: string;
  category: string;
  images: string;
};

function CatalogProducts() {
  const [products, setProducts] = useState<Products[]>();

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await getProducts("/product");   
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="container-catalog">
      <div className="products-evaluated">
        <h3>Produtos avaliados</h3>

        { true && <p>Você ainda não avaliou nenhum produto</p> }
      </div>

      <div className="catalog">
        {products && products.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            category={item.category}
            imageUri={item.id}
          />
        ))}
      </div>

      <div className="div"></div>
    </div>
  );
}

export default CatalogProducts;
