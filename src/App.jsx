import { useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { MapSection } from './components/MapSection';
import { IdeologySection } from './components/IdeologySection';
import { WorksSection } from './components/WorksSection';
import { TragedySection } from './components/TragedySection';
import { LegacySection } from './components/LegacySection';
import { Footer } from './components/Footer';
import data from './data/nguyen-trai-data.json';

export default function App() {
  const timelineRef = useRef(null);

  const scrollToTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationSections = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'map', label: 'Geography' },
    { id: 'ideology', label: 'Ideology' },
    { id: 'works', label: 'Works' },
    { id: 'legacy', label: 'Legacy' },
  ];

  return (
    <div className="min-h-screen font-['Inter'] antialiased">
      {/* Navigation */}
      <Navigation sections={navigationSections} />

      {/* Hero Section */}
      <HeroSection data={data.hero} onExploreClick={scrollToTimeline} />

      {/* Timeline Section */}
      <div ref={timelineRef} id="timeline">
        <TimelineSection events={data.timeline} />
      </div>

      {/* Map Section */}
      <div id="map">
        <MapSection locations={data.locations} />
      </div>

      {/* Ideology Section */}
      <div id="ideology">
        <IdeologySection ideologies={data.ideology} />
      </div>

      {/* Works Section */}
      <div id="works">
        <WorksSection works={data.works} />
      </div>

      {/* Tragedy Section */}
      <TragedySection data={data.tragedy} />

      {/* Legacy Section */}
      <div id="legacy">
        <LegacySection data={data.legacy} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
