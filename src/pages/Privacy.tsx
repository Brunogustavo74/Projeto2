import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Cookie, Mail } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-foreground-secondary">
            Última atualização: Janeiro de 2024
          </p>
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* Section 1 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">1. Dados que Coletamos</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>Coletamos os seguintes tipos de informações:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Dados de cadastro:</strong> nome, email, CPF, telefone</li>
                <li><strong className="text-foreground">Dados de transação:</strong> histórico de compras e vendas, valores</li>
                <li><strong className="text-foreground">Dados de navegação:</strong> páginas visitadas, tempo de acesso, IP</li>
                <li><strong className="text-foreground">Dados de pagamento:</strong> chave PIX para saques (não armazenamos dados de cartão)</li>
              </ul>
            </div>
          </section>
          
          {/* Section 2 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">2. Como Usamos seus Dados</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processar transações e pagamentos</li>
                <li>Fornecer suporte ao cliente</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Enviar comunicações relevantes sobre sua conta</li>
                <li>Prevenir fraudes e garantir segurança</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </div>
          </section>
          
          {/* Section 3 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-warning" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">3. Proteção dos Dados</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Criptografia de dados em trânsito (SSL/TLS)</li>
                <li>Criptografia de dados sensíveis em repouso</li>
                <li>Autenticação de dois fatores disponível</li>
                <li>Monitoramento contínuo de ameaças</li>
                <li>Acesso restrito aos dados por funcionários autorizados</li>
              </ul>
            </div>
          </section>
          
          {/* Section 4 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Cookie className="w-5 h-5 text-foreground-secondary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>Utilizamos cookies e tecnologias similares para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Manter você logado na plataforma</li>
                <li>Lembrar suas preferências</li>
                <li>Analisar o uso do site e melhorar nossos serviços</li>
                <li>Personalizar sua experiência</li>
              </ul>
              <p>
                Você pode configurar seu navegador para recusar cookies, mas isso pode 
                afetar algumas funcionalidades da plataforma.
              </p>
            </div>
          </section>
          
          {/* Section 5 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Seus Direitos</h2>
            <div className="space-y-4 text-foreground-secondary">
              <p>De acordo com a LGPD, você tem direito a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de dados desnecessários</li>
                <li>Revogar o consentimento a qualquer momento</li>
                <li>Solicitar portabilidade dos dados</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato através do email: privacidade@nexusgames.com
              </p>
            </div>
          </section>
          
          {/* Section 6 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">6. Contato</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>Para questões relacionadas à privacidade:</p>
              <ul className="space-y-2">
                <li><strong className="text-foreground">DPO:</strong> dpo@nexusgames.com</li>
                <li><strong className="text-foreground">Privacidade:</strong> privacidade@nexusgames.com</li>
              </ul>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
