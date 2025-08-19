'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Shield, Users, Zap, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);


  const guaranteeFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "30-day money-back guarantee"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Setup in under 5 minutes"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Dedicated success manager"
    }
  ];

  const companies = [
    "TechCorp", "InnovateX", "StartupHub", "Enterprise Co", "ScaleUp Inc"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(ctaRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      gsap.set(guaranteeRef.current?.children || [], {
        opacity: 0,
        x: -30
      });

      gsap.set(socialProofRef.current, {
        opacity: 0,
        y: 20
      });



      // Create main timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Main content animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .to(ctaRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to(guaranteeRef.current?.children || [], {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      .to(socialProofRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
;



      // Pulsing effect for main CTA
      gsap.to(ctaRef.current?.children[0], {
        scale: 1.05,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: 2
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-[#371142] via-[#4e0c62] to-[#2d1b35] font-urbanist overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#4e0c62]/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#371142]/40 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl"></div>
        

      </div>

      <div className="relative z-10 container mx-auto px-8 text-center">
        


        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* Urgency Badge */}
          <div className="inline-block mb-8">
            <span className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-purple-400/20 backdrop-blur-sm border border-purple-300/30 text-purple-200 text-sm font-semibold shadow-lg">
              Limited Time: 50% Off First 3 Months
            </span>
          </div>

          {/* Title */}
          <div ref={titleRef} className="mb-8">
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Ready to Transform
              <span className="block text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-200 bg-clip-text mt-2">
                Your Business?
              </span>
            </h2>
          </div>
          
          {/* Subtitle */}
          <div ref={subtitleRef} className="mb-12">
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join 10,000+ companies already using AI Voice Bot to deliver exceptional customer experiences. 
              Start your free trial today—no credit card required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-[#371142] hover:bg-white/90 font-bold px-10 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl hover:scale-105 border-2 border-white/20 group"
            >
              Start Free Trial
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-white border-white/50 hover:bg-white/10 font-semibold px-10 py-6 text-xl backdrop-blur-sm rounded-2xl transition-all duration-300 hover:border-purple-300/70 hover:shadow-lg hover:scale-105 bg-white/5 group"
            >
              <Calendar className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              Book Demo
            </Button>
          </div>

          {/* Guarantee Features */}
          <div ref={guaranteeRef} className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            {guaranteeFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-white/80 group">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-purple-300/50 transition-shadow duration-300">
                  {feature.icon}
                </div>
                <span className="font-medium group-hover:text-white transition-colors duration-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div ref={socialProofRef} className="space-y-6">
            
            {/* Stars */}
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-3 text-white/80 font-medium">4.9/5 from 2,500+ reviews</span>
            </div>

            {/* Companies */}
            <div>
              <p className="text-white/60 mb-4 text-lg">
                Trusted by innovative companies worldwide:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {companies.map((company, index) => (
                  <div 
                    key={company}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/70 font-medium hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>

            {/* Final assurance */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-purple-200 text-lg font-medium">
                No setup fees • Cancel anytime • 24/7 support included
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
