import { UpdatesPage } from "@/components/pages/UpdatesPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/updates/", "th", "ประวัติการอัปเดต");

export default function Page() {
  return <UpdatesPage locale="th" />;
}
