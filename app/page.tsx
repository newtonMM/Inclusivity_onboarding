import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-gradient-hero text-hero-text overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-hero-bg/90 via-hero-bg/95 to-primary/90" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://inclusivitysolutions.com/wp-content/uploads/2024/04/inclusive-logo.png"
              alt="Inclusivity Solutions Logo"
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight text-[#383838]">
              Embedded Insurance Solutions
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#383838] ">
              for an Emerging Africa
            </h2>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <div className="pt-4">
              <Button
                variant="default"
                size="lg"
                className="bg-[#FBA92D] hover:bg-orange-500 rounded-lg text-base px-4 py-2 h-auto transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/purchase-product">Issue a Policy</Link>
              </Button>
            </div>
            <div className="pt-4">
              <Button
                variant="default"
                size="lg"
                className="bg-[#FBA92D] hover:bg-orange-500 rounded-lg text-base px-4 py-2 h-auto transform hover:scale-105 transition-all duration-300"
              >
                <Link
                  href="https://inclusivitysolutions.com/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-hero-accent/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-primary/20 rounded-full blur-lg" />
    </section>
  );
};

export default Home;
