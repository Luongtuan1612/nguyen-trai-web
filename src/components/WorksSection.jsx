import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export function WorksSection({ works = [] }) {
  const [expandedWork, setExpandedWork] = useState(null);

  const toggleWork = (id) => setExpandedWork((cur) => (cur === id ? null : id));

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-primary mb-4">Tác phẩm tiêu biểu</h2>
          <p className="font-['Inter'] text-lg text-muted-foreground max-w-2xl mx-auto">
            Những tác phẩm có ảnh hưởng lớn đến văn hoá, tư tưởng và bản sắc dân tộc.
          </p>
        </motion.div>

        {works.length === 0 ? (
          <div className="bg-card rounded-lg p-10 border-2 border-dashed border-primary/20 text-center text-muted-foreground">
            Chưa có dữ liệu tác phẩm.
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {works.map((work, index) => {
              const isExpanded = expandedWork === work.id;

              return (
                <motion.div
                  key={work.id ?? index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.6 }}
                  className="group"
                >
                  <div
                    className={`bg-card rounded-lg border-2 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                      isExpanded ? 'border-primary/40' : 'border-primary/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleWork(work.id)}
                      className="w-full p-8 flex items-start gap-6 hover:bg-primary/5 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-20 h-24 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                            isExpanded ? 'rotate-3 scale-105' : 'group-hover:rotate-3'
                          }`}
                        >
                          <BookOpen className="w-10 h-10 text-primary-foreground" />
                        </div>
                      </div>

                      <div className="flex-1 text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-foreground mb-2">
                              {work.title}
                            </h3>
                            <p className="font-['Playfair_Display'] text-lg text-muted-foreground italic mb-2">
                              {work.subtitle}
                            </p>
                            <span className="inline-block px-3 py-1 bg-primary/10 rounded-full font-['Inter'] text-sm text-primary">
                              {work.year}
                            </span>
                          </div>

                          <div className="text-primary">{isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}</div>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-8 pb-8 pt-4 border-t border-border space-y-6">
                            <div>
                              <h4 className="font-['Inter'] text-sm font-semibold text-primary mb-2">Giới thiệu</h4>
                              <p className="font-['Inter'] text-base leading-relaxed text-foreground/80">{work.description}</p>
                            </div>

                            <div>
                              <h4 className="font-['Inter'] text-sm font-semibold text-primary mb-2">Giá trị/ý nghĩa</h4>
                              <p className="font-['Inter'] text-base leading-relaxed text-foreground/80">{work.importance}</p>
                            </div>

                            <div>
                              <h4 className="font-['Inter'] text-sm font-semibold text-primary mb-3">Chủ đề</h4>
                              <div className="flex flex-wrap gap-2">
                                {(work.themes || []).map((theme) => (
                                  <span
                                    key={theme}
                                    className="px-4 py-2 bg-secondary rounded-full font-['Inter'] text-sm text-secondary-foreground"
                                  >
                                    {theme}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative">
            <div className="w-32 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary/30 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary/40" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-['Inter'] text-xs font-semibold shadow-lg">
              {works.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
