import type { Locale } from "@/lib/i18n";

/**
 * Every interface string on the site, in both languages: navigation, labels,
 * section headings, form messages. Page copy that is data (services, the
 * portfolio, the FAQ, the consultation) lives in its own module in
 * `src/lib/`; the legal pages keep their text in their own files.
 *
 * `pt` is typed against `en`, so a key added to one and forgotten in the
 * other fails the build instead of rendering `undefined`.
 *
 * Portuguese is European Portuguese: "equipa", "contacto", "utilizador",
 * third-person address ("a sua empresa").
 */

const en = {
  site: {
    title: "MVP & Software Development Company for Startups",
    description:
      "We build for non-technical founders and startups: web apps, mobile products and automations. Fixed scope, clear timelines, and full source code ownership.",
    tagline: "Your MVP, finally finished.",
    ogAlt:
      "GuyShore, MVP and software development company for non-technical founders",
  },
  common: {
    skipToContent: "Skip to content",
    opensNewTab: "(opens in a new tab)",
    contactUs: "Contact us",
    home: "Home",
    partners: "Our partners",
    breadcrumb: "Breadcrumb",
  },
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    viewAllServices: "View all services",
    menu: "Menu",
    close: "Close",
    language: "Language",
    switchTo: "Ver em português",
  },
  footer: {
    site: "Site",
    office: "Office",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookieSettings: "Cookie settings",
  },
  hero: {
    eyebrow: "Your MVP, finally finished",
    readMore: "Read more",
    readMoreAbout: (name: string) => `Read more about the ${name}`,
  },
  home: {
    servicesEyebrow: "Our services",
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Software we built for real companies.",
    portfolioLead:
      "Websites, management platforms and mobile apps, each one taken from the first screen to production and handed over running.",
    viewAllProjects: "View all projects",
    methodEyebrow: "Our method",
    methodTitle: "How we turn repetitive work into reliable workflows.",
    methodLead:
      "We map your process, agree on the scope, connect your tools and test the workflow before your team relies on it. You know what runs automatically and where a person stays in control.",
    whoEyebrow: "Who we are",
    whoTitle: "Automation and software built around your business.",
    linkedin: "Connect with me on LinkedIn",
    faqEyebrow: "FAQ",
    faqTitle: "Small business automation questions, answered.",
    contactEyebrow: "Contact",
    contactTitle: "What would you like to stop doing manually?",
    contactLead:
      "Tell us about your business, the tools you use and one task that takes too much time. To request the €50 consultation, mention it in your message. We will reply within one working day to arrange next steps.",
  },
  posts: {
    eyebrow: "Blog",
    latestTitle: "Practical guides to AI, automation and building software.",
    latestLead:
      "What an MVP costs, where to start with an app idea, what AI agents can do for a business: written by the people who build them.",
    readThePost: "Read the post",
    viewAllPosts: "View all posts",
    allPosts: "All posts",
    indexTitle: "Here is the content you need to stay up to date.",
    indexLead:
      "We share our expertise, our hands-on experience and what is happening in the market, so you stay ahead of your competitors.",
    empty:
      "The first articles are on their way. Until then, ask us directly. We answer every message.",
    askQuestion: "Ask us a question",
  },
  cards: {
    learnMore: "Learn more about this service",
    viewProject: "View project",
  },
  contactDetails: { phone: "Phone", email: "Email" },
  contactForm: {
    sent: "Message sent",
    name: "Your name",
    email: "Email",
    workEmail: "Work email",
    company: "Company",
    need: "What you need",
    pickOne: "Pick one",
    needs: {
      "An embedded team": "An embedded team",
      "One or two engineers": "One or two engineers",
      "Discovery and architecture": "Discovery and architecture",
      "Platform and reliability": "Platform and reliability",
      "Not sure yet": "Not sure yet",
    },
    message: "Message",
    messageLong: "What are you trying to ship?",
    placeholder: "The product, the deadline, and what is in the way.",
    optional: "optional",
    sending: "Sending…",
    send: "Send message",
  },
  contactAction: {
    honeypot: "Thanks. We will be in touch.",
    nameRequired: "Tell us who you are.",
    emailRequired: "We need an address to reply to.",
    emailInvalid: "That address does not look complete.",
    messageRequired: "Tell us what you are trying to ship.",
    messageShort: "A couple more sentences will get you a better answer.",
    checkFields: "Check the highlighted fields.",
    notConfigured: (email: string, phone: string) =>
      `We could not send your message. Please email us at ${email} or call ${phone}.`,
    failed: (email: string) =>
      `Something went wrong on our side. Please email us at ${email}.`,
    success: "Thanks. We read every message and reply within one working day.",
  },
  subscribe: {
    eyebrow: "Newsletter",
    title: "Get the next article by email.",
    lead: "We write when we have something worth saying about building software, usually once or twice a month. No sequences, no upsells, and you can leave in one click.",
    email: "Your email",
    placeholder: "you@company.com",
    signingUp: "Signing up…",
    submit: "Subscribe",
    preferTalk: "Prefer to talk about a project?",
    getInTouch: "Get in touch",
  },
  subscribeAction: {
    onList: "You are on the list.",
    emailRequired: "We need an address to send the articles to.",
    emailInvalid: "That address does not look complete.",
    failed: (email: string) =>
      `Something went wrong on our side. Email us at ${email} and we will add you.`,
    success: "You are on the list. New articles land in your inbox.",
  },
  reviews: {
    eyebrow: "Client reviews",
    title: "Rated by our clients on Google.",
    count: (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`,
    opensMaps: ", opens Google Maps in a new tab",
    preview:
      "Development preview with sample data. It never renders in a production build.",
    seeAll: "See all reviews",
    seeAllSr: "on Google Maps (opens in a new tab)",
    attributionBefore: "Rating and reviews from",
    attributionAfter:
      ". Google selects up to five reviews by relevance, shown here newest first. Reviews are not verified by Google or by us.",
    translated: " · Translated by Google",
    readOnMaps: "Read on Google Maps",
    readOnMapsSr: (author: string) =>
      `: review by ${author} (opens in a new tab)`,
    stars: (rating: string) => `Rated ${rating} out of 5`,
  },
  consent: {
    eyebrow: "Cookies",
    bodyBefore:
      "We use Google’s tag to measure whether our ads bring people here, to show our ads to people who visited, and to count visits in Google Analytics. It sets cookies only if you accept, and declining changes nothing else on the site. Details are in our",
    privacy: "Privacy Policy",
    decline: "Decline",
    accept: "Accept",
  },
  about: {
    metaTitle: "About",
    eyebrow: "About",
    title: "We are the shoring you need.",
    lead: "Your goal is to gain time and save resources in your company. You want integrated, automated processes that make your team's work easier. You want to solve your compliance problems, and you need to replace Excel. That is why we exist: to bring comfort and ease to your life through technology.",
    meetEyebrow: "Who you will meet",
    meetTitle: "The person behind the work.",
  },
  contactPage: {
    metaTitle: "Contact",
    eyebrow: "Contact",
    title: "Let’s talk about your challenge.",
    lead: "You have a challenge and we want to solve it for you. Our goal is to see your dream project finished. It is time to ship the thing you have been planning for months. Send us a message and let’s get started.",
    reachDirectly: "Reach us directly",
  },
  notFound: {
    title: "That page is not on this shore.",
    lead: "The link may be out of date, or the page may have moved.",
    backHome: "Back to the home page",
  },
  servicesIndex: {
    metaTitle: "Our Services",
    eyebrow: "Our services",
    title: "This is how we help you.",
    lead: "We understand that growing a business demands real investment and real risk. That is why we exist: to reduce the risk and hand you the best technology work we can. Below you can see in more detail how we can help.",
    schemaName: "GuyShore services",
  },
  serviceDetail: {
    breadcrumb: "Our services",
    startProject: "Start your project",
    seeAll: "See all services",
    inShort: "In short",
    included: "What is included",
    audienceEyebrow: "Who this is for",
    audienceTitle: "You will recognize yourself here.",
    deliverablesEyebrow: "Deliverables",
    deliverablesTitle: "What you end up with.",
    deliverablesLead:
      "Everything below is handed over at the end of the project. Nothing on this list depends on us staying involved.",
    processEyebrow: "Process",
    processTitle: "How the work actually runs.",
    faqEyebrow: "FAQ",
    faqTitle: (service: string) => `Questions we get about ${service}.`,
    contactEyebrow: "Contact",
    contactTitle: "Tell us about your project.",
    contactLead:
      "Send us the short version and we will come back to you within one working day.",
    browseOther: "Browse the other services",
    catalog: (service: string) => `${service} deliverables`,
    by: (service: string, site: string) => `${service} by ${site}`,
    servicesCrumb: "Services",
  },
  portfolioIndex: {
    metaTitle: "Portfolio",
    metaDescription:
      "Websites, management platforms and mobile apps GuyShore built for real companies and took to production.",
    eyebrow: "Portfolio",
    title: "Software we built for real companies.",
    lead: "Websites, management platforms and mobile apps, each one taken from the first screen to production and handed over running.",
    schemaName: "GuyShore portfolio",
  },
  portfolioDetail: {
    allProjects: "All projects",
    client: "Client",
    builtWith: "Built with",
    live: "Live",
    project: "The project",
    delivered: "What we delivered",
    screens: "Screens",
    ctaEyebrow: "Your project",
    ctaTitle: "Need something like this built?",
    ctaButton: "Tell us about your project",
  },
  blog: { metaTitle: "Blog" },
};

export type Dictionary = typeof en;

const pt: Dictionary = {
  site: {
    title: "Empresa de Desenvolvimento de MVP e Software para Startups",
    description:
      "Desenvolvemos para fundadores sem perfil técnico e startups: aplicações web, produtos móveis e automações. Âmbito fechado, prazos claros e código-fonte seu.",
    tagline: "O seu MVP, finalmente terminado.",
    ogAlt:
      "GuyShore, empresa de desenvolvimento de MVP e software para fundadores sem perfil técnico",
  },
  common: {
    skipToContent: "Saltar para o conteúdo",
    opensNewTab: "(abre num novo separador)",
    contactUs: "Contacte-nos",
    home: "Início",
    partners: "Os nossos parceiros",
    breadcrumb: "Localização na página",
  },
  nav: {
    services: "Serviços",
    portfolio: "Portfólio",
    about: "Sobre",
    blog: "Blog",
    contact: "Contacto",
    viewAllServices: "Ver todos os serviços",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
    switchTo: "View in English",
  },
  footer: {
    site: "Site",
    office: "Escritório",
    privacy: "Política de Privacidade",
    terms: "Termos de Utilização",
    cookieSettings: "Definições de cookies",
  },
  hero: {
    eyebrow: "O seu MVP, finalmente terminado",
    readMore: "Saber mais",
    readMoreAbout: (name: string) => `Saber mais sobre a ${name}`,
  },
  home: {
    servicesEyebrow: "Os nossos serviços",
    portfolioEyebrow: "Portfólio",
    portfolioTitle: "Software que desenvolvemos para empresas reais.",
    portfolioLead:
      "Sites, plataformas de gestão e aplicações móveis, cada um levado do primeiro ecrã até à produção e entregue a funcionar.",
    viewAllProjects: "Ver todos os projetos",
    methodEyebrow: "O nosso método",
    methodTitle:
      "Como transformamos trabalho repetitivo em processos fiáveis.",
    methodLead:
      "Mapeamos o seu processo, acordamos o âmbito, ligamos as suas ferramentas e testamos o fluxo antes de a sua equipa depender dele. Fica a saber o que corre automaticamente e onde uma pessoa mantém o controlo.",
    whoEyebrow: "Quem somos",
    whoTitle: "Automação e software à medida do seu negócio.",
    linkedin: "Ligue-se a mim no LinkedIn",
    faqEyebrow: "Perguntas frequentes",
    faqTitle: "As dúvidas sobre automação para pequenas empresas, respondidas.",
    contactEyebrow: "Contacto",
    contactTitle: "O que gostaria de deixar de fazer à mão?",
    contactLead:
      "Fale-nos da sua empresa, das ferramentas que utiliza e de uma tarefa que ocupa demasiado tempo. Para pedir a consultoria de 50 €, mencione-o na mensagem. Respondemos no prazo de um dia útil para combinar os próximos passos.",
  },
  posts: {
    eyebrow: "Blog",
    latestTitle: "Guias práticos sobre IA, automação e desenvolvimento de software.",
    latestLead:
      "Quanto custa automatizar, por onde começar, como pôr o seu negócio a funcionar com ferramentas digitais: escrito por quem as desenvolve.",
    readThePost: "Ler o artigo",
    viewAllPosts: "Ver todos os artigos",
    allPosts: "Todos os artigos",
    indexTitle: "O conteúdo de que precisa para se manter atualizado.",
    indexLead:
      "Partilhamos o nosso conhecimento, a nossa experiência prática e o que está a acontecer no mercado, para que esteja um passo à frente da concorrência.",
    empty:
      "Os primeiros artigos estão a caminho. Até lá, pergunte-nos diretamente. Respondemos a todas as mensagens.",
    askQuestion: "Faça-nos uma pergunta",
  },
  cards: {
    learnMore: "Saber mais sobre este serviço",
    viewProject: "Ver projeto",
  },
  contactDetails: { phone: "Telefone", email: "Email" },
  contactForm: {
    sent: "Mensagem enviada",
    name: "O seu nome",
    email: "Email",
    workEmail: "Email profissional",
    company: "Empresa",
    need: "Do que precisa",
    pickOne: "Escolha uma opção",
    needs: {
      "An embedded team": "Uma equipa integrada",
      "One or two engineers": "Um ou dois engenheiros",
      "Discovery and architecture": "Análise e arquitetura",
      "Platform and reliability": "Plataforma e fiabilidade",
      "Not sure yet": "Ainda não sei",
    },
    message: "Mensagem",
    messageLong: "O que pretende lançar?",
    placeholder: "O produto, o prazo e o que está a travar o projeto.",
    optional: "opcional",
    sending: "A enviar…",
    send: "Enviar mensagem",
  },
  contactAction: {
    honeypot: "Obrigado. Entraremos em contacto.",
    nameRequired: "Diga-nos quem é.",
    emailRequired: "Precisamos de um endereço para responder.",
    emailInvalid: "Esse endereço não parece estar completo.",
    messageRequired: "Diga-nos o que pretende fazer.",
    messageShort: "Mais algumas frases ajudam-nos a dar uma resposta melhor.",
    checkFields: "Verifique os campos assinalados.",
    notConfigured: (email: string, phone: string) =>
      `Não foi possível enviar a sua mensagem. Escreva-nos para ${email} ou ligue para ${phone}.`,
    failed: (email: string) =>
      `Ocorreu um erro do nosso lado. Escreva-nos para ${email}.`,
    success:
      "Obrigado. Lemos todas as mensagens e respondemos no prazo de um dia útil.",
  },
  subscribe: {
    eyebrow: "Newsletter",
    title: "Receba o próximo artigo por email.",
    lead: "Escrevemos quando temos algo útil para dizer sobre software e automação, normalmente uma ou duas vezes por mês. Sem sequências, sem vendas insistentes, e pode sair com um clique.",
    email: "O seu email",
    placeholder: "nome@empresa.pt",
    signingUp: "A subscrever…",
    submit: "Subscrever",
    preferTalk: "Prefere falar sobre um projeto?",
    getInTouch: "Contacte-nos",
  },
  subscribeAction: {
    onList: "Subscrição confirmada.",
    emailRequired: "Precisamos de um endereço para enviar os artigos.",
    emailInvalid: "Esse endereço não parece estar completo.",
    failed: (email: string) =>
      `Ocorreu um erro do nosso lado. Escreva-nos para ${email} e adicionamo-lo à lista.`,
    success: "Subscrição confirmada. Os novos artigos chegam ao seu email.",
  },
  reviews: {
    eyebrow: "Avaliações de clientes",
    title: "Avaliados pelos nossos clientes no Google.",
    count: (n: number) => `${n} ${n === 1 ? "avaliação" : "avaliações"}`,
    opensMaps: ", abre o Google Maps num novo separador",
    preview:
      "Pré-visualização de desenvolvimento com dados de exemplo. Nunca aparece no site publicado.",
    seeAll: "Ver todas as avaliações",
    seeAllSr: "no Google Maps (abre num novo separador)",
    attributionBefore: "Classificação e avaliações do",
    attributionAfter:
      ". O Google seleciona até cinco avaliações por relevância, apresentadas aqui da mais recente para a mais antiga. As avaliações não são verificadas pelo Google nem por nós.",
    translated: " · Traduzido pelo Google",
    readOnMaps: "Ler no Google Maps",
    readOnMapsSr: (author: string) =>
      `: avaliação de ${author} (abre num novo separador)`,
    stars: (rating: string) => `Classificação de ${rating} em 5`,
  },
  consent: {
    eyebrow: "Cookies",
    bodyBefore:
      "Utilizamos a etiqueta da Google para medir se os nossos anúncios trazem visitantes, mostrar os nossos anúncios a quem já visitou o site e contar visitas no Google Analytics. Só define cookies se aceitar, e recusar não altera mais nada no site. Os detalhes estão na nossa",
    privacy: "Política de Privacidade",
    decline: "Recusar",
    accept: "Aceitar",
  },
  about: {
    metaTitle: "Sobre",
    eyebrow: "Sobre",
    title: "Somos o apoio de que precisa.",
    lead: "O seu objetivo é ganhar tempo e poupar recursos na sua empresa. Quer processos integrados e automatizados que facilitem o trabalho da equipa. Quer resolver as questões de conformidade e precisa de substituir o Excel. É por isso que existimos: para trazer conforto e simplicidade ao seu dia a dia através da tecnologia.",
    meetEyebrow: "Quem vai conhecer",
    meetTitle: "A pessoa por trás do trabalho.",
  },
  contactPage: {
    metaTitle: "Contacto",
    eyebrow: "Contacto",
    title: "Vamos falar sobre o seu desafio.",
    lead: "Tem um desafio e queremos resolvê-lo consigo. O nosso objetivo é ver o projeto que idealizou terminado. Está na hora de lançar aquilo que planeia há meses. Envie-nos uma mensagem e vamos começar.",
    reachDirectly: "Fale connosco diretamente",
  },
  notFound: {
    title: "Esta página não existe.",
    lead: "A ligação pode estar desatualizada ou a página pode ter mudado de endereço.",
    backHome: "Voltar à página inicial",
  },
  servicesIndex: {
    metaTitle: "Os Nossos Serviços",
    eyebrow: "Os nossos serviços",
    title: "É assim que o ajudamos.",
    lead: "Sabemos que fazer crescer um negócio exige investimento e risco reais. É por isso que existimos: para reduzir o risco e entregar o melhor trabalho tecnológico possível. Abaixo vê em mais detalhe como o podemos ajudar.",
    schemaName: "Serviços da GuyShore",
  },
  serviceDetail: {
    breadcrumb: "Os nossos serviços",
    startProject: "Comece o seu projeto",
    seeAll: "Ver todos os serviços",
    inShort: "Em resumo",
    included: "O que está incluído",
    audienceEyebrow: "Para quem é",
    audienceTitle: "Vai rever-se aqui.",
    deliverablesEyebrow: "Entregáveis",
    deliverablesTitle: "Com o que fica no final.",
    deliverablesLead:
      "Tudo o que está abaixo é entregue no fim do projeto. Nada nesta lista depende de continuarmos envolvidos.",
    processEyebrow: "Processo",
    processTitle: "Como o trabalho decorre na prática.",
    faqEyebrow: "Perguntas frequentes",
    faqTitle: (service: string) => `Perguntas que recebemos sobre ${service}.`,
    contactEyebrow: "Contacto",
    contactTitle: "Fale-nos do seu projeto.",
    contactLead:
      "Envie-nos a versão curta e respondemos no prazo de um dia útil.",
    browseOther: "Ver os outros serviços",
    catalog: (service: string) => `Entregáveis de ${service}`,
    by: (service: string, site: string) => `${service} pela ${site}`,
    servicesCrumb: "Serviços",
  },
  portfolioIndex: {
    metaTitle: "Portfólio",
    metaDescription:
      "Sites, plataformas de gestão e aplicações móveis que a GuyShore desenvolveu para empresas reais e levou até à produção.",
    eyebrow: "Portfólio",
    title: "Software que desenvolvemos para empresas reais.",
    lead: "Sites, plataformas de gestão e aplicações móveis, cada um levado do primeiro ecrã até à produção e entregue a funcionar.",
    schemaName: "Portfólio da GuyShore",
  },
  portfolioDetail: {
    allProjects: "Todos os projetos",
    client: "Cliente",
    builtWith: "Tecnologias",
    live: "Online",
    project: "O projeto",
    delivered: "O que entregámos",
    screens: "Ecrãs",
    ctaEyebrow: "O seu projeto",
    ctaTitle: "Precisa de algo assim?",
    ctaButton: "Fale-nos do seu projeto",
  },
  blog: { metaTitle: "Blog" },
};

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
