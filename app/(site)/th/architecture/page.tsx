import { ArchitecturePage } from "@/components/pages/ArchitecturePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/architecture/", "th", "เกี่ยวกับเว็บนี้");

export default function Page() {
  return <ArchitecturePage locale="th" />;
}
