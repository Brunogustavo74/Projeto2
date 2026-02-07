import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
          <Gamepad2 className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-6xl font-display font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-display font-semibold text-foreground mb-3">Página não encontrada</h2>
        <p className="text-foreground-secondary mb-8">
          A página <code className="px-2 py-0.5 rounded bg-secondary text-foreground text-sm">{location.pathname}</code> não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Ir para Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
