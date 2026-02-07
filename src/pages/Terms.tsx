import { motion } from "framer-motion";
import { Shield, FileText, Scale, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Terms() {
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
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Termos de Uso
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
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                Ao acessar e utilizar a plataforma NexusGames, você concorda com estes Termos de Uso e 
                nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, 
                não poderá utilizar nossos serviços.
              </p>
              <p>
                Estes termos podem ser atualizados periodicamente. Recomendamos que você revise esta 
                página regularmente para se manter informado sobre quaisquer alterações.
              </p>
            </div>
          </section>
          
          {/* Section 2 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">2. Elegibilidade</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>Para utilizar nossos serviços, você deve:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ter pelo menos 18 anos de idade</li>
                <li>Possuir capacidade legal para celebrar contratos</li>
                <li>Fornecer informações verdadeiras e precisas durante o cadastro</li>
                <li>Manter suas credenciais de acesso em segurança</li>
              </ul>
            </div>
          </section>
          
          {/* Section 3 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">3. Uso da Plataforma</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                A NexusGames é uma plataforma de marketplace para produtos digitais relacionados a games. 
                Ao utilizar nossos serviços, você concorda em:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Não violar leis ou regulamentos aplicáveis</li>
                <li>Não vender produtos falsificados ou obtidos ilegalmente</li>
                <li>Não utilizar a plataforma para atividades fraudulentas</li>
                <li>Respeitar outros usuários e manter comunicação respeitosa</li>
                <li>Não compartilhar ou revender credenciais de acesso</li>
              </ul>
            </div>
          </section>
          
          {/* Section 4 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Transações e Pagamentos</h2>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                Todas as transações realizadas na plataforma são protegidas pelo nosso sistema de escrow. 
                O pagamento é retido até que o comprador confirme o recebimento do produto ou o prazo 
                de segurança expire.
              </p>
              <p>
                <strong className="text-foreground">Taxas:</strong> Cobramos uma taxa de 10% sobre cada 
                venda realizada. Não há taxas para compradores.
              </p>
              <p>
                <strong className="text-foreground">Saques:</strong> Vendedores podem solicitar saques 
                do saldo disponível a qualquer momento. Processamos saques em até 24 horas úteis via PIX.
              </p>
            </div>
          </section>
          
          {/* Section 5 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">5. Disputas e Reembolsos</h2>
            </div>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                Em caso de problemas com uma transação, o comprador pode abrir uma disputa em até 7 dias 
                após a compra. Nossa equipe analisará o caso e tomará uma decisão em até 48 horas.
              </p>
              <p>
                Reembolsos podem ser concedidos nos seguintes casos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Produto não entregue</li>
                <li>Produto significativamente diferente do anunciado</li>
                <li>Produto não funcional ou com defeitos</li>
                <li>Fraude comprovada</li>
              </ul>
            </div>
          </section>
          
          {/* Section 6 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Limitação de Responsabilidade</h2>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                A NexusGames atua apenas como intermediária nas transações entre compradores e vendedores. 
                Não somos responsáveis pela qualidade, legalidade ou veracidade dos produtos anunciados.
              </p>
              <p>
                Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais ou 
                consequenciais decorrentes do uso da plataforma.
              </p>
            </div>
          </section>
          
          {/* Section 7 */}
          <section className="p-6 rounded-xl bg-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Contato</h2>
            <div className="space-y-4 text-foreground-secondary">
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <ul className="space-y-2">
                <li><strong className="text-foreground">Email:</strong> legal@nexusgames.com</li>
                <li><strong className="text-foreground">Suporte:</strong> suporte@nexusgames.com</li>
              </ul>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
