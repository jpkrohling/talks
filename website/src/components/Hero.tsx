
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeroProps {
  bio: string;
}

const Hero = ({ bio }: HeroProps) => {
  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.2),transparent_60%)] opacity-80"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur rounded-full"></div>
            <Avatar className="h-40 w-40 md:h-56 md:w-56 border-4 border-background relative">
              <AvatarImage src="/headshot.jpg" alt="Juraci Paixão Kröhling" />
              <AvatarFallback className="text-4xl">JPK</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Juraci Paixão Kröhling</h1>
            <div className="text-lg md:text-xl text-foreground/80 space-y-4 whitespace-pre-line">
              {bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
