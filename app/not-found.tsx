import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container main">
        <div className="page-intro">
          <h1>ไม่พบหน้านี้</h1>
          <p className="lead">
            ลองกลับไปที่ <Link href="/">หน้าแรก</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
