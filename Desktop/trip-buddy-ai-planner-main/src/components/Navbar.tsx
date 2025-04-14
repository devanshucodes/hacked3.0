
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plane, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <nav className="py-4 px-6 md:px-8 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Trip Buddy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          <Button variant="default" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            Plan Trip
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Home
              </Link>
              <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                About
              </Link>
              <Button className="w-full mt-4">
                <MapPin className="mr-2 h-4 w-4" />
                Plan Trip
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
