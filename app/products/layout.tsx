import { ComparisonBar } from "../components/ComparisonBar";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<ComparisonBar /></>;
}
