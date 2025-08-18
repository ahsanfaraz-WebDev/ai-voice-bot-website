'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CoreFeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(featuresRef.current?.children || [], {
        opacity: 0,
        y: 40,
        scale: 0.95
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

      // Animate elements
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .to(featuresRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // GSAP Card Effects
    const cards = featuresRef.current?.children;
    if (!cards) return;

    Array.from(cards).forEach((card, index) => {
      const cardElement = card as HTMLElement;
      
      // Hover animations
      cardElement.addEventListener("mouseenter", () => {
        gsap.to(cardElement, {
          y: -10,
          scale: 1.02,
          rotationY: 5,
          rotationX: 5,
          duration: 0.4,
          ease: "power2.out",
        });
        
        // Animate the icon
        const icon = cardElement.querySelector('.card-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        // Animate the highlight badge
        const badge = cardElement.querySelector('.highlight-badge');
        if (badge) {
          gsap.to(badge, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        }
      });

      cardElement.addEventListener("mouseleave", () => {
        gsap.to(cardElement, {
          y: 0,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        // Reset icon
        const icon = cardElement.querySelector('.card-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        // Reset badge
        const badge = cardElement.querySelector('.highlight-badge');
        if (badge) {
          gsap.to(badge, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    return () => {
      // Cleanup event listeners
      Array.from(cards).forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.removeEventListener("mouseenter", () => {});
        cardElement.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
          <path d="M2 17L12 22L22 17"/>
          <path d="M2 12L12 17L22 12"/>
        </svg>
      ),
      title: "Advanced AI Engine",
      description: "Powered by cutting-edge machine learning algorithms for natural conversation flow. Our AI understands context, intent, and emotion to deliver human-like interactions that feel genuine and helpful.",
      highlight: "Next-Gen AI"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
          <rect x="2" y="9" width="20" height="11" rx="2" ry="2"/>
        </svg>
      ),
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with GDPR, HIPAA, and SOC 2 standards. Your data is protected with end-to-end encryption and stored in secure, certified data centers.",
      highlight: "100% Secure"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
        </svg>
      ),
      title: "Real-Time Analytics",
      description: "Deep insights into conversation patterns, user behavior, and performance metrics. Monitor your bot's performance with detailed dashboards and actionable intelligence.",
      highlight: "Live Data"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      title: "Smart Customization",
      description: "Tailor every aspect of your voice bot to match your brand and business needs. From voice selection to conversation flows, everything is customizable to your specifications.",
      highlight: "Fully Customizable"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Multi-Channel Support",
      description: "Deploy across phone, web, mobile, and messaging platforms seamlessly. One bot, multiple channels - reach your customers wherever they are with consistent experiences.",
      highlight: "Omnichannel"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18l-2 13H5L3 6z"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      title: "API-First Architecture",
      description: "Robust RESTful APIs and webhooks for seamless third-party integrations. Connect with your existing tools and workflows with our developer-friendly architecture.",
      highlight: "Developer Friendly"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-[#2d1b35] via-[#371142] to-[#4e0c62] font-urbanist overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#2d1b35] to-transparent"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/8 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-white/20 rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-purple-300/30 rounded-full"></div>
        <div className="absolute top-2/3 left-1/6 w-16 h-16 bg-white/10 rotate-12"></div>
      </div>



      <div className="relative z-10 container mx-auto px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div ref={titleRef} className="mb-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Core 
              <span className="block text-transparent bg-gradient-to-r from-purple-300 via-purple-100 to-white bg-clip-text mt-2">
                Features
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Powerful capabilities that set our AI voice platform apart from the competition
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative cursor-pointer"
            >
              <div className="card-main relative h-full min-h-[300px] bg-gradient-to-br from-[#2a1532] to-[#1f0d28] border border-purple-300/30 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-purple-300/60 hover:shadow-xl hover:shadow-purple-500/20">
                
                {/* Light Purple Background Indicator */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-purple-300/8 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* White Accent Border */}
                <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-white/40 transition-colors duration-300"></div>

                {/* Highlight Badge */}
                <div className="highlight-badge absolute top-4 right-4 bg-white text-[#371142] text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  {feature.highlight}
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col">
                  
                  {/* Icon */}
                  <div className="card-icon mb-6 w-14 h-14 bg-white/10 border border-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/15 group-hover:border-white/50 transition-all duration-300">
                    <div className="w-7 h-7 text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="mt-4 w-full h-px bg-gradient-to-r from-purple-400/40 via-white/30 to-transparent group-hover:from-purple-300/60 group-hover:via-white/50 transition-all duration-300"></div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/60 mb-6">
            Ready to experience these powerful features?
          </p>
          <button className="group relative bg-white hover:bg-gray-50 text-[#371142] font-semibold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
            <span className="relative z-10">Explore All Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>


    </section>
  );
}