import { useRef } from "react";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { TimelineSection } from "./components/TimelineSection";
import { MapSection } from "./components/MapSection";
import { IdeologySection } from "./components/IdeologySection";
import { WorksSection } from "./components/WorksSection";
import { TragedySection } from "./components/TragedySection";
import { LegacySection } from "./components/LegacySection";
import { Footer } from "./components/Footer";

import data from "./data/nguyen-trai-data.json";

export default function App() {
  const timelineRef = useRef(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigationSections = [
    { id: "timeline", label: "Dòng thời gian" },
    { id: "map", label: "Địa danh" },
    { id: "ideology", label: "Tư tưởng" },
    { id: "works", label: "Tác phẩm" },
    { id: "legacy", label: "Di sản" },
  ];

  return (
    <div className="min-h-screen font-['Inter'] antialiased bg-background text-foreground">
      <Navigation sections={navigationSections} />

      <HeroSection data={data.hero} onExploreClick={scrollToTimeline} />

      {/* Nền xen kẽ full-width */}
      <section id="timeline" ref={timelineRef} className="bg-background">
        <TimelineSection events={data.timeline} />
      </section>

      <section id="map" className="bg-card">
        <MapSection locations={data.locations} />
      </section>

      <section id="ideology" className="bg-background">
        <IdeologySection ideologies={data.ideology} />
      </section>

      <section id="works" className="bg-card">
        <WorksSection works={data.works} />
      </section>

      {/* Tragedy giữ nguyên (component tự xử lý nền nếu có) */}
      <TragedySection data={data.tragedy} />

      <section id="legacy" className="bg-background">
        <LegacySection data={data.legacy} />
      </section>

      <Footer />
    </div>
  );
}
