import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home as HomeIcon, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-garden-villa.jpg), linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
              Find Your Dream Property
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Discover beautiful homes for sale and rent. Your next adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 shadow-lg">
                <Link href="/buy">
                  <HomeIcon className="mr-2 h-5 w-5" />
                  Browse Properties
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg">
                <Link href="/rent">
                  <Search className="mr-2 h-5 w-5" />
                  Find Rentals
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <HomeIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Buy Properties</h3>
            <p className="text-muted-foreground">
              Explore our curated selection of properties for sale. Find your perfect home.
            </p>
            <Button asChild variant="link">
              <Link href="/buy">View Properties →</Link>
            </Button>
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Rent Properties</h3>
            <p className="text-muted-foreground">
              Discover rental properties that match your lifestyle and budget.
            </p>
            <Button asChild variant="link">
              <Link href="/rent">Find Rentals →</Link>
            </Button>
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Expert Guidance</h3>
            <p className="text-muted-foreground">
              Get professional advice and support throughout your property journey.
            </p>
            <Button asChild variant="link">
              <Link href="/login">Get Started →</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

