import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "../assets/images/nguyen-trai.jpg";

export function HeroSection({ data, onExploreClick }) {
  const safe = data || {
    title: "Nguyễn Trãi",
    subtitle: "Danh nhân văn hoá – anh hùng dân tộc",
    years: "1380–1442",
    intro:
      "Trang giới thiệu tổng quan về cuộc đời, tư tưởng và di sản của Nguyễn Trãi qua dòng thời gian, địa danh, tác phẩm và dấu ấn lịch sử.",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Nền hoạ tiết */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%238b4513%27 fill-opacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 pt-20 md:pt-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Cột trái (đẩy lên trên 30px) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="-translate-y-[30px]"
          >
            {/* Tên ở trên */}
            <h1 className="font-['Playfair_Display'] text-6xl md:text-7xl lg:text-8xl text-primary mb-3">
              {safe.title}
            </h1>

            {/* Năm sinh – mất ngay dưới tên */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-5"
            >
              <span className="text-primary font-['Inter'] font-medium tracking-wide">
                {safe.years}
              </span>
            </motion.div>

            {/* Subtitle */}
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-muted-foreground mb-5">
              {safe.subtitle}
            </h2>

            {/* Intro */}
            <p className="font-['Inter'] text-lg leading-relaxed text-foreground/80 mb-7 max-w-xl">
              {safe.intro}
            </p>

            <button
              type="button"
              onClick={onExploreClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 md:py-5 font-['Inter'] shadow-lg hover:shadow-xl transition-all rounded-lg"
            >
              Khám phá cuộc đời
            </button>
          </motion.div>

          {/* Cột phải (khung ảnh nhỏ lại) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* giảm max-width + giảm padding khung */}
            <div className="relative aspect-square max-w-[320px] md:max-w-[360px] mx-auto">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-lg transform rotate-3" />
              <div className="absolute inset-0 border-4 border-accent/20 rounded-lg transform -rotate-3" />

              <div className="relative bg-card rounded-lg p-4 md:p-5 shadow-2xl border-2 border-primary/30">
                {/* ảnh nhỏ hơn: giảm aspect + chiều cao cảm nhận */}
                <div className="aspect-[3/4] rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                  <img
                    src={heroImg}
                    alt="Chân dung Nguyễn Trãi"
                    className="relative z-10 h-full w-full object-cover"
                    loading="eager"
                  />
                </div>

                <div className="mt-3 text-center">
                  <p className="font-['Playfair_Display'] text-sm text-muted-foreground">
                    Chân dung Nguyễn Trãi
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gợi ý cuộn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
