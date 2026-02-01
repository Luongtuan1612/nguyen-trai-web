import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categoryLabels = {
  early: "Khởi đầu",
  formation: "Khoa bảng",
  resistance: "Kháng chiến",
  literary: "Văn học",
  governance: "Chính trị",
  tragedy: "Bi kịch",
  legacy: "Di sản",
};

const categoryBadge = {
  early: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  formation: "bg-primary/10 text-primary border-primary/25",
  resistance: "bg-destructive/15 text-destructive border-destructive/30",
  literary: "bg-accent/15 text-accent border-accent/30",
  governance: "bg-primary/15 text-primary border-primary/30",
  tragedy: "bg-muted/40 text-muted-foreground border-border",
  legacy: "bg-chart-2/15 text-chart-2 border-chart-2/30",
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// Hỗ trợ year là number hoặc string kiểu "1407–1417"
function getYearStart(y) {
  if (typeof y === "number") return y;
  if (typeof y === "string") {
    const m = y.match(/\d{3,4}/);
    return m ? Number(m[0]) : 0;
  }
  return 0;
}

export function TimelineSection({ events = [] }) {
  const safeEvents = useMemo(() => {
    const arr = Array.isArray(events) ? [...events] : [];
    arr.sort((a, b) => getYearStart(a.year) - getYearStart(b.year));
    return arr;
  }, [events]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = safeEvents[activeIndex] ?? null;

  const railRef = useRef(null);
  const itemRefs = useRef([]);

  const goPrev = () => setActiveIndex((i) => clamp(i - 1, 0, safeEvents.length - 1));
  const goNext = () => setActiveIndex((i) => clamp(i + 1, 0, safeEvents.length - 1));

  // progress % theo index (để vẽ “đường tiến trình”)
  const progressPct = useMemo(() => {
    if (safeEvents.length <= 1) return 0;
    return (activeIndex / (safeEvents.length - 1)) * 100;
  }, [activeIndex, safeEvents.length]);

  // Khi đổi activeIndex → tự trượt rail để mốc active về giữa
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <section id="timeline" className="py-24 bg-card">
      {/* Ẩn scrollbar (chỉ trong Timeline) */}
      <style>{`
        #timeline .no-scrollbar::-webkit-scrollbar { display: none; }
        #timeline .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-6 md:mb-8 text-center"
        >
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-primary mb-2">
            Dòng thời gian
          </h2>
          <p className="font-['Inter'] text-lg text-muted-foreground max-w-2xl mx-auto">
            Niên biểu lịch sử: chọn niên đại để “lật” sang mốc tiếp theo như đang đọc một cuốn sử.
          </p>
        </motion.div>

        {safeEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/30 bg-background p-10 text-center text-muted-foreground">
            Chưa có dữ liệu dòng thời gian.
          </div>
        ) : (
          <>
            {/* Axis container */}
            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-md shadow-lg p-4 md:p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-sm text-muted-foreground font-['Inter']">
                  Niên biểu Đại Việt
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/80 hover:bg-card/80 disabled:opacity-40 disabled:hover:bg-card"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Trước
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={activeIndex === safeEvents.length - 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/80 hover:bg-card/80 disabled:opacity-40 disabled:hover:bg-card"
                  >
                    Sau
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RAIL: có “đường trục” + “đường tiến trình” để liên kết các mốc */}
              <div
                ref={railRef}
                className="no-scrollbar overflow-x-auto pb-2 scroll-smooth"
              >
                <div className="relative inline-flex items-start gap-4 md:gap-5 px-1 pt-1 pb-3">
                  {/* Đường trục (base) */}
                  <div
                    className="pointer-events-none absolute left-1 right-1 top-[22px] md:top-[26px] h-[2px] bg-border"
                    aria-hidden="true"
                  />
                  {/* Đường tiến trình (tới mốc active) */}
                  <motion.div
                    className="pointer-events-none absolute left-1 top-[22px] md:top-[26px] h-[2px] bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                    aria-hidden="true"
                  />

                  {safeEvents.map((event, idx) => {
                    const isActive = idx === activeIndex;

                    const label =
                      event.phase ||
                      categoryLabels[event.category] ||
                      "Sự kiện";

                    return (
                      <button
                        key={event.id ?? `${event.year}-${idx}`}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        ref={(el) => (itemRefs.current[idx] = el)}
                        className="relative flex flex-col items-center"
                        aria-label={`${event.year} - ${event.title}`}
                      >
                        {/* “Nút năm” nằm trên đường trục (được coi là mốc liên kết) */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1 : 0.92,
                            opacity: isActive ? 1 : 0.78,
                            y: isActive ? 0 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                          className={[
                            "relative z-10 px-4 md:px-5 py-2 md:py-2.5 rounded-xl border",
                            "font-['Inter'] text-sm md:text-base font-semibold tracking-wide",
                            "shadow-sm transition-colors select-none",
                            // nền đặc để “đè” lên đường trục phía sau, tạo cảm giác gắn kết
                            isActive
                              ? "bg-primary text-primary-foreground border-primary shadow-md"
                              : "bg-card text-primary border-primary/25 hover:border-primary/60",
                          ].join(" ")}
                        >
                          {event.year}
                        </motion.div>

                        {/* “Đinh tán” nhỏ ngay dưới năm để nhìn rõ mốc gắn trên trục */}
                        <div
                          className={[
                            "mt-1 w-2.5 h-2.5 rounded-full border",
                            isActive
                              ? "bg-primary border-primary"
                              : "bg-background border-border",
                          ].join(" ")}
                          aria-hidden="true"
                        />

                        {/* tag */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1 : 0.95,
                            opacity: isActive ? 1 : 0.75,
                          }}
                          transition={{ duration: 0.18 }}
                          className={[
                            "mt-2 text-[11px] md:text-xs px-2 py-1 rounded-full border",
                            "whitespace-nowrap",
                            categoryBadge[event.category] ||
                            "bg-muted/40 text-muted-foreground border-border",
                          ].join(" ")}
                        >
                          {label}
                        </motion.div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gợi ý nhỏ */}
              <div className="mt-2 text-xs text-muted-foreground font-['Inter']">
                Tip: bấm niên đại để trục tự “trượt” và luôn giữ mốc đang đọc ở trung tâm.
              </div>
            </div>

            {/* Detail panel */}
            {activeEvent && (
              <motion.div
                key={activeEvent.id ?? activeIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-8 rounded-2xl border border-border bg-background shadow-lg overflow-hidden"
              >
                {/* Header strip */}
                <div className="px-6 md:px-8 py-5 border-b border-border bg-card/60">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-['Inter'] text-sm font-semibold text-primary">
                      {activeEvent.year}
                    </span>

                    <span
                      className={[
                        "text-xs md:text-sm px-3 py-1 rounded-full border",
                        categoryBadge[activeEvent.category] ||
                        "bg-muted/40 text-muted-foreground border-border",
                      ].join(" ")}
                    >
                      {activeEvent.phase ||
                        categoryLabels[activeEvent.category] ||
                        "Sự kiện"}
                    </span>

                    <div className="h-[1px] flex-1 bg-border" />
                    <div className="text-xs text-muted-foreground font-['Inter']">
                      Mốc {activeIndex + 1}/{safeEvents.length}
                    </div>
                  </div>

                  <h3 className="mt-3 font-['Playfair_Display'] text-2xl md:text-3xl text-foreground">
                    {activeEvent.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                  {/* Layout: ảnh + nội dung */}
                  <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
                    {/* Image card (nhỏ lại, vừa khung) */}
                    {activeEvent.image ? (
                      <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="relative">
                          <img
                            src={activeEvent.image}
                            alt={activeEvent.imageAlt || activeEvent.title}
                            className="w-full h-44 md:h-52 lg:h-56 object-cover"
                            loading="lazy"
                          />
                          {/* Overlay nhẹ cho cảm giác “tư liệu” */}
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
                            }}
                            aria-hidden="true"
                          />
                        </div>

                        {/* Credit */}
                        {activeEvent.imageCredit && (
                          <div className="px-4 py-3 text-xs text-muted-foreground border-t border-border">
                            {activeEvent.imageCredit}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-border bg-card/40 p-6 text-sm text-muted-foreground">
                        Chưa có hình minh hoạ cho mốc này.
                      </div>
                    )}

                    {/* Content */}
                    <div className="min-w-0">
                      {/* Description */}
                      <p className="font-['Inter'] text-base md:text-lg leading-relaxed text-foreground/80">
                        {activeEvent.description}
                      </p>

                      {/* Context + Quote */}
                      {(activeEvent.context || activeEvent.quote) && (
                        <div className="mt-6 grid md:grid-cols-2 gap-4">
                          {activeEvent.context && (
                            <div className="rounded-xl border border-border bg-card/60 p-4">
                              <div className="text-sm font-semibold text-primary mb-2">
                                Bối cảnh
                              </div>
                              <div className="text-sm text-foreground/75 leading-relaxed">
                                {activeEvent.context}
                              </div>
                            </div>
                          )}

                          {activeEvent.quote && (
                            <div className="rounded-xl border border-border bg-card/60 p-4">
                              <div className="text-sm font-semibold text-primary mb-2">
                                Trích dẫn
                              </div>
                              <blockquote className="text-sm italic text-foreground/75 leading-relaxed">
                                “{activeEvent.quote}”
                              </blockquote>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Key events */}
                      {activeEvent.keyEvents && Array.isArray(activeEvent.keyEvents) && (
                        <div className="mt-6 rounded-xl border border-border bg-card/60 p-4">
                          <div className="text-sm font-semibold text-primary mb-2">
                            Sự kiện chính
                          </div>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/75 leading-relaxed">
                            {activeEvent.keyEvents.map((k, i) => (
                              <li key={`${activeEvent.id}-k-${i}`}>{k}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Hint */}
                      <div className="mt-7 text-xs text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
                        Gợi ý: bấm niên đại để trục tự trượt và hiển thị mốc bạn chọn.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </>
        )}
      </div>
    </section>
  );
}
