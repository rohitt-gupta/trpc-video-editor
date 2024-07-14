import Footer from "./_components/Footer";
import Header from "./_components/Header";
import MainContent from "./_components/MainContent";
import Sidebar from "./_components/Sidebar";

export default function IndexPage() {

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" flex flex-row flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}
