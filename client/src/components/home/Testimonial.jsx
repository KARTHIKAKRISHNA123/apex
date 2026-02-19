import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import Title from "./Title";

const testimonials = [
  {
    quote:
      "I applied to 50 companies with my old resume and got zero callbacks. I built a new one here in 10 minutes and got an interview at Netflix the next day.",
    author: "Alex Chen",
    role: "Senior Frontend Engineer",
    company: "Netflix",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    quote:
      "The ATS checker is a lifesaver. It found formatting errors I didn't even know existed. Finally, a tool that actually understands what recruiters need.",
    author: "Sarah Jenkins",
    role: "Product Manager",
    company: "Stripe",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    quote:
      "Minimalist, clean, and no watermarks. This is exactly what I needed. The Markdown support makes editing my experience so much faster.",
    author: "David Park",
    role: "Backend Developer",
    company: "Amazon",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    quote:
      "Switched from Canva to this and never looked back. The templates are clean, ATS-friendly, and the AI suggestions are actually useful.",
    author: "Priya Sharma",
    role: "Full Stack Developer",
    company: "Google",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
  {
    quote:
      "Got three offers in two weeks after rebuilding my resume here. The one-page enforcer saved me from myself — I used to write essays.",
    author: "Marcus Williams",
    role: "DevOps Engineer",
    company: "Meta",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    quote:
      "The PDF export is pixel-perfect. Every recruiter I've spoken to commented on how clean my resume looked. Worth every second.",
    author: "Emily Zhang",
    role: "ML Engineer",
    company: "OpenAI",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
];

const Testimonial = () => {
  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Title using your existing Title component */}
      <div className="max-w-7xl mx-auto px-6">
        <Title
          title={
            <>
              Loved by <span className="text-zinc-400">Engineers</span>
            </>
          }
          subtitle="Join thousands of developers who are getting hired at top tech companies."
        />
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors group relative h-full">
                  {/* Decorative Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-7 h-7 text-zinc-800 group-hover:text-zinc-700 transition-colors" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-zinc-300 leading-relaxed mb-8 text-sm">
                    "{item.quote}"
                  </p>

                  {/* Author */}
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.author}
                        className="w-10 h-10 rounded-full bg-zinc-800"
                      />
                      {/* Verified tick */}
                      {/* Verified tick */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-zinc-900">
                        <svg
                          className="w-2.5 h-2.5 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-white text-sm">
                          {item.author}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-500">
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
