import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

export default async function ProductShowroom() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });

  return (
    <div>
      <div>
        <ProductCard product={products[0]}></ProductCard>
      </div>
      <div className="grid grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
