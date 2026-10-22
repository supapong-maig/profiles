import { UpdatesPage } from "@/components/pages/UpdatesPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/updates/", "en", "Changelog");

export default function Page() {
  return <UpdatesPage locale="en" />;
}
