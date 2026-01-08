import { Link } from "react-router-dom";
import { Gamepad2, Shield, Zap, HeadphonesIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border/50">
      {/* Features bar */}
      <div className="border-b border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Compra 100% Segura</p>
                <p className="text-xs text-foreground-secondary">Proteção em todas as transações</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Entrega Instantânea</p>
                <p className="text-xs text-foreground-secondary">Receba seu produto digital na hora</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <HeadphonesIcon className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Suporte Dedicado</p>
                <p className="text-xs text-foreground-secondary">Atendimento 7 dias por semana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                NEXUS<span className="text-primary">GAMES</span>
              </span>
            </Link>
            <p className="text-sm text-foreground-secondary">
              O marketplace definitivo para produtos digitais gamers. Compre e venda com segurança.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Explorar</Link></li>
              <li><Link to="/marketplace?category=games" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Games</Link></li>
              <li><Link to="/marketplace?category=skins" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Skins & Items</Link></li>
              <li><Link to="/marketplace?category=contas" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Contas</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Para Vendedores</h4>
            <ul className="space-y-2">
              <li><Link to="/become-seller" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Seja um Vendedor</Link></li>
              <li><Link to="/seller/dashboard" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Painel do Vendedor</Link></li>
              <li><Link to="/help/seller" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Central de Ajuda</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/terms" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacy" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground-muted">
              © 2024 NexusGames. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground-muted">Pagamentos seguros por</span>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded bg-background-elevated text-xs font-medium text-foreground-secondary">
                  Stripe
                </div>
                <div className="px-3 py-1 rounded bg-background-elevated text-xs font-medium text-foreground-secondary">
                  Mercado Pago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
