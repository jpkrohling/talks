
import { Talk } from "@/types/Talk";
import TalkCard from "./TalkCard";

interface FeaturedTalksProps {
  talks: Talk[];
}

const FeaturedTalks = ({ talks }: FeaturedTalksProps) => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">Featured Talks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {talks.map((talk, index) => (
            <TalkCard key={talk.id} talk={talk} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTalks;
