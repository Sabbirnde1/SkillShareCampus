import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-[hsl(var(--header-bg))] py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">
            SkillShare<span className="text-sm align-top">Campus</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-foreground hover:bg-white/50">
            Join Now
          </Button>
          <Button variant="secondary" className="bg-white text-foreground hover:bg-white/90">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
