import { redirect } from "next/navigation";

// Existing comparison links now open the popup over the catalogue.
export default async function ComparePage({ searchParams }: { searchParams: Promise<{ products?: string }> }) {
  const { products = "" } = await searchParams;
  redirect(`/products?compare=${encodeURIComponent(products)}`);
}
