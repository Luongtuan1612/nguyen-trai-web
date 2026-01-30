import { motion } from 'framer-motion';
import { GraduationCap, Landmark, Building, Flag, Award } from 'lucide-react';

const iconMap = {
  graduationCap: GraduationCap,
  landmark: Landmark,
  building: Building,
  flag: Flag,
};

export function LegacySection({ data }) {
  if (!data) return null;

  const categories = data.categories || [];
  const unesco = data.unesco || null;

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-primary mb-4">Di sản & ảnh hưởng</h2>
          <p className="font-['Inter'] text-lg text-muted-foreground max-w-2xl mx-auto">
            Tầm ảnh hưởng bền lâu qua nhiều thế kỷ – trong giáo dục, văn hoá và bản sắc dân tộc.
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <div className="bg-background rounded-lg p-10 border-2 border-dashed border-primary/20 text-center text-muted-foreground">
            Chưa có dữ liệu di sản.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Landmark;

              return (
                <motion.div
                  key={category.id ?? index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-background rounded-lg p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-['Playfair_Display'] text-2xl text-foreground mb-3">{category.title}</h3>
                        <p className="font-['Inter'] text-base leading-relaxed text-foreground/80">{category.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {unesco && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="max-w-4xl mx-auto">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

              <div className="relative bg-gradient-to-br from-primary to-accent rounded-lg p-1 shadow-2xl">
                <div className="bg-card rounded-lg p-8 md:p-12">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="inline-block mb-6"
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                        <Award className="w-12 h-12 text-primary-foreground" />
                      </div>
                    </motion.div>

                    <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-primary mb-4">
                      Ghi nhận của UNESCO
                    </h3>

                    <div className="inline-block px-6 py-3 bg-primary/10 rounded-full mb-6">
                      <span className="font-['Inter'] text-xl font-semibold text-primary">{unesco.year}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="font-['Playfair_Display'] text-xl text-foreground leading-relaxed">{unesco.recognition}</p>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <p className="font-['Inter'] text-lg text-center text-muted-foreground">{unesco.significance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16"
        >
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2" />
              <div className="relative flex justify-between items-center">
                {[
                  { year: 'TK XV', label: 'Tác phẩm & chính trị' },
                  { year: 'TK XVI–XIX', label: 'Biểu tượng văn hoá' },
                  { year: 'TK XX', label: 'Biểu tượng dân tộc' },
                  { year: 'TK XXI', label: 'Di sản toàn cầu' },
                ].map((point, index) => (
                  <motion.div
                    key={point.year}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary shadow-lg mb-3" />
                    <span className="font-['Inter'] text-sm font-semibold text-primary whitespace-nowrap">{point.year}</span>
                    <span className="font-['Inter'] text-xs text-muted-foreground text-center mt-1 max-w-[90px]">
                      {point.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
