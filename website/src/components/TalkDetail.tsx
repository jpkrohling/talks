import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Talk } from "@/types/Talk";
import { formatDate } from "@/lib/utils";

interface TalkDetailProps {
  talk: Talk;
}

// Function to convert YouTube URLs to embed format
const getYouTubeEmbedUrl = (url: string): string => {
  // Handle youtu.be short links
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Handle regular youtube.com links
  if (url.includes('youtube.com/watch')) {
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // If it's already an embed URL or not a YouTube URL, return as is
  return url;
};

const TalkDetail = ({ talk }: TalkDetailProps) => {
  return (
    <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-gradient text-2xl md:text-3xl">
          {talk.title}
        </DialogTitle>
        <DialogDescription className="flex flex-col md:flex-row justify-between md:items-center gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-talks-date" />
            <span>{formatDate(talk.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-talks-location" />
            <span>{talk.location}</span>
          </div>
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="prose prose-invert max-w-none">
          <p className="text-foreground/90 whitespace-pre-line">{talk.description}</p>
        </div>

        {talk.recording && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary">Recording</h4>
            <div className="aspect-video w-full overflow-hidden rounded-lg border">
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(talk.recording)}
                title={talk.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="bg-black/10"
              ></iframe>
            </div>
          </div>
        )}

        {talk.slides && (
          <div className="flex justify-start">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={talk.slides} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                <span>View Slides</span>
              </a>
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default TalkDetail;
