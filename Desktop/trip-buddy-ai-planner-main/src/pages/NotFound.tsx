
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center px-6 py-16 max-w-md">
          <div className="relative mb-8">
            <MapPin className="h-24 w-24 mx-auto text-primary/30" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl font-bold">404</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            It seems you've wandered off the map. This route doesn't exist in our travel plans.
          </p>
          <Link to="/">
            <Button className="mx-auto">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
