import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  Upload,
  ImagePlus,
  X,
  Package,
  DollarSign,
  Tag,
  FileText,
  Truck,
  Eye,
  Save,
  AlertCircle,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "O título precisa ter pelo menos 5 caracteres")
    .max(120, "O título pode ter no máximo 120 caracteres"),
  description: z
    .string()
    .trim()
    .min(20, "A descrição precisa ter pelo menos 20 caracteres")
    .max(2000, "A descrição pode ter no máximo 2000 caracteres"),
  price: z
    .string()
    .min(1, "Informe o preço")
    .refine((val) => {
      const num = parseFloat(val.replace(",", "."));
      return !isNaN(num) && num >= 1;
    }, "O preço mínimo é R$ 1,00")
    .refine((val) => {
      const num = parseFloat(val.replace(",", "."));
      return !isNaN(num) && num <= 50000;
    }, "O preço máximo é R$ 50.000,00"),
  category_id: z.string().min(1, "Selecione uma categoria"),
  delivery_info: z
    .string()
    .trim()
    .max(500, "Máximo de 500 caracteres")
    .optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProduct() {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const createProduct = useCreateProduct();
  const [images, setImages] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category_id: "",
      delivery_info: "",
    },
  });

  const watchedValues = form.watch();

  const handleImageUpload = () => {
    // Mock image upload - will be replaced with real upload
    const mockImages = [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    if (images.length < 5) {
      setImages((prev) => [...prev, randomImage]);
      toast.success("Imagem adicionada!");
    } else {
      toast.error("Máximo de 5 imagens");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct.mutateAsync({
        title: data.title,
        description: data.description,
        price: parseFloat(data.price.replace(",", ".")),
        category_id: data.category_id,
        images: images.length > 0 ? images : undefined,
        delivery_info: data.delivery_info || undefined,
      });
      navigate("/seller/dashboard");
    } catch {
      // Error already handled in the hook
    }
  };

  const selectedCategory = categories?.find(
    (c) => c.id === watchedValues.category_id
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Criar Anúncio
            </h1>
            <p className="text-foreground-secondary text-sm mt-1">
              Preencha as informações do seu produto digital
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 hidden sm:flex"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4" />
              {previewMode ? "Editar" : "Preview"}
            </Button>
          </div>
        </div>

        {previewMode ? (
          <ProductPreview
            title={watchedValues.title}
            description={watchedValues.description}
            price={watchedValues.price}
            category={selectedCategory?.name}
            images={images}
            deliveryInfo={watchedValues.delivery_info}
            onBack={() => setPreviewMode(false)}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Images Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-card border border-border/50 p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ImagePlus className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Imagens</h2>
                  <span className="text-xs text-foreground-muted">
                    ({images.length}/5)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <img
                        src={img}
                        alt={`Produto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-destructive/90 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded bg-primary/90 text-primary-foreground font-medium">
                          Capa
                        </span>
                      )}
                    </div>
                  ))}

                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1.5 text-foreground-muted hover:text-primary transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      <span className="text-[10px] font-medium">Adicionar</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-foreground-muted mt-3">
                  Adicione até 5 imagens. A primeira será a capa do anúncio. Formatos: JPG, PNG, WebP.
                </p>
              </motion.div>

              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-xl bg-card border border-border/50 p-5 space-y-5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">
                    Informações do Produto
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do anúncio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Conta Valorant Radiant + 50 Skins"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormMessage />
                        <span className="text-xs text-foreground-muted">
                          {field.value.length}/120
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva detalhadamente o que o comprador receberá. Inclua informações como nível, itens, benefícios, etc."
                          className="min-h-[140px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormMessage />
                        <span className="text-xs text-foreground-muted">
                          {field.value.length}/2000
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                            <Input
                              placeholder="0,00"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoriesLoading ? (
                              <SelectItem value="loading" disabled>
                                Carregando...
                              </SelectItem>
                            ) : categories && categories.length > 0 ? (
                              categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                Nenhuma categoria
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              {/* Delivery Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-card border border-border/50 p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Entrega</h2>
                </div>

                <FormField
                  control={form.control}
                  name="delivery_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informações de entrega</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explique como o produto será entregue ao comprador. Ex: Dados enviados por e-mail em até 30 minutos após a confirmação do pagamento."
                          className="min-h-[100px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Opcional. Ajuda o comprador a entender como receberá o
                        produto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20"
              >
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Revisão obrigatória
                  </p>
                  <p className="text-xs text-foreground-secondary mt-1">
                    Seu anúncio será revisado pela equipe de moderação antes de
                    ser publicado. Isso geralmente leva até 24 horas.
                  </p>
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="gap-2"
                  onClick={() => setPreviewMode(true)}
                >
                  <Eye className="w-4 h-4" />
                  Visualizar
                </Button>
                <Button
                  type="submit"
                  className="gap-2"
                  disabled={createProduct.isPending}
                >
                  <Save className="w-4 h-4" />
                  {createProduct.isPending
                    ? "Publicando..."
                    : "Publicar Anúncio"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

// Preview Component
function ProductPreview({
  title,
  description,
  price,
  category,
  images,
  deliveryInfo,
  onBack,
}: {
  title: string;
  description: string;
  price: string;
  category?: string;
  images: string[];
  deliveryInfo?: string;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <Eye className="w-4 h-4 text-primary" />
        <p className="text-sm text-foreground">
          Pré-visualização — é assim que seu anúncio aparecerá para os
          compradores
        </p>
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        {/* Product Images */}
        {images.length > 0 && (
          <div className="aspect-video relative overflow-hidden bg-background-secondary">
            <img
              src={images[0]}
              alt={title || "Produto"}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {images.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Imagem ${i + 2}`}
                    className="w-12 h-12 rounded-lg object-cover border-2 border-card"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {title || "Título do produto"}
              </h2>
              {category && (
                <Badge variant="digital" className="mt-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {category}
                </Badge>
              )}
            </div>
            <p className="text-2xl font-display font-bold text-foreground whitespace-nowrap">
              {price
                ? `R$ ${parseFloat(price.replace(",", ".")).toFixed(2).replace(".", ",")}`
                : "R$ 0,00"}
            </p>
          </div>

          <div className="prose prose-sm prose-invert max-w-none mb-6">
            <p className="text-foreground-secondary whitespace-pre-wrap">
              {description || "Descrição do produto aparecerá aqui..."}
            </p>
          </div>

          {deliveryInfo && (
            <div className="p-4 rounded-lg bg-background-secondary/50 border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Informações de Entrega
                </span>
              </div>
              <p className="text-sm text-foreground-secondary">{deliveryInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Edição
        </Button>
      </div>
    </motion.div>
  );
}
