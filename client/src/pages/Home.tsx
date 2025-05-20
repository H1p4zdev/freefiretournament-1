import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
