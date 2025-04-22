
import { Talk } from "@/types/Talk";
import TalkCard from "./TalkCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TalksListProps {
  talks: Talk[];
}

const TalksList = ({ talks }: TalksListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTalks = talks.filter(talk => 
    talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talk.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talk.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 px-4 md:px-8 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">All Talks</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search talks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {filteredTalks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No talks found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TalksList;
