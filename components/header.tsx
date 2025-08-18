'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Bot, Menu, X } from 'lucide-react';

export default function Header() {
  const headerRef = useRef<HTMLHeaderElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([logoRef.current, navLinksRef.current, ctaButtonRef.current], { 
        opacity: 0,
        y: -20
      });

      // Header entrance animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(navLinksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .to(ctaButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');

      // CTA button hover effects
      if (ctaButtonRef.current) {
        const button = ctaButtonRef.current;
        
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 0 20px rgba(78, 12, 98, 0.4)'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 0 0px rgba(78, 12, 98, 0)'
          });
        });
      }

      // Mobile menu animation
      if (mobileMenuRef.current) {
        gsap.set(mobileMenuRef.current, { x: '100%' });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (mobileMenuRef.current) {
      if (!isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: '0%',
          duration: 0.4,
          ease: 'power3.out'
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    }
  };

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Call Bot</span>
            </div>

            {/* Desktop Navigation */}
            <nav ref={navLinksRef} className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Button
                ref={ctaButtonRef}
                className="font-semibold uppercase tracking-wider px-6 py-2 text-sm transition-all duration-300"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                Book Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-16 right-0 bottom-0 w-80 bg-white shadow-2xl z-40 md:hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="p-6 space-y-6">
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={toggleMobileMenu}
                className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-gray-200">
            <Button
              className="w-full font-semibold uppercase tracking-wider py-3 text-sm transition-all duration-300"
              style={{ backgroundColor: 'var(--secondary)' }}
              onClick={toggleMobileMenu}
            >
              Book Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}