import type { Locale } from "@/lib/i18n";

export type FaqEntry = { question: string; answer: string };

/** Home page FAQ, rendered on the page and emitted as FAQPage schema. */
export const faq: Record<Locale, FaqEntry[]> = {
  en: [
    {
      question: "What is automation for a small business?",
      answer:
        "Small business automation uses software to carry out repetitive tasks based on agreed rules. It can move information between your forms, CRM, email and other tools, reducing manual copying and helping your team follow a consistent process.",
    },
    {
      question: "Which small business processes can be automated?",
      answer:
        "Common starting points include capturing leads, updating CRM records, sending booking reminders, preparing reports and routing customer requests. The right choice depends on how often the task happens, the quality of your data and the tools you use. We identify those opportunities in the consultation.",
    },
    {
      question: "How much does the automation consultation cost?",
      answer:
        "The Small Business Automation Consultation costs €50. It includes a review of your processes and tools, a prioritized list of automation opportunities and a written action plan. Implementation and software subscriptions are quoted separately.",
    },
    {
      question: "Can you work with the software we already use?",
      answer:
        "We check your existing tools first. When they support APIs, webhooks or suitable connectors, we can often link them without replacing them. If access is limited or a tool needs a paid plan, we explain the constraints and running costs before you commit to a build.",
    },
    {
      question: "Does every automation need AI?",
      answer:
        "No. Fixed rules are often enough for reminders, data transfers and scheduled reports. AI can help with tasks such as classifying requests or drafting replies. We recommend it only where it adds value, with human review for sensitive actions.",
    },
    {
      question: "How do I get started?",
      answer:
        "Use the contact form to request the €50 consultation. Tell us what your business does, which tools you use and which tasks take the most time. We reply within one working day to arrange next steps. No payment is collected through this form.",
    },
    {
      question: "Do you also build software, MVPs and mobile apps?",
      answer:
        "Yes. When an integration alone cannot solve the problem, we build custom software, MVPs and mobile apps. We also help finish stalled prototypes. The scope, delivery timeline and cost are agreed before development begins.",
    },
  ],
  pt: [
    {
      question: "O que é a automação para pequenas empresas?",
      answer:
        "A automação para pequenas empresas utiliza software para executar tarefas repetitivas com base em regras definidas. Pode passar informação entre formulários, CRM, email e outras ferramentas, reduzindo a cópia manual e ajudando a equipa a seguir um processo consistente.",
    },
    {
      question: "Que processos de uma pequena empresa podem ser automatizados?",
      answer:
        "Os pontos de partida mais comuns são o registo de contactos, a atualização do CRM, o envio de lembretes de marcações, a preparação de relatórios e o encaminhamento de pedidos de clientes. A escolha certa depende da frequência da tarefa, da qualidade dos dados e das ferramentas que utiliza. Identificamos essas oportunidades na consultoria.",
    },
    {
      question: "Quanto custa a consultoria de automação?",
      answer:
        "A Consultoria de Automação para Pequenas Empresas custa 50 €. Inclui uma análise dos seus processos e ferramentas, uma lista de oportunidades de automação por ordem de prioridade e um plano de ação escrito. A implementação e as subscrições de software são orçamentadas à parte.",
    },
    {
      question: "Conseguem trabalhar com o software que já utilizamos?",
      answer:
        "Começamos por analisar as ferramentas que já utiliza. Quando disponibilizam APIs, webhooks ou conectores adequados, é muitas vezes possível ligá-las sem as substituir. Se o acesso for limitado ou uma ferramenta exigir um plano pago, explicamos as limitações e os custos de funcionamento antes de avançar.",
    },
    {
      question: "Todas as automações precisam de inteligência artificial?",
      answer:
        "Não. Regras fixas costumam ser suficientes para lembretes, transferências de dados e relatórios agendados. A IA pode ajudar em tarefas como classificar pedidos ou preparar rascunhos de respostas. Só a recomendamos quando acrescenta valor, com revisão humana nas ações sensíveis.",
    },
    {
      question: "Como posso começar?",
      answer:
        "Utilize o formulário de contacto para pedir a consultoria de 50 €. Diga-nos o que faz a sua empresa, que ferramentas utiliza e que tarefas ocupam mais tempo. Respondemos no prazo de um dia útil para combinar os próximos passos. Não é feito qualquer pagamento através deste formulário.",
    },
    {
      question: "Também desenvolvem software, MVP e aplicações móveis?",
      answer:
        "Sim. Quando uma integração não resolve o problema, desenvolvemos software à medida, MVP e aplicações móveis. Também ajudamos a concluir protótipos parados. O âmbito, o prazo de entrega e o custo são acordados antes do início do desenvolvimento.",
    },
  ],
};
