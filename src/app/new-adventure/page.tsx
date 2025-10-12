import { Train } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("/assets/trains-bg.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/65 to-background/75" />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <Train className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
        
        <h1 className="font-serif font-bold text-5xl md:text-7xl mb-6 text-foreground">
          EM CONSTRUÇÃO - LOBBY
        </h1>
        
        <p className="font-sans text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
          Embarque em uma aventura ferroviária épica ao redor do mundo
        </p>
        
        <div className="flex flex-row sm:flex-row gap-4 justify-center ">
          <Link href="/new-adventure" className="flex items-center justify-center rounded-md h-10 w-60 px-8 font-sans bg-primary text-primary-foreground font-semibold text-lg shadow-elegant hover:shadow-xl transition-all duration-300"
          >
            Iniciar Aventura
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
