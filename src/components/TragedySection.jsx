import { motion } from 'framer-motion';
import { CloudRain, Scale } from 'lucide-react';

export function TragedySection({ data }) {
  if (!data) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-muted-foreground/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muted-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                <CloudRain className="w-10 h-10 text-muted-foreground" />
              </div>
            </motion.div>

            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-muted-foreground mb-4">{data.title}</h2>

            <div className="inline-block px-4 py-2 bg-muted-foreground/10 rounded-full">
              <span className="font-['Inter'] text-lg text-muted-foreground">{data.year}</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-card rounded-lg p-8 md:p-12 border-2 border-muted-foreground/20 shadow-2xl space-y-8"
          >
            <div>
              <h3 className="font-['Playfair_Display'] text-2xl text-foreground mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-muted-foreground rounded" />
                Bi kịch
              </h3>
              <p className="font-['Inter'] text-lg leading-relaxed text-foreground/80">{data.summary}</p>
            </div>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-border" />
              <Scale className="w-6 h-6 text-muted-foreground" />
              <div className="h-px flex-1 bg-border" />
            </div>

            <div>
              <h3 className="font-['Playfair_Display'] text-2xl text-foreground mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-accent rounded" />
                Minh oan
              </h3>
              <p className="font-['Inter'] text-lg leading-relaxed text-foreground/80">{data.vindication}</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 border-l-4 border-primary">
              <p className="font-['Playfair_Display'] text-lg italic text-primary leading-relaxed">{data.reflection}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-muted-foreground mb-2" />
              <span className="font-['Inter'] text-sm text-muted-foreground">1442</span>
              <p className="font-['Inter'] text-xs text-muted-foreground mt-1">Xảy ra án</p>
            </div>

            <div className="w-24 h-px bg-border" />

            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-accent mb-2" />
              <span className="font-['Inter'] text-sm text-accent">1464</span>
              <p className="font-['Inter'] text-xs text-muted-foreground mt-1">Minh oan</p>
            </div>

            <div className="w-24 h-px bg-border" />

            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-primary mb-2" />
              <span className="font-['Inter'] text-sm text-primary">Hôm nay</span>
              <p className="font-['Inter'] text-xs text-muted-foreground mt-1">Di sản</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
