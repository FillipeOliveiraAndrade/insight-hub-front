import { useEffect, useState } from "react";
import ProductModal from "../ProductModal";
import "./styles.css";
import { storageGetCompany, storageGetCompanyToken } from "../../storage/storageCompany";
import { getProductsOfCompany } from "../../api/company/company";

type Products = {
  id: string;
  name: string;
  category: string;
  images: string;
};

function ProductsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Products[]>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    async function getProducts() {
      const company = storageGetCompany();
      const token = storageGetCompanyToken() || "";

      const { data } = await getProductsOfCompany(`/company/product/${company.id}`, token);
     setProducts(data);
    }
    
    getProducts();
  }, []);

  return (
    <div className="products-list">
      <div className="products-header">
        <h3>Meus Produtos</h3>
        <button className="create-product-btn" onClick={openModal}>
          + Criar Novo Produto
        </button>

        <ProductModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
      <ul>
        {products && products.map((product) => (
          <li key={product.id} className="list">
            <div className="product-info">
              <img
                src={`http://localhost:8080/product/image/${product.id}`}
                height="80px"
                width="100px"
              />
              <strong style={{ marginRight: "-10px" }}>{product.name}</strong> - {product.category}
            </div>

            <div className="buttons">
              <button className="button" style={{ backgroundColor: "purple" }}>Editar</button>
              <button className="button" style={{ backgroundColor: "red" }}>Apagar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList