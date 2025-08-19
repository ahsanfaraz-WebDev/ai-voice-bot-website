'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Clock, Zap, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const platforms = [
    { 
      name: 'Shopify', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.8 2.1c-.2-.1-.5-.1-.7 0L13.2 3c-.2.1-.4.4-.4.7v.4c-.8-.2-1.8-.2-2.8.1-2.1.6-3.9 2.1-4.8 4.2-.6 1.4-.7 2.8-.2 4.1.1.3.3.6.5.8l1.9 1.9c.2.2.5.3.8.3h.1c.3 0 .6-.1.8-.3l1.9-1.9c.2-.2.3-.5.3-.8v-.1c0-.3-.1-.6-.3-.8L8.1 9.7c-.2-.2-.3-.5-.3-.8s.1-.6.3-.8c.4-.4 1-.4 1.4 0l1.9 1.9c.2.2.5.3.8.3s.6-.1.8-.3l1.9-1.9c.2-.2.3-.5.3-.8s-.1-.6-.3-.8L12 5.6c-.2-.2-.3-.5-.3-.8V4.4c0-.3.2-.6.4-.7l1.9-1.9c.2-.2.5-.2.8-.1z"/>
        </svg>
      ),
      color: 'from-green-400 to-green-600' 
    },
    { 
      name: 'Salesforce', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      name: 'Slack', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 9c-1.1 0-2 .9-2 2s.9 2 2 2h2V9H6zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2h2V5H6zm4 16c1.1 0 2-.9 2-2s-.9-2-2-2v2h-2c0 1.1.9 2 2 2zm0-6h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4zm0-8V3c0-1.1-.9-2-2-2S8 1.9 8 3v4h2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2h-2v4h2zm0 4c1.1 0 2-.9 2-2s-.9-2-2-2h-2v2c0 1.1.9 2 2 2z"/>
        </svg>
      ),
      color: 'from-purple-400 to-purple-600' 
    },
    { 
      name: 'Zapier', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      color: 'from-orange-400 to-orange-600' 
    },
    { 
      name: 'HubSpot', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
        </svg>
      ),
      color: 'from-red-400 to-red-600' 
    },
    { 
      name: 'Discord', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      color: 'from-indigo-400 to-indigo-600' 
    },
    { 
      name: 'Twilio', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      color: 'from-pink-400 to-pink-600' 
    },
    { 
      name: 'WhatsApp', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
        </svg>
      ),
      color: 'from-green-400 to-green-600' 
    },
    { 
      name: 'Microsoft Teams', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58-.74.32-1.22 1.04-1.22 1.85V18H24v-1.61c0-.83-.23-1.61-.63-2.29z"/>
        </svg>
      ),
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      name: 'Zoom', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c-.03.34-.1.67-.19 1H13v-1zm0 3h5.92c-.2.35-.43.69-.68 1H13v-1zm0 3h2.87c-.87.48-1.84.8-2.87.93V19z"/>
        </svg>
      ),
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      name: 'AWS', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.379c-1.96 1.44-4.805 2.207-7.25 2.207-3.431 0-6.522-1.269-8.86-3.371-.183-.165-.02-.39.2-.262 2.519 1.466 5.634 2.347 8.859 2.347 2.171 0 4.559-.45 6.759-1.378.332-.14.61.218.292.457z"/>
        </svg>
      ),
      color: 'from-orange-400 to-orange-600' 
    },
    { 
      name: 'Google Cloud', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.379c-1.96 1.44-4.805 2.207-7.25 2.207-3.431 0-6.522-1.269-8.86-3.371-.183-.165-.02-.39.2-.262 2.519 1.466 5.634 2.347 8.859 2.347 2.171 0 4.559-.45 6.759-1.378.332-.14.61.218.292.457z"/>
        </svg>
      ),
      color: 'from-blue-400 to-blue-600' 
    }
  ];

  const integrationFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "5-Minute Setup",
      description: "Get up and running with our pre-built integrations in minutes, not hours."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "RESTful API",
      description: "Robust API with comprehensive documentation and SDKs for all major languages."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Sync",
      description: "Instant data synchronization across all your connected platforms."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Enterprise Ready",
      description: "SOC 2 compliant with enterprise-grade security and reliability."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(logosRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.8
      });

      gsap.set(featuresRef.current?.children || [], {
        opacity: 0,
        y: 40,
        x: -30
      });

      gsap.set(codeRef.current, {
        opacity: 0,
        x: 50,
        rotationY: -15
      });

      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        scale: 0.8
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
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      // Platform logos with stagger
      .to(logosRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      // Features
      .to(featuresRef.current?.children || [], {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4")
      // Code section
      .to(codeRef.current, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6")
      // Stats
      .to(statsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.8)"
      }, "-=0.3");



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 font-urbanist overflow-hidden"
    >
      {/* Background Elements - Organic Blob Shades */}
      <div className="absolute inset-0">
        {/* Top Left Organic Blob */}
        <div className="absolute -top-24 -left-24 w-80 h-80 opacity-8">
          <div className="w-full h-full bg-[#371142] blur-3xl" style={{
            borderRadius: '65% 35% 40% 60% / 55% 45% 65% 35%',
            transform: 'rotate(20deg)'
          }}></div>
        </div>
        
        {/* Top Right Organic Blob */}
        <div className="absolute -top-16 -right-32 w-96 h-72 opacity-6">
          <div className="w-full h-full bg-[#371142] blur-2xl" style={{
            borderRadius: '45% 55% 75% 25% / 60% 40% 60% 40%',
            transform: 'rotate(-10deg)'
          }}></div>
        </div>
        
        {/* Bottom Left Organic Blob */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 opacity-12">
          <div className="w-full h-full bg-[#371142] blur-xl" style={{
            borderRadius: '75% 25% 55% 45% / 35% 65% 35% 65%',
            transform: 'rotate(35deg)'
          }}></div>
        </div>
        
        {/* Bottom Right Organic Blob */}
        <div className="absolute -bottom-32 -right-16 w-88 h-64 opacity-10">
          <div className="w-full h-full bg-[#371142] blur-2xl" style={{
            borderRadius: '55% 45% 65% 35% / 70% 30% 70% 30%',
            transform: 'rotate(-25deg)'
          }}></div>
        </div>
        
        {/* Center Floating Blob */}
        <div className="absolute top-1/3 left-2/3 w-40 h-40 opacity-5">
          <div className="w-full h-full bg-[#371142] blur-3xl" style={{
            borderRadius: '80% 20% 40% 60% / 50% 50% 80% 20%',
            transform: 'rotate(50deg)'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="mb-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Seamless
              <span className="block text-transparent bg-gradient-to-r from-[#371142] via-[#4a1555] to-[#5d1a68] bg-clip-text mt-2">
                Integrations
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with 100+ platforms and tools your team already uses. 
              No complex setup, no lengthy configurations.
            </p>
          </div>
        </div>

        {/* Platform Logos Grid */}
        <div ref={logosRef} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20">
          {platforms.map((platform, index) => (
            <div 
              key={platform.name}
                              className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#371142]/30"
            >
              <div className="text-center">
                <div className={`text-gray-600 mb-3 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#371142]`}>
                  {platform.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-[#371142] transition-colors duration-300">
                  {platform.name}
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Features and Code Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Integration Features */}
          <div ref={featuresRef} className="space-y-8">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Built for Developers
              </h3>
              <p className="text-lg text-gray-600">
                Powerful APIs and SDKs designed to integrate seamlessly with your existing workflow.
              </p>
            </div>

            {integrationFeatures.map((feature, index) => (
              <div key={feature.title} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#371142] to-[#2d0d35] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-[#371142]/20 transition-shadow duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#371142] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Code Preview */}
          <div ref={codeRef} className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm">integration.js</span>
              </div>
              
              <div className="font-mono text-sm">
                <div className="text-purple-400 mb-2">// Initialize AI Voice Bot</div>
                <div className="text-blue-300 mb-1">import <span className="text-yellow-300">{'{ AIVoiceBot }'}</span> from <span className="text-green-300">'@aivoicebot/sdk'</span>;</div>
                <div className="mb-4"></div>
                <div className="text-blue-300 mb-1">const bot = new <span className="text-yellow-300">AIVoiceBot</span>({'{'}
                </div>
                <div className="text-gray-300 ml-4 mb-1">  apiKey: <span className="text-green-300">'your-api-key'</span>,</div>
                <div className="text-gray-300 ml-4 mb-1">  platform: <span className="text-green-300">'shopify'</span></div>
                <div className="text-blue-300 mb-4">{'});'}</div>
                <div className="mb-2"></div>
                <div className="text-purple-400 mb-2">// Start conversation</div>
                <div className="text-yellow-300">bot.<span className="text-blue-300">startConversation</span>();</div>
              </div>
            </div>


          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl font-bold text-[#371142] mb-2">100+</div>
            <div className="text-gray-600 font-medium">Platforms</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-[#371142]/10 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl font-bold text-[#371142] mb-2">5min</div>
            <div className="text-gray-600 font-medium">Setup Time</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-[#371142]/10 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl font-bold text-[#371142] mb-2">99.9%</div>
            <div className="text-gray-600 font-medium">Uptime SLA</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-[#371142]/10 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl font-bold text-[#371142] mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
