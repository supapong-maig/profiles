import { ArchitecturePage } from "@/components/pages/ArchitecturePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/architecture/", "en", "About this site");

export default function Page() {
  return <ArchitecturePage locale="en" />;
}
