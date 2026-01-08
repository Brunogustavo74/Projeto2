import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AppSidebar } from "./AppSidebar";

export function MainLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar - Fixed */}
      <AppSidebar />
      
      {/* Spacer for fixed sidebar */}
      <div className="hidden md:block w-16 flex-shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <Header />
        
        <main className="flex-1 pt-16 md:pt-0">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
