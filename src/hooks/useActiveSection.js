import { useEffect, useState } from "react";

export function useActiveSection(ids = [], rootMargin = "-40% 0px -55% 0px") {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveId(visible[0].target.id);
      },
      { rootMargin, threshold: [0.1, 0.25, 0.4, 0.6] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
