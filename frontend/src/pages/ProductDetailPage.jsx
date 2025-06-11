function ProductDetailPage() {
    const name = "Product Detail Page";
    const description = "This page will display the details of a specific product.";
    const img = "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80";
    const price = "$99.99";
    const itemsInCart = 1; // Example value, this could be fetched from a state or context

  return (
    <div className="text-gray-500 dark:text-gray-400 min-h-screen flex items-center justify-center">
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}

export default ProductDetailPage;