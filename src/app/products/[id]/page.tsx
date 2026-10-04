import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/data/products";
import ProductDetailView from "@/components/product/ProductDetailView";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return <ProductDetailView product={product} related={related} />;
}
