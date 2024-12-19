function ReviewedProducts() {
  const reviews = [
    { id: 1, product: "Produto 1", rating: 4.5 },
    { id: 2, product: "Produto 2", rating: 3.8 },
  ];

  return (
    <div className="reviewed-products">
      <h3>Produtos Avaliados</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.product}</strong> - Nota: {review.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewedProducts