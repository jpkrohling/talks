import { Calendar, MapPin, ExternalLink, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Talk } from "@/types/Talk";
import TalkDetail from "./TalkDetail";
import { formatDate } from "@/lib/utils";

interface TalkCardProps {
  talk: Talk;
  featured?: boolean;
}

const TalkCard = ({ talk, featured = false }: TalkCardProps) => {
  return (
    <Dialog>
      <Card className={`h-full flex flex-col transition-all duration-300 hover:border-primary/50 ${featured ? 'glass-card animate-fade-in' : ''}`}>
        <CardHeader>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 text-talks-date" />
            <span className="text-sm">{formatDate(talk.date)}</span>
          </div>
          <CardTitle className={`${featured ? 'text-gradient text-2xl md:text-3xl' : ''}`}>{talk.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-talks-location" />
            <span>{talk.location}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {talk.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          <div className="flex items-center gap-2">
            {talk.recording && (
              <Video className="h-4 w-4 text-talks-accent" />
            )}
          </div>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <span>View Details</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <TalkDetail talk={talk} />
    </Dialog>
  );
};

export default TalkCard;
