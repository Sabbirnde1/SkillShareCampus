import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import learningIllustration from "@/assets/learning-illustration.png";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to <span className="text-primary">SkillShare Campus</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with peers, learn new skills, and grow together in a collaborative learning environment.
            </p>
            <div className="flex gap-4">
              <Link to="/signin">
                <Button size="lg" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center">
            <img 
              src={learningIllustration} 
              alt="Learning and skills development illustration" 
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
