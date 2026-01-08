import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronLeft,
  Star,
  MessageSquare,
  Share2,
  Heart,
  Zap
} from "lucide-react";

// Mock product data
const mockProduct = {
  id: "1",
  title: "Conta Valorant - Radiant + 50 Skins Exclusivas",
  description: `Conta Valorant de alto nível com rank Radiant na última temporada. Inclui mais de 50 skins exclusivas, incluindo várias skins de batalha que não estão mais disponíveis.

**O que está incluso:**
- Rank Radiant (Último Ato)
- 50+ Skins de armas
- 15 Skins de facas (incluindo Elderflame Dagger)
- Várias buddies e sprays raros
- Email original transferível
- Suporte pós-venda

**Garantia:**
- Primeiro acesso garantido
- Dados originais do email
- Sem banimento ou restrições`,
  price: 299.99,
  images: [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
  ],
  category: "Contas",
  seller: {
    name: "ProGamer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    isVerified: true,
    rating: 4.9,
    sales: 234,
    memberSince: "Mar 2023",
  },
  stats: {
    views: 1234,
    favorites: 56,
  },
  createdAt: "2 dias atrás",
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBuy = () => {
    setIsLoading(true);
    // Simulate purchase flow - will redirect to checkout
    setTimeout(() => {
      navigate("/buyer/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/marketplace" className="text-foreground-secondary hover:text-foreground flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Marketplace
          </Link>
          <span className="text-foreground-muted">/</span>
          <span className="text-foreground-secondary">{mockProduct.category}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-2xl overflow-hidden bg-background-secondary"
            >
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.title}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="digital">Produto Digital</Badge>
                <Badge variant="verified">
                  <Shield className="w-3 h-3 mr-1" />
                  Seguro
                </Badge>
              </div>
            </motion.div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {mockProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index 
                      ? "ring-2 ring-primary" 
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Product Details */}
            <div className="rounded-xl bg-card border border-border/50 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Descrição do Produto</h2>
                <div className="prose prose-invert prose-sm max-w-none">
                  {mockProduct.description.split('\n').map((line, i) => (
                    <p key={i} className="text-foreground-secondary mb-2">
                      {line.startsWith('**') ? (
                        <strong className="text-foreground">{line.replace(/\*\*/g, '')}</strong>
                      ) : line.startsWith('-') ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          {line.replace('- ', '')}
                        </span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Security Info */}
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Compra Protegida</h4>
                    <p className="text-sm text-foreground-secondary">
                      Seu pagamento fica retido até você confirmar o recebimento do produto. 
                      Se algo der errado, nossa equipe medeia a disputa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Purchase Card */}
          <div className="space-y-6">
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl bg-card border border-border/50 p-6 sticky top-24"
            >
              <h1 className="text-xl font-bold text-foreground mb-4">
                {mockProduct.title}
              </h1>
              
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-display font-bold text-foreground">
                  R$ {mockProduct.price.toFixed(2)}
                </span>
              </div>
              
              {/* Seller Info */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background-secondary mb-6">
                <img
                  src={mockProduct.seller.avatar}
                  alt={mockProduct.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{mockProduct.seller.name}</span>
                    {mockProduct.seller.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                      {mockProduct.seller.rating}
                    </span>
                    <span>{mockProduct.seller.sales} vendas</span>
                  </div>
                </div>
              </div>
              
              {/* Buy Button */}
              <Button 
                className="w-full h-14 text-lg gap-2 mb-4" 
                size="xl"
                onClick={handleBuy}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Comprar Agora
                  </>
                )}
              </Button>
              
              {/* Secondary Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contato
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border/50 text-sm text-foreground-muted">
                <span>{mockProduct.stats.views} visualizações</span>
                <span>{mockProduct.stats.favorites} favoritos</span>
                <span>Publicado {mockProduct.createdAt}</span>
              </div>
            </motion.div>
            
            {/* Trust Badges */}
            <div className="rounded-xl bg-card border border-border/50 p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground-secondary">Pagamento seguro com proteção</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground-secondary">Entrega imediata após confirmação</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-warning" />
                </div>
                <span className="text-foreground-secondary">Suporte 7 dias por semana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
