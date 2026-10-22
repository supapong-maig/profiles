"use client";

import { useEffect, useState } from "react";
import { toc } from "@/lib/toc";

/** Sticky table of contents that highlights the section currently in view. */
export function Rail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = toc.flatMap((g) => g.items.map((i) => i.id));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="rail" aria-label="สารบัญ">
      <nav>
        {toc.map((g) => (
          <div key={g.group} className="rail__group">
            <div className="grp">{g.group}</div>
            {g.items.map((i) => (
              <a key={i.id} href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined}>
                {i.label}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
