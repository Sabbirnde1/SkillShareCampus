import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isSignInPage = location.pathname === "/signin";
  
  return (
    <header className="bg-[hsl(var(--header-bg))] py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">
            SkillShare<span className="text-sm align-top">Campus</span>
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-foreground hover:bg-white/50">
            Join Now
          </Button>
          {!isSignInPage ? (
            <Link to="/signin">
              <Button variant="secondary" className="bg-white text-foreground hover:bg-white/90">
                Sign In
              </Button>
            </Link>
          ) : (
            <Button variant="secondary" className="bg-white text-foreground hover:bg-white/90">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
