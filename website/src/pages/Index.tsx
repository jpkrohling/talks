
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturedTalks from "@/components/FeaturedTalks";
import TalksList from "@/components/TalksList";
import Footer from "@/components/Footer";
import talksData from "@/data/talksData";
import { Talk, featuredTalkIds } from "@/types/Talk";

const Index = () => {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [featuredTalks, setFeaturedTalks] = useState<Talk[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this from an API or parse a YAML file
    setTalks(talksData);
    
    // Filter out the featured talks
    const featured = talksData.filter((talk: Talk) => 
      featuredTalkIds.includes(talk.id)
    );
    
    // Sort featured talks to match the order in featuredTalkIds
    const sortedFeatured = featuredTalkIds
      .map(id => featured.find(talk => talk.id === id))
      .filter(Boolean) as Talk[];
      
    setFeaturedTalks(sortedFeatured);
  }, []);

  // Juraci's bio
  const bio = `Juraci Paixão Kröhling is a software engineer, a Governance Committee member for the OpenTelemetry project, and an emeritus maintainer of the Jaeger project. With a deep expertise in observability and open-source development, he has spoken at leading conferences such as KubeCon EU, KubeCon NA, OpenSource Summit, Devoxx Belgium, FOSDEM, and multiple DevOpsDays events.

Passionate about distributed tracing and observability, Juraci helps software engineers build reliable observability pipelines and optimize their applications. As the co-founder of OllyGarden, he continues to shape the future of observability tools while actively contributing to the open-source community.

Outside of work, Juraci is a proud parent of three kids and finds solace in the hobby of sleeping, albeit occasionally interrupted by the delightful chaos of parenting responsibilities.`;

  return (
    <div className="min-h-screen flex flex-col dark">
      <main className="flex-grow">
        <Hero bio={bio} />
        {featuredTalks.length > 0 && <FeaturedTalks talks={featuredTalks} />}
        <TalksList talks={talks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
