import { useState } from "react";

import "./styles.css";
import ProductsList from "../../../components/ProductsList";
import ReviewedProducts from "../../../components/ReviewedProducts";

function Dashboard() {
  const [view, setView] = useState<"products" | "reviews">("products");

  return (
    <div className="container">
      <div className="company-dashboard">
        <nav className="nav-tabs">
          <button
            className={view === "products" ? "active" : ""}
            onClick={() => setView("products")}
          >
            Meus Produtos
          </button>
          <button
            className={view === "reviews" ? "active" : ""}
            onClick={() => setView("reviews")}
          >
            Produtos Avaliados
          </button>
        </nav>

        <div className="tab-content">
          {view === "products" && <ProductsList />}
          {view === "reviews" && <ReviewedProducts />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
