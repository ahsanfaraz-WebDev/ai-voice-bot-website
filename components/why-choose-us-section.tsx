'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(featuresRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      gsap.set(statsRef.current?.children || [], {
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

      // Title and subtitle
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.3")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      // Features
      .to(featuresRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.3")
      // Stats
      .to(statsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
        </svg>
      ),
      title: "Lightning Fast Response",
      description: "Sub-second response times with our optimized AI infrastructure",
      metric: "0.3s avg"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 12L12 8L8 12L12 16L16 12Z"/>
        </svg>
      ),
      title: "99.9% Accuracy",
      description: "Industry-leading natural language understanding and context awareness",
      metric: "99.9%"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 10C15.3 10 16 9.3 16 8.5S15.3 7 14.5 7 13 7.7 13 8.5 13.7 10 14.5 10Z"/>
          <path d="M20.5 10C21.3 10 22 9.3 22 8.5S21.3 7 20.5 7 19 7.7 19 8.5 19.7 10 20.5 10Z"/>
          <path d="M8.5 10C9.3 10 10 9.3 10 8.5S9.3 7 8.5 7 7 7.7 7 8.5 7.7 10 8.5 10Z"/>
          <path d="M12 17L8 21L16 21L12 17Z"/>
          <path d="M12 17V13"/>
          <path d="M8 13H16"/>
        </svg>
      ),
      title: "Seamless Integration",
      description: "Deploy in minutes with our plug-and-play API solutions",
      metric: "5 min setup"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2A15.3 15.3 0 0 1 4 6A15.3 15.3 0 0 1 12 2Z"/>
          <path d="M12 22A15.3 15.3 0 0 0 20 18A15.3 15.3 0 0 0 12 22Z"/>
        </svg>
      ),
      title: "Global Scale",
      description: "Handle millions of conversations across 50+ languages",
      metric: "50+ languages"
    }
  ];

  const stats = [
    { number: "10M+", label: "Calls Processed" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "0.3s", label: "Response Time" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 font-urbanist overflow-hidden"
    >

      {/* Background Elements - Organic Blob Shades */}
      <div className="absolute inset-0">
        {/* Top Left Organic Blob */}
        <div className="absolute -top-32 -left-32 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-[#371142] blur-3xl" style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(-15deg)'
          }}></div>
        </div>
        
        {/* Top Right Organic Blob */}
        <div className="absolute -top-20 -right-20 w-80 h-80 opacity-8">
          <div className="w-full h-full bg-[#371142] blur-2xl" style={{
            borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
            transform: 'rotate(25deg)'
          }}></div>
        </div>
        
        {/* Bottom Left Organic Blob */}
        <div className="absolute -bottom-24 -left-24 w-72 h-72 opacity-12">
          <div className="w-full h-full bg-[#371142] blur-2xl" style={{
            borderRadius: '70% 30% 60% 40% / 30% 60% 40% 70%',
            transform: 'rotate(45deg)'
          }}></div>
        </div>
        
        {/* Bottom Right Organic Blob */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-15">
          <div className="w-full h-full bg-[#371142] blur-xl" style={{
            borderRadius: '50% 50% 80% 20% / 60% 40% 60% 40%',
            transform: 'rotate(-30deg)'
          }}></div>
        </div>
        
        {/* Center Accent Blob */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-5">
          <div className="w-full h-full bg-[#371142] blur-3xl" style={{
            borderRadius: '80% 20% 60% 40% / 70% 30% 70% 30%',
            transform: 'rotate(60deg)'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div ref={titleRef} className="mb-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Why Choose 
              <span className="block text-transparent bg-gradient-to-r from-[#371142] via-[#4a1555] to-[#5d1a68] bg-clip-text mt-2">
                Us
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We don't just build voice bots. We craft intelligent conversational experiences 
              that understand context, emotion, and intent.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animated-card group relative cursor-pointer"
            >
              {/* Card Background */}
              <div className="card-background absolute inset-0 rounded-2xl bg-gradient-to-br from-[#371142] to-[#2d0d35] shadow-xl border border-[#371142]/20"></div>
              
              {/* Card Content */}
              <div className="relative z-10 p-8 pt-12">
                {/* Icon */}
                <span className="icon relative z-20 block w-fit p-2 mb-4">
                  <div className="icon-bg absolute inset-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-300"></div>
                  <div className="relative z-10 w-6 h-6 text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </span>

                {/* Metric Badge */}
                <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30 z-20">
                  {feature.metric}
                </div>

                {/* Title */}
                <h4 className="relative z-20 text-lg font-semibold text-white mb-3 transition-colors duration-300">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="relative z-20 text-sm text-white/90 leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="shine absolute inset-0 rounded-2xl overflow-hidden opacity-0 transition-opacity duration-500">
                <div className="shine-gradient absolute w-full h-full left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full filter blur-[35px]"></div>
              </div>

              {/* Animated Background */}
              <div className="background absolute inset-0 rounded-2xl overflow-hidden">
                {/* Tiles */}
                <div className="tiles opacity-0 transition-opacity duration-300">
                  <div className="tile tile-1 absolute bg-purple-400/10"></div>
                  <div className="tile tile-2 absolute bg-purple-400/10"></div>
                  <div className="tile tile-3 absolute bg-purple-400/10"></div>
                  <div className="tile tile-4 absolute bg-purple-400/10"></div>
                  <div className="tile tile-5 absolute bg-purple-400/10"></div>
                  <div className="tile tile-6 absolute bg-purple-400/10"></div>
                  <div className="tile tile-7 absolute bg-purple-400/10"></div>
                  <div className="tile tile-8 absolute bg-purple-400/10"></div>
                  <div className="tile tile-9 absolute bg-purple-400/10"></div>
                  <div className="tile tile-10 absolute bg-purple-400/10"></div>
                </div>

                {/* Lines */}
                <div className="line line-1 absolute inset-0 opacity-0 transition-opacity duration-300">
                  <div className="line-h absolute left-0 right-0 h-px bg-purple-300/30"></div>
                  <div className="line-v absolute top-0 bottom-0 w-px bg-purple-300/30"></div>
                </div>
                <div className="line line-2 absolute inset-0 opacity-0 transition-opacity duration-300">
                  <div className="line-h absolute left-0 right-0 h-px bg-purple-300/30"></div>
                  <div className="line-v absolute top-0 bottom-0 w-px bg-purple-300/30"></div>
                </div>
                <div className="line line-3 absolute inset-0 opacity-0 transition-opacity duration-300">
                  <div className="line-h absolute left-0 right-0 h-px bg-purple-300/30"></div>
                  <div className="line-v absolute top-0 bottom-0 w-px bg-purple-300/30"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#371142]/10 rounded-3xl p-8 lg:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-600 text-lg">
              Real numbers that showcase our commitment to excellence
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-br from-[#371142] to-[#5d1a68] bg-clip-text mb-2 group-hover:from-[#2d0d35] group-hover:to-[#4a1555] transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group relative bg-white hover:bg-gray-50 text-[#371142] font-semibold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
            <span className="relative z-10">Choose Us Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
