import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Gamepad2, 
  ChevronRight,
  Star,
  Users,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    title: "Conta Valorant - Radiant + 50 Skins",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    category: "Contas",
    seller: "ProGamer",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Gift Card Steam R$100",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop",
    category: "Gift Cards",
    seller: "CardMaster",
    isVerified: true,
  },
  {
    id: "3",
    title: "Pacote Skins CS2 - 10 Items Raros",
    price: 459.00,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=400&h=300&fit=crop",
    category: "Skins",
    seller: "SkinTrader",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Conta Fortnite - 200+ Skins",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=300&fit=crop",
    category: "Contas",
    seller: "EpicSeller",
    isVerified: false,
  },
];

const categories = [
  { name: "Contas", icon: Users, count: 1240 },
  { name: "Gift Cards", icon: ShoppingBag, count: 856 },
  { name: "Skins & Items", icon: Star, count: 2341 },
  { name: "Serviços", icon: Zap, count: 432 },
];

const stats = [
  { label: "Vendas Realizadas", value: "50K+" },
  { label: "Vendedores Ativos", value: "2.5K+" },
  { label: "Taxa de Satisfação", value: "98%" },
];

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Marketplace 100% Seguro</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight mb-6">
                O Mercado Digital
                <br />
                <span className="text-gradient">Para Gamers</span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto mb-10">
                Compre e venda produtos digitais com total segurança. 
                Contas, skins, gift cards e muito mais com proteção em cada transação.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="xl" 
                  onClick={() => navigate("/admin/dashboard")}
                  className="gap-2"
                >
                  Dash Adm
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  onClick={() => navigate("/seller/dashboard")}
                >
                  Dash vendedor
                </Button>
                         <Button 
                  variant="outline" 
                  size="xl"
                  onClick={() => navigate("/buyer/dashboard")}
                >
                  Dash comprador
                </Button>
                
              </div>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-foreground-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Categorias</h2>
              <p className="text-foreground-secondary mt-1">Encontre o que você procura</p>
            </div>
            <Link to="/marketplace" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              Ver tudo
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={`/marketplace?category=${cat.name.toLowerCase()}`}
                  className="group block p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <cat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                      <p className="text-sm text-foreground-muted">{cat.count.toLocaleString()} produtos</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Produtos em Destaque</h2>
              <p className="text-foreground-secondary mt-1">Os mais populares do momento</p>
            </div>
            <Link to="/marketplace" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              Ver mais
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard
                  {...product}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-20 bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Por que escolher a NexusGames?
              </h2>
              <p className="text-foreground-secondary">
                Segurança e confiança em cada transação
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-success/10 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Proteção Garantida</h3>
                <p className="text-sm text-foreground-secondary">
                  Pagamento seguro com saldo bloqueado até confirmação do recebimento pelo comprador.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Entrega Imediata</h3>
                <p className="text-sm text-foreground-secondary">
                  Produtos digitais entregues instantaneamente após a confirmação do pagamento.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-warning/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Vendedores Verificados</h3>
                <p className="text-sm text-foreground-secondary">
                  Todos os vendedores são aprovados manualmente para garantir qualidade.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background-card to-background-secondary p-8 md:p-16 border border-primary/20"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Gamepad2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Comece a vender agora</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Transforme seu inventário em dinheiro
              </h2>
              
              <p className="text-foreground-secondary mb-8">
                Venda suas contas, skins e produtos digitais para milhares de compradores. 
                Processo simples, pagamento seguro e suporte dedicado.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate("/become-seller")} className="gap-2">
                  Começar a Vender
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/marketplace")}>
                  Explorar Produtos
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
