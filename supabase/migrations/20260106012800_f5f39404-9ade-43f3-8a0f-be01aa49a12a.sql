-- ===========================================
-- PROJECT MARKETPLACE DATABASE STRUCTURE
-- ===========================================

-- 1. ENUM TYPES
-- ===========================================
CREATE TYPE public.user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE public.product_status AS ENUM ('pending', 'approved', 'active', 'paused', 'rejected', 'sold');
CREATE TYPE public.order_status AS ENUM ('pending', 'awaiting_confirmation', 'completed', 'disputed', 'refunded', 'cancelled');
CREATE TYPE public.seller_request_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.transaction_type AS ENUM ('sale', 'release', 'refund', 'withdrawal');
CREATE TYPE public.dispute_status AS ENUM ('open', 'resolved_buyer', 'resolved_seller', 'closed');

-- 2. PROFILES TABLE
-- ===========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bibliography TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. USER ROLES TABLE (SEPARATE FOR SECURITY)
-- ===========================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'buyer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. SELLER REQUESTS TABLE
-- ===========================================
CREATE TABLE public.seller_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  cpf TEXT NOT NULL,
  phone TEXT NOT NULL,
  products_description TEXT NOT NULL,
  experience TEXT,
  status seller_request_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seller_requests ENABLE ROW LEVEL SECURITY;

-- 5. CATEGORIES TABLE
-- ===========================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Contas', 'contas', 'Contas de jogos com ranks, skins e itens', 'users'),
  ('Gift Cards', 'gift-cards', 'Cartões presente de diversas plataformas', 'credit-card'),
  ('Skins & Items', 'skins', 'Skins, itens e cosméticos para jogos', 'sparkles'),
  ('Serviços', 'servicos', 'Boosting, coaching e outros serviços', 'zap');

-- 6. PRODUCTS TABLE
-- ===========================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  images TEXT[] DEFAULT '{}',
  status product_status NOT NULL DEFAULT 'pending',
  delivery_info TEXT,
  views_count INTEGER NOT NULL DEFAULT 0,
  favorites_count INTEGER NOT NULL DEFAULT 0,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 7. SELLER BALANCES TABLE
-- ===========================================
CREATE TABLE public.seller_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_balance DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (blocked_balance >= 0),
  available_balance DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (available_balance >= 0),
  total_earned DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (total_earned >= 0),
  total_withdrawn DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (total_withdrawn >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seller_balances ENABLE ROW LEVEL SECURITY;

-- 8. ORDERS TABLE
-- ===========================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE DEFAULT 'ORD-' || substr(gen_random_uuid()::text, 1, 8),
  buyer_id UUID NOT NULL REFERENCES auth.users(id),
  seller_id UUID NOT NULL REFERENCES auth.users(id),
  product_id UUID NOT NULL REFERENCES public.products(id),
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  platform_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  seller_amount DECIMAL(10,2) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  delivery_data TEXT,
  confirmed_at TIMESTAMPTZ,
  security_period_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 9. TRANSACTIONS TABLE
-- ===========================================
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type transaction_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 10. DISPUTES TABLE
-- ===========================================
CREATE TABLE public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id),
  opened_by UUID NOT NULL REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  description TEXT,
  status dispute_status NOT NULL DEFAULT 'open',
  resolved_by UUID REFERENCES auth.users(id),
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;

-- 11. WITHDRAWAL REQUESTS TABLE
-- ===========================================
CREATE TABLE public.withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  pix_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  processed_by UUID REFERENCES auth.users(id),
  processed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- 12. FAVORITES TABLE
-- ===========================================
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- SECURITY DEFINER FUNCTIONS (for RLS)
-- ===========================================

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Function to check if user is seller
CREATE OR REPLACE FUNCTION public.is_seller(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'seller')
$$;

-- ===========================================
-- RLS POLICIES
-- ===========================================

-- PROFILES POLICIES
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- USER ROLES POLICIES
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.is_admin(auth.uid()));

-- SELLER REQUESTS POLICIES
CREATE POLICY "Users can view own seller requests" ON public.seller_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create seller request" ON public.seller_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all seller requests" ON public.seller_requests FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update seller requests" ON public.seller_requests FOR UPDATE USING (public.is_admin(auth.uid()));

-- CATEGORIES POLICIES (public read)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin(auth.uid()));

-- PRODUCTS POLICIES
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (status IN ('active', 'approved'));
CREATE POLICY "Sellers can view own products" ON public.products FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can create products" ON public.products FOR INSERT WITH CHECK (auth.uid() = seller_id AND public.is_seller(auth.uid()));
CREATE POLICY "Sellers can update own products" ON public.products FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Admins can view all products" ON public.products FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update all products" ON public.products FOR UPDATE USING (public.is_admin(auth.uid()));

-- SELLER BALANCES POLICIES
CREATE POLICY "Sellers can view own balance" ON public.seller_balances FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Admins can view all balances" ON public.seller_balances FOR SELECT USING (public.is_admin(auth.uid()));

-- ORDERS POLICIES
CREATE POLICY "Buyers can view own orders" ON public.orders FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Sellers can view own sales" ON public.orders FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Buyers can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Buyers can update own orders" ON public.orders FOR UPDATE USING (auth.uid() = buyer_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update all orders" ON public.orders FOR UPDATE USING (public.is_admin(auth.uid()));

-- TRANSACTIONS POLICIES
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all transactions" ON public.transactions FOR SELECT USING (public.is_admin(auth.uid()));

-- DISPUTES POLICIES
CREATE POLICY "Involved users can view disputes" ON public.disputes FOR SELECT USING (
  auth.uid() = opened_by OR 
  auth.uid() IN (SELECT buyer_id FROM public.orders WHERE id = order_id) OR
  auth.uid() IN (SELECT seller_id FROM public.orders WHERE id = order_id)
);
CREATE POLICY "Buyers can create disputes" ON public.disputes FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT buyer_id FROM public.orders WHERE id = order_id)
);
CREATE POLICY "Admins can view all disputes" ON public.disputes FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update disputes" ON public.disputes FOR UPDATE USING (public.is_admin(auth.uid()));

-- WITHDRAWAL REQUESTS POLICIES
CREATE POLICY "Sellers can view own withdrawals" ON public.withdrawal_requests FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can create withdrawals" ON public.withdrawal_requests FOR INSERT WITH CHECK (auth.uid() = seller_id AND public.is_seller(auth.uid()));
CREATE POLICY "Admins can view all withdrawals" ON public.withdrawal_requests FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update withdrawals" ON public.withdrawal_requests FOR UPDATE USING (public.is_admin(auth.uid()));

-- FAVORITES POLICIES
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- ===========================================
-- TRIGGERS
-- ===========================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seller_requests_updated_at BEFORE UPDATE ON public.seller_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON public.disputes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seller_balances_updated_at BEFORE UPDATE ON public.seller_balances
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  
  -- All new users get buyer role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'buyer');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-create seller balance when user becomes seller
CREATE OR REPLACE FUNCTION public.handle_new_seller()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'seller' THEN
    INSERT INTO public.seller_balances (seller_id)
    VALUES (NEW.user_id)
    ON CONFLICT (seller_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_seller_role_added
  AFTER INSERT ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_seller();
