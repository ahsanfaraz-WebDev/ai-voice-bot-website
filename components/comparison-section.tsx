'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, 
  Brain, 
  MessageSquare, 
  Clock, 
  Users, 
  TrendingUp,
  X,
  Check,
  Sparkles,
  Cpu,
  Heart,
  Shield
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const comparisons = [
    {
      category: "Intelligence",
      icon: <Brain className="w-6 h-6" />,
      traditional: {
        title: "Rule-Based Responses",
        description: "Limited to pre-programmed scripts and basic keyword matching",
        icon: <X className="w-5 h-5 text-red-500" />
      },
      ai: {
        title: "Contextual Understanding",
        description: "Advanced NLP with emotional intelligence and conversation memory",
        icon: <Check className="w-5 h-5 text-green-500" />
      }
    },
    {
      category: "Learning",
      icon: <TrendingUp className="w-6 h-6" />,
      traditional: {
        title: "Static Knowledge",
        description: "Requires manual updates and cannot adapt to new scenarios",
        icon: <X className="w-5 h-5 text-red-500" />
      },
      ai: {
        title: "Continuous Learning",
        description: "Self-improving through interactions and real-time data analysis",
        icon: <Check className="w-5 h-5 text-green-500" />
      }
    },
    {
      category: "Conversations",
      icon: <MessageSquare className="w-6 h-6" />,
      traditional: {
        title: "Robotic Interactions",
        description: "Rigid conversation flow with obvious bot-like responses",
        icon: <X className="w-5 h-5 text-red-500" />
      },
      ai: {
        title: "Human-like Dialogue",
        description: "Natural conversations with personality and emotional awareness",
        icon: <Check className="w-5 h-5 text-green-500" />
      }
    },
    {
      category: "Response Time",
      icon: <Clock className="w-6 h-6" />,
      traditional: {
        title: "Slow Processing",
        description: "2-5 second delays while searching through decision trees",
        icon: <X className="w-5 h-5 text-red-500" />
      },
      ai: {
        title: "Instant Responses",
        description: "Sub-second response time with parallel processing capabilities",
        icon: <Check className="w-5 h-5 text-green-500" />
      }
    },
    {
      category: "Personalization",
      icon: <Users className="w-6 h-6" />,
      traditional: {
        title: "One-Size-Fits-All",
        description: "Same responses for everyone regardless of context or history",
        icon: <X className="w-5 h-5 text-red-500" />
      },
      ai: {
        title: "Tailored Experiences",
        description: "Personalized interactions based on user preferences and behavior",
        icon: <Check className="w-5 h-5 text-green-500" />
      }
    },
    {
      category: "Integration",
      icon: <Zap className="w-6 h-6" />,
      traditional: {
        title: "Limited Connectivity",
        description: "Basic integrations requiring extensive custom development",
        icon: <X className="w-5 h-5 text-red-500" />
      },
      ai: {
        title: "Seamless Integration",
        description: "Native connectivity with 100+ platforms and real-time sync",
        icon: <Check className="w-5 h-5 text-green-500" />
      }
    }
  ];

  const advantages = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Next-Gen AI",
      value: "GPT-4 Powered",
      description: "Latest AI technology"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Processing Speed",
      value: "0.3s",
      description: "Average response time"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Satisfaction Rate",
      value: "96%",
      description: "Customer happiness"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Reliability",
      value: "99.9%",
      description: "Uptime guarantee"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(comparisonRef.current?.children || [], {
        opacity: 0,
        y: 40,
        scale: 0.95
      });

      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9
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
      // Comparison cards
      .to(comparisonRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      // Stats
      .to(statsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.8)"
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-[#371142] via-[#4e0c62] to-[#2d1b35] font-urbanist overflow-hidden"
    >
      {/* Background Elements - Futuristic Grid */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
        
        {/* Organic Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-white blur-3xl" style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(-15deg)'
          }}></div>
        </div>
        

        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/15 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div ref={titleRef} className="mb-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Traditional vs
              <span className="block text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-100 bg-clip-text mt-2">
                AI-Powered Future
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              See how our next-generation AI voice technology revolutionizes customer interactions 
              compared to outdated traditional voice bots.
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div ref={comparisonRef} className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {comparisons.map((comparison, index) => (
            <div 
              key={comparison.category}
              className="group relative bg-white rounded-3xl p-8 transition-all duration-700 hover:scale-110 hover:text-white hover:bg-[#371142] overflow-hidden shadow-lg hover:shadow-2xl z-10 hover:z-20"
              style={{ minHeight: '400px' }}
            >
              {/* Hover Color Bubble */}
              <div className="hover_color_bubble absolute bg-[#371142]/15 w-[100rem] h-[100rem] z-[-1] top-[16rem] rounded-full transform rotate-[-36deg] left-[-18rem] transition-all duration-700 group-hover:top-0"></div>

              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-8 relative z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#371142] shadow-md group-hover:bg-white group-hover:text-[#371142]">
                  {comparison.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                  {comparison.category}
                </h3>
              </div>

              {/* Traditional vs AI */}
              <div className="space-y-6 relative z-10">
                {/* Traditional */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 group-hover:bg-red-500/20 group-hover:border-red-300/50 transition-all duration-300">
                  <div className="flex items-start space-x-3 mb-3">
                    {comparison.traditional.icon}
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2 group-hover:text-red-200">
                        Traditional Bots
                      </h4>
                      <h5 className="font-medium text-gray-900 mb-2 group-hover:text-white">
                        {comparison.traditional.title}
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white/90">
                        {comparison.traditional.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Powered */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 group-hover:bg-green-500/20 group-hover:border-green-300/50 transition-all duration-300">
                  <div className="flex items-start space-x-3 mb-3">
                    {comparison.ai.icon}
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2 group-hover:text-green-200">
                        AI Voice Bot
                      </h4>
                      <h5 className="font-medium text-gray-900 mb-2 group-hover:text-white">
                        {comparison.ai.title}
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white/90">
                        {comparison.ai.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages Stats */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose AI Voice Bot?
            </h3>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Experience the future of conversational AI with cutting-edge technology 
              that delivers measurable results.
            </p>
          </div>

          <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={advantage.title}
                className="group text-center bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                {/* Grid Effect on Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-16 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  <div 
                    className="w-full h-full bg-white"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '8px 8px'
                    }}
                  ></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {advantage.icon}
                </div>
                
                <div className="text-3xl font-bold text-transparent bg-gradient-to-br from-white to-purple-200 bg-clip-text mb-2">
                  {advantage.value}
                </div>
                
                <h4 className="font-semibold text-white mb-2">
                  {advantage.title}
                </h4>
                
                <p className="text-white/60 text-sm">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AI Voice Bot to deliver 
              exceptional customer experiences that traditional bots simply can't match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#371142] hover:bg-white/90 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-105">
                Start Free Trial
              </button>
              <button className="text-white border border-white/50 hover:bg-white/10 font-medium px-8 py-4 text-lg backdrop-blur-sm rounded-xl transition-all duration-300 hover:border-white/70 hover:scale-105">
                See Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
