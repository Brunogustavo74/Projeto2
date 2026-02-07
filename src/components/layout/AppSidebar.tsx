import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Gamepad2,
  Home,
  ShoppingBag,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Store,
  Shield,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const { user, signOut, isAdmin, isSeller } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const publicItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  ];

  const userItems = [
    { href: "/buyer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Perfil", icon: User },
    { href: "/settings", label: "Configurações", icon: Settings },
  ];

  const sellerItems = [
    { href: "/seller/dashboard", label: "Painel Vendedor", icon: Store },
  ];

  const adminItems = [
    { href: "/admin/dashboard", label: "Painel Admin", icon: Shield },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-card border-r border-border transition-all duration-300 fixed top-0 left-0 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Button - Centered on the edge */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-card border border-border shadow-md hover:bg-secondary"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>

      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/" className={cn("flex items-center gap-2 group", isCollapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
            <Gamepad2 className="w-5 h-5 text-primary" />
          </div>
          {!isCollapsed && (
            <span className="font-display font-bold text-lg text-foreground">
              NEXUS<span className="text-primary">GAMES</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {/* Public Links */}
        {publicItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isCollapsed && "justify-center px-2",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && item.label}
            </div>
          </Link>
        ))}

        {/* User Links - Only when logged in */}
        {user && (
          <>
            <div className="pt-3 mt-3 border-t border-border">
              {!isCollapsed && (
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Minha Conta
                </p>
              )}
              {userItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isCollapsed && "justify-center px-2",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && item.label}
                  </div>
                </Link>
              ))}
            </div>

            {/* Seller Links */}
            {isSeller() && (
              <div className="pt-3 mt-3 border-t border-border">
                {!isCollapsed && (
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Vendedor
                  </p>
                )}
                {sellerItems.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isCollapsed && "justify-center px-2",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && item.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Admin Links */}
            {isAdmin() && (
              <div className="pt-3 mt-3 border-t border-border">
                {!isCollapsed && (
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Administração
                  </p>
                )}
                {adminItems.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isCollapsed && "justify-center px-2",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && item.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Help Link */}
        <div className="pt-3 mt-3 border-t border-border">
          <Link to="/help">
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isCollapsed && "justify-center px-2",
                isActive("/help")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              title={isCollapsed ? "Central de Ajuda" : undefined}
            >
              <HelpCircle className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && "Central de Ajuda"}
            </div>
          </Link>
        </div>
      </nav>

      {/* Footer Actions - Fixed at bottom */}
      <div className="mt-auto p-3 border-t border-border">
        {user ? (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
              isCollapsed && "justify-center px-2"
            )}
            onClick={handleSignOut}
            title={isCollapsed ? "Sair" : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && "Sair"}
          </Button>
        ) : (
          <div className={cn("space-y-2", isCollapsed && "space-y-1")}>
            <Link to="/login" className="block">
              <Button
                variant="outline"
                className={cn("w-full", isCollapsed && "px-2")}
                title={isCollapsed ? "Entrar" : undefined}
              >
                {isCollapsed ? <User className="w-4 h-4" /> : "Entrar"}
              </Button>
            </Link>
            {!isCollapsed && (
              <Link to="/register" className="block">
                <Button className="w-full">Criar Conta</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
