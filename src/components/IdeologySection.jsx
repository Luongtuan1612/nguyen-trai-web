import { motion } from 'framer-motion';
import { Heart, Users, Brain, Scale, Flag, BookOpen } from 'lucide-react';

const iconMap = {
  heart: Heart,
  users: Users,
  brain: Brain,
  scale: Scale,
  flag: Flag,
  bookOpen: BookOpen,
};

export function IdeologySection({ ideologies = [] }) {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Nền trang trí */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-primary mb-4">Tư tưởng & đóng góp</h2>
          <p className="font-['Inter'] text-lg text-muted-foreground max-w-2xl mx-auto">
            Những nguyên lý cốt lõi thể hiện tầm nhìn của Nguyễn Trãi về quốc gia, nhân dân và đạo trị nước.
          </p>
        </motion.div>

        {ideologies.length === 0 ? (
          <div className="bg-background rounded-lg p-10 border-2 border-dashed border-primary/20 text-center text-muted-foreground">
            Chưa có dữ liệu tư tưởng/đóng góp.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideologies.map((item, index) => {
              const Icon = iconMap[item.icon] || BookOpen;

              return (
                <motion.div
                  key={item.id ?? index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group"
                >
                  <div className="bg-background rounded-lg p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>

                    <h3 className="font-['Playfair_Display'] text-2xl text-foreground mb-4">{item.title}</h3>

                    <p className="font-['Inter'] text-base leading-relaxed text-foreground/80 mb-6 flex-1">
                      {item.description}
                    </p>

                    <div className="pt-6 border-t border-border">
                      <div className="relative">
                        <span className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif">"</span>
                        <p className="font-['Playfair_Display'] text-sm italic text-primary pl-6">{item.quote}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Trích dẫn nổi bật */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-lg p-12 border-l-4 border-primary">
            <div className="flex items-start justify-center mb-4">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-primary mb-4">Lấy dân làm gốc</h3>
            <p className="font-['Inter'] text-base text-muted-foreground max-w-2xl mx-auto">
              Tư tưởng xuyên suốt của Nguyễn Trãi: việc trị nước phải hướng đến an dân, dưỡng dân; người làm quan phải lấy đạo đức và trách nhiệm với muôn dân làm chuẩn mực.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
