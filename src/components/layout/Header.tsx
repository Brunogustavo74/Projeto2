import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Gamepad2,
  ShoppingBag,
  User,
  LogIn,
  Menu,
  X,
  Shield,
  LogOut,
  LayoutDashboard,
  Settings,
  Store,
  Home,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin, isSeller } = useAuth();

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: typeof Home; label: string }) => (
    <Link to={href} onClick={() => setMobileMenuOpen(false)}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98]",
          isActive(href)
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
            : "text-foreground-secondary hover:bg-secondary/80 hover:text-foreground"
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span>{label}</span>
      </div>
    </Link>
  );

  const SectionLabel = ({ label }: { label: string }) => (
    <p className="px-4 pt-2 pb-1 text-[11px] font-bold text-foreground-muted uppercase tracking-widest">
      {label}
    </p>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
      {/* Top bar */}
      <div className="bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Gamepad2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              NEXUS<span className="text-primary">GAMES</span>
            </span>
          </Link>

          <button
            className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-14 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-14 left-0 right-0 z-50 bg-background border-b border-border/50 shadow-lg max-h-[calc(100vh-3.5rem)] overflow-y-auto"
            >
              <div className="p-3 space-y-1">
                {/* Public */}
                <NavItem href="/" icon={Home} label="Home" />
                <NavItem href="/marketplace" icon={ShoppingBag} label="Marketplace" />

                {/* Logged in */}
                {user ? (
                  <>
                    <div className="my-2 mx-2 border-t border-border/40" />
                    <SectionLabel label="Minha Conta" />
                    <NavItem href="/buyer/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <NavItem href="/profile" icon={User} label="Perfil" />
                    <NavItem href="/settings" icon={Settings} label="Configurações" />

                    {isSeller() && (
                      <>
                        <div className="my-2 mx-2 border-t border-border/40" />
                        <SectionLabel label="Vendedor" />
                        <NavItem href="/seller/dashboard" icon={Store} label="Painel Vendedor" />
                      </>
                    )}

                    {isAdmin() && (
                      <>
                        <div className="my-2 mx-2 border-t border-border/40" />
                        <SectionLabel label="Admin" />
                        <NavItem href="/admin/dashboard" icon={Shield} label="Painel Admin" />
                      </>
                    )}

                    <div className="my-2 mx-2 border-t border-border/40" />
                    <NavItem href="/help" icon={HelpCircle} label="Central de Ajuda" />

                    <div className="pt-2 px-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-foreground-secondary hover:text-destructive rounded-xl h-12"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-5 h-5" />
                        Sair da Conta
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="my-2 mx-2 border-t border-border/40" />
                    <NavItem href="/help" icon={HelpCircle} label="Central de Ajuda" />

                    <div className="pt-3 px-1 space-y-2">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full h-12 gap-2 rounded-xl text-sm">
                          <LogIn className="w-4 h-4" />
                          Entrar
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full h-12 rounded-xl text-sm">
                          Criar Conta
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
