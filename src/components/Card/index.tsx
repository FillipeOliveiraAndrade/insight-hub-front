import "./styles.css";

type Props = {
  name: string;
  category: string;
  imageUri: string; 
};

function Card({ name, category, imageUri }: Props) {
  return (
    <div className="container-card">
      <img
        src={`http://localhost:8080/product/image/${imageUri}`}
        className="image-card"
        alt={name}
      />

      <div className="info-card">
        <p className="text-card">
          Nome: <span className="name-card">{name}</span>
        </p>
        <p className="text-card">
          Categoria: <span className="category-card">{category}</span>
        </p>
      </div>

      <button className="button-card">Visualizar</button>
    </div>
  );
}

export default Card;
