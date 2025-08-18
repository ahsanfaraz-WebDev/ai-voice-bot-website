'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sideElementRef = useRef<HTMLDivElement>(null);
  
  // Fixed heights for audio visualization to prevent hydration mismatch
  const [audioBarHeights] = useState(() => [
    12, 18, 15, 22, 8, 25, 14, 19
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, heroContentRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(sideElementRef.current, {
        opacity: 0,
        x: 100,
        rotation: 15
      });

      // Create timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      })
      .to(heroContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.5")
      .to(sideElementRef.current, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
      }, "-=0.8");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen bg-gradient-to-br from-[#371142] via-[#4e0c62] to-[#2d1b35] font-urbanist relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-[#4e0c62]/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#371142]/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#6b1f7a]/10 rounded-full blur-3xl"></div>
        {/* Light purple accents */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-300/8 to-transparent rounded-full blur-xl"></div>
      </div>



      {/* Header */}
      <header ref={headerRef} className="relative z-10 px-8 pt-8">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white tracking-tight">
              AI Call Bot
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#solutions" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Solutions
            </a>
            <a href="#features" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Features
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Pricing
            </a>
            <a href="#docs" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Documentation
            </a>
            <a href="#support" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Support
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hidden md:flex text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-6 py-2 transition-all duration-300 hover:border-purple-300/40 hover:shadow-lg"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-[#4e0c62] to-[#6b1f7a] hover:from-[#5d1075] hover:to-[#7a2287] text-white font-medium px-6 py-2 shadow-lg rounded-xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105 border border-purple-400/20">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center min-h-[calc(100vh-120px)] px-8 mt-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div ref={heroContentRef} className="space-y-8">
            
            {/* Badge */}
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400/20 to-purple-300/10 backdrop-blur-sm border border-purple-300/30 text-white/90 text-sm font-medium shadow-lg">
                Advanced AI Technology
              </span>
            </div>

            {/* Main Title with Animation */}
            <div className="space-y-4">
              <div className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-none">
                <div className="inline-block overflow-hidden whitespace-nowrap animate-showup">
                  Intelligent Voice
                </div>
                <div className="inline-block overflow-hidden whitespace-nowrap w-0 animate-reveal mt-2">
                  <span className="text-transparent bg-gradient-to-r from-white via-purple-300 to-purple-100 bg-clip-text -ml-96 animate-slidein">
                    Conversations
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl">
                Transform your customer interactions with AI-powered voice technology that understands, responds, and delivers exceptional experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-white text-[#371142] hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-105 border-2 border-white/20"
              >
                Start Building
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white/50 hover:bg-white/10 font-medium px-8 py-4 text-lg backdrop-blur-sm rounded-xl transition-all duration-300 hover:border-purple-300/70 hover:shadow-lg hover:scale-105 bg-white/5"
              >
                <span className="text-white font-medium">View Demo</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">500K+</div>
                <div className="text-white/60 text-sm">Calls Handled</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-white/60 text-sm">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-white/60 text-sm">Languages</div>
              </div>
            </div>
          </div>

          {/* Right Side Element - Voice Bots Showcase */}
          <div ref={sideElementRef} className="hidden lg:block relative">
            <div className="relative space-y-4">
              
              {/* Voice Bot 1 - Customer Service */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-white font-medium text-base">Sarah</div>
                    <div className="text-purple-300 text-xs">Customer Support Voice AI</div>
                  </div>
                </div>
                
                {/* Voice Waveform */}
                <div className="bg-purple-500/20 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-center space-x-1 h-8">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-0.5 bg-gradient-to-t from-purple-400 to-purple-200 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.sin(i * 0.5) * 10}px`,
                          animationDelay: `${i * 0.06}s`,
                          animationDuration: '1.5s'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-purple-200 text-xs">"How can I help you today?"</div>
                </div>
              </div>

              {/* Voice Bot 2 - Sales */}
              <div className="bg-gradient-to-br from-white/12 to-white/7 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-4 shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500 ml-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-white font-medium text-base">Alex</div>
                    <div className="text-purple-200 text-xs">Sales Voice AI</div>
                  </div>
                </div>
                
                {/* Voice Waveform */}
                <div className="bg-purple-400/20 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-center space-x-1 h-8">
                    {[...Array(14)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-0.5 bg-gradient-to-t from-purple-300 to-purple-100 rounded-full animate-pulse"
                        style={{
                          height: `${15 + Math.cos(i * 0.3) * 15}px`,
                          animationDelay: `${i * 0.08}s`,
                          animationDuration: '2s'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-purple-100 text-xs">"Found 3 perfect solutions for you"</div>
                </div>
              </div>

              {/* Voice Bot 3 - Technical */}
              <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-purple-200/20 rounded-2xl p-4 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-300 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-white font-medium text-base">Maya</div>
                    <div className="text-purple-100 text-xs">Technical Voice AI</div>
                  </div>
                </div>
                
                {/* Voice Waveform */}
                <div className="bg-purple-300/20 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-center space-x-1 h-8">
                    {audioBarHeights.map((height, i) => (
                      <div 
                        key={i}
                        className="w-0.5 bg-gradient-to-t from-purple-200 to-white rounded-full animate-pulse"
                        style={{
                          height: `${height + 10}px`,
                          animationDelay: `${i * 0.12}s`,
                          animationDuration: '1.8s'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-purple-50 text-xs">"Running system diagnostic..."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}