import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scroll, Award, Swords, BookOpen, Scale, Flower2 } from 'lucide-react';

const categoryIcons = {
  early: Scroll,
  resistance: Swords,
  literary: BookOpen,
  governance: Scale,
  tragedy: Flower2,
  legacy: Award,
};

const categoryColors = {
  early: 'bg-chart-3',
  resistance: 'bg-destructive',
  literary: 'bg-accent',
  governance: 'bg-primary',
  tragedy: 'bg-muted-foreground',
  legacy: 'bg-chart-2',
};

export function TimelineSection({ events = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0] || null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="timeline" className="py-24 bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-primary mb-4">Dòng thời gian</h2>
          <p className="font-['Inter'] text-lg text-muted-foreground max-w-2xl mx-auto">
            Những cột mốc quan trọng trong cuộc đời Nguyễn Trãi và bối cảnh lịch sử Đại Việt thời Lê sơ.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="bg-background rounded-lg p-10 border-2 border-dashed border-primary/20 text-center text-muted-foreground">
            Chưa có dữ liệu dòng thời gian.
          </div>
        ) : (
          <>
            {/* Timeline */}
            <div className="relative mb-12">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-border transform -translate-y-1/2" />
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2"
                style={{ width: progressWidth }}
              />

              <div className="relative flex justify-between items-center">
                {events.map((event, index) => {
                  const Icon = categoryIcons[event.category] || Scroll;
                  const isSelected = selectedEvent?.id === event.id;

                  return (
                    <motion.button
                      key={event.id ?? index}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="relative flex flex-col items-center group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.08 }}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                        ${
                          isSelected
                            ? `${categoryColors[event.category] || 'bg-primary'} scale-110`
                            : 'bg-card border-2 border-primary/30 group-hover:border-primary'
                        }`}
                      >
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
                      </div>

                      <div className="mt-4 text-center">
                        <span
                          className={`font-['Inter'] text-sm font-medium ${
                            isSelected ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {event.year}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Details */}
            {selectedEvent && (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="bg-background rounded-lg p-8 md:p-12 border-2 border-primary/20 shadow-xl max-w-4xl mx-auto"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-20 h-20 rounded-lg ${
                      categoryColors[selectedEvent.category] || 'bg-primary'
                    } flex items-center justify-center flex-shrink-0`}
                  >
                    {(() => {
                      const Icon = categoryIcons[selectedEvent.category] || Scroll;
                      return <Icon className="w-10 h-10 text-white" />;
                    })()}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-['Inter'] text-lg text-primary font-semibold">{selectedEvent.year}</span>
                      <div className="h-1 flex-1 bg-border" />
                    </div>

                    <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-foreground mb-4">
                      {selectedEvent.title}
                    </h3>

                    <p className="font-['Inter'] text-lg leading-relaxed text-foreground/80">
                      {selectedEvent.description}
                    </p>
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
