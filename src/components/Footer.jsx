import { motion } from 'framer-motion';
import { BookOpen, School } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Giới thiệu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6" />
              <h3 className="font-['Playfair_Display'] text-xl">Về dự án</h3>
            </div>
            <p className="font-['Inter'] text-sm leading-relaxed opacity-90">
              Trang web kể chuyện – trực quan hoá lịch sử nhằm giới thiệu cuộc đời, tư tưởng và di sản của Nguyễn Trãi.
              Nội dung có thể được dùng như tài liệu tham khảo học tập.
            </p>
          </motion.div>

          {/* Nguồn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="font-['Playfair_Display'] text-xl mb-4">Nguồn tư liệu</h3>
            <ul className="font-['Inter'] text-sm space-y-2 opacity-90">
              <li>• Đại Việt Sử Ký Toàn Thư</li>
              <li>• Các tuyển tập/khảo cứu về Nguyễn Trãi</li>
              <li>• Tư liệu lưu trữ & nghiên cứu văn học</li>
              <li>• Các trang/bài viết giáo dục lịch sử</li>
            </ul>
          </motion.div>

          {/* Thông tin học thuật */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <School className="w-6 h-6" />
              <h3 className="font-['Playfair_Display'] text-xl">Dành cho học tập</h3>
            </div>
            <div className="font-['Inter'] text-sm space-y-2 opacity-90">
              <p>Thiết kế phục vụ trình bày, thuyết minh và học liệu số.</p>
              <p className="text-xs opacity-75 mt-4">
                Nếu bạn cần trích dẫn học thuật, vui lòng đối chiếu thêm với sách/nguồn gốc.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Thanh cuối */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-8 border-t border-primary-foreground/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-['Inter'] text-sm opacity-90">© {currentYear} Website Nguyễn Trãi</p>
            <p className="font-['Inter'] text-sm opacity-75">Xây dựng với React + Vite</p>
          </div>
        </motion.div>

        {/* Trang trí */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block" aria-hidden="true">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="opacity-30">
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" />
              <path d="M30 15 L30 45 M15 30 L45 30" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
