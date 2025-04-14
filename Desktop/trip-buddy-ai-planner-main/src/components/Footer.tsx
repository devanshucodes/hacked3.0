
import React from 'react';
import { Plane, Globe, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">Trip Buddy</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your AI travel planner that creates personalized itineraries based on your preferences, budget, and interests.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Travel Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Partners
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Trip Buddy AI Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
