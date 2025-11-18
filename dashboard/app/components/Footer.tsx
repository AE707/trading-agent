'use client';

import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Dashboard', href: '#' },
        { label: 'Analytics', href: '#' },
        { label: 'Trading Engine', href: '#' },
        { label: 'Documentation', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#' },
        { label: 'API Docs', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Contact Us', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Mail, label: 'Email', href: '#' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t border-slate-700 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section: Branding + Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Branding Section */}
          <div className="space-y-6 col-span-1">
            <div className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-105">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-cyan-500/50 transition-shadow">
                🤖
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-tight">Trading Agent</span>
                <span className="text-xs text-cyan-400 font-medium">ML Powered</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Advanced ML-powered trading dashboard for real-time market analysis and automated trading decisions.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all duration-200 p-2 hover:bg-slate-800/50 rounded-lg"
                  title={label}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} />
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50"></div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            <p>
              © {currentYear} Trading Agent. All rights reserved. | Powered by <span className="text-cyan-400 font-medium">ML Pipeline</span>
            </p>
          </div>

          {/* Status Information */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-400">All Systems Operational</span>
            </div>
            <span className="text-gray-500 font-mono">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full shadow-lg transition-all duration-200 hover:shadow-cyan-500/50 hover:scale-110 opacity-80 hover:opacity-100 group"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
    </footer>
  );
}
