import { HomePage } from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/", "th");

export default function Page() {
  return <HomePage locale="th" />;
}
