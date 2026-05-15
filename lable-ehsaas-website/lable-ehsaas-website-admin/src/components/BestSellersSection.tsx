import ProductCard from "./ProductCard";

const BestSellersSection = ({ products }: any) => {
  const bestSellers = products.filter((p: any) =>
    p.tags?.includes("best_seller")
  );

  return (
    <section className="container mx-auto py-rhythm-4">
      <h2 className="text-4xl font-bold italic mb-6">Best Sellers</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.slice(0, 4).map((p: any) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            originalPrice={p.discountPrice}
            image={p.imageUrl}
            badge="Bestseller"
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;