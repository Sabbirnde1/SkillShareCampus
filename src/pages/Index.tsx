import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignInForm from "@/components/SignInForm";
import learningIllustration from "@/assets/learning-illustration.png";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:justify-start">
            <SignInForm />
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
