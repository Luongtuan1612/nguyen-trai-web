import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

export function MapSection({ locations = [] }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Chiếu đơn giản toạ độ (ước lượng) lên SVG.
  const projectCoordinates = (lat, lng) => {
    // Vietnam bounds approx: lat 8-24, lng 102-110
    const x = ((lng - 102) / 8) * 400 + 100;
    const y = ((24 - lat) / 16) * 600 + 50;
    return { x, y };
  };

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
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-primary mb-4">Địa lý gắn với cuộc đời</h2>
          <p className="font-['Inter'] text-lg text-muted-foreground max-w-2xl mx-auto">
            Chọn một địa danh để xem bối cảnh lịch sử và ý nghĩa của địa điểm đó.
          </p>
        </motion.div>

        {locations.length === 0 ? (
          <div className="bg-card rounded-lg p-10 border-2 border-dashed border-primary/20 text-center text-muted-foreground">
            Chưa có dữ liệu địa danh.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-card rounded-lg p-8 border-2 border-primary/20 shadow-xl">
                <svg viewBox="0 0 600 700" className="w-full h-auto" style={{ maxHeight: '700px' }}>
                  <path
                    d="M 300 50 Q 320 80 330 120 L 340 180 Q 350 220 360 260 L 370 320 Q 380 380 370 440 L 360 500 Q 340 560 320 600 L 300 650 Q 280 600 260 560 L 240 500 Q 220 440 230 380 L 240 320 Q 250 260 240 220 L 230 180 Q 220 120 240 80 Q 260 50 300 50 Z"
                    fill="rgba(139, 69, 19, 0.05)"
                    stroke="rgba(139, 69, 19, 0.3)"
                    strokeWidth="2"
                  />

                  {locations.map((location, index) => {
                    const { x, y } = projectCoordinates(location.coordinates?.lat, location.coordinates?.lng);
                    const isSelected = selectedLocation?.id === location.id;

                    return (
                      <g key={location.id ?? index}>
                        <motion.circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 12 : 8}
                          fill={isSelected ? '#8b4513' : '#b8860b'}
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedLocation(location)}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.08, duration: 0.5 }}
                          whileHover={{ scale: 1.3 }}
                        />
                        <motion.text
                          x={x}
                          y={y - 20}
                          textAnchor="middle"
                          className="font-['Inter'] text-xs fill-primary pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.08 + 0.25 }}
                        >
                          {location.name}
                        </motion.text>

                        {isSelected && (
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={12}
                            fill="none"
                            stroke="#8b4513"
                            strokeWidth="2"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                <div className="mt-6 flex flex-wrap gap-3">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-full font-['Inter'] text-sm transition-all ${
                        selectedLocation?.id === location.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
                      }`}
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              {selectedLocation ? (
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="bg-card rounded-lg p-8 border-2 border-primary/20 shadow-xl"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-['Playfair_Display'] text-3xl text-foreground mb-1">{selectedLocation.name}</h3>
                        <p className="font-['Inter'] text-sm text-muted-foreground">{selectedLocation.region}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedLocation(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Đóng"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-['Inter'] text-sm font-semibold text-primary mb-2">Bối cảnh</h4>
                      <p className="font-['Inter'] text-base leading-relaxed text-foreground/80">{selectedLocation.description}</p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-['Inter'] text-sm font-semibold text-primary mb-2">Ý nghĩa</h4>
                      <p className="font-['Inter'] text-base leading-relaxed text-foreground/80">{selectedLocation.significance}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-card rounded-lg p-8 border-2 border-dashed border-primary/20">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="font-['Inter'] text-lg">Hãy chọn một địa danh trên bản đồ để xem chi tiết.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
