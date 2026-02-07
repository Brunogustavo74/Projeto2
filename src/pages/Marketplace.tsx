import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  ChevronDown,
  X
} from "lucide-react";

// Mock products data
const allProducts = [
  {
    id: "1",
    title: "Conta Valorant - Radiant + 50 Skins Exclusivas",
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
    title: "Pacote Skins CS2 - 10 Items Raros AWP",
    price: 459.00,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=400&h=300&fit=crop",
    category: "Skins",
    seller: "SkinTrader",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Conta Fortnite - 200+ Skins Raras",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=300&fit=crop",
    category: "Contas",
    seller: "EpicSeller",
    isVerified: false,
  },
  {
    id: "5",
    title: "Gift Card PlayStation R$250",
    price: 235.00,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    category: "Gift Cards",
    seller: "PSNStore",
    isVerified: true,
  },
  {
    id: "6",
    title: "Conta League of Legends - Diamond IV",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
    category: "Contas",
    seller: "LOLBoost",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "7",
    title: "Skin Bundle CSGO - Knife + Gloves",
    price: 899.00,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    category: "Skins",
    seller: "PremiumSkins",
    isVerified: true,
  },
  {
    id: "8",
    title: "Xbox Game Pass Ultimate 3 Meses",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop",
    category: "Serviços",
    seller: "GamePassBR",
    isVerified: true,
  },
];

const categories = ["Todos", "Contas", "Gift Cards", "Skins", "Serviços"];
const sortOptions = ["Mais relevantes", "Menor preço", "Maior preço", "Mais recentes"];

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("Mais relevantes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Marketplace
          </h1>
          <p className="text-foreground-secondary">
            Explore milhares de produtos digitais verificados
          </p>
        </div>
        
        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border text-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Filter Button - Mobile */}
          <Button
            variant="outline"
            className="lg:hidden h-12 gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
          
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none h-12 px-4 pr-10 rounded-lg bg-card border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted pointer-events-none" />
            </div>
            
            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none h-12 px-4 pr-10 rounded-lg bg-card border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted pointer-events-none" />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${viewMode === "grid" ? "bg-secondary text-foreground" : "text-foreground-muted hover:text-foreground"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${viewMode === "list" ? "bg-secondary text-foreground" : "text-foreground-muted hover:text-foreground"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mb-6 p-4 rounded-xl bg-card border border-border space-y-4"
          >
            <div>
              <label className="text-sm text-foreground-secondary mb-2 block">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground-secondary hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm text-foreground-secondary mb-2 block">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-foreground"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
        
        {/* Category Pills - Desktop */}
        <div className="hidden lg:flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "bg-card text-foreground-secondary hover:bg-secondary hover:text-foreground border border-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-foreground-secondary">
            <span className="text-foreground font-medium">{filteredProducts.length}</span> produtos encontrados
          </p>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard
                  {...product}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-foreground-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
            <p className="text-foreground-secondary mb-6">
              Tente ajustar seus filtros ou busca
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
