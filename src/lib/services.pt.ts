import type { MethodStep, ServiceItem } from "@/lib/services";

/** Portuguese (pt-PT) service copy. Mirrors services.en.ts entry for entry, same slugs. */
export const servicesPt: ServiceItem[] = [
  {
    slug: "mvp-development",
    title: "Desenvolvimento de MVP",
    onHome: true,
    description:
      "O seu MVP, finalmente terminado. Transforme uma ideia de negócio ou um protótipo parado num produto focado que clientes reais podem usar, com um âmbito claro e um código-fonte que é seu.",
    eyebrow: "Desenvolvimento de MVP",
    h1: "Desenvolvimento de MVP que chega a utilizadores reais.",
    lead: "Levamos a sua ideia de uma conversa a um produto em produção, construído para que a primeira versão possa ser testada por clientes reais em vez de apresentada numa sala.",
    answer: {
      question: "O que é o desenvolvimento de um MVP?",
      body: "Desenvolver um MVP é construir a versão mais pequena do seu produto que um cliente real consegue de facto usar e pagar. Não é um protótipo nem uma demonstração. Definimos a única coisa que o seu produto tem de provar, construímo-la como deve ser e colocamo-la em produção, para que a possa pôr à frente de utilizadores e perceber se a ideia se aguenta.",
      includes: [
        "Um âmbito acordado por escrito antes de se escrever qualquer código",
        "Design de produto e de interface, não apenas implementação",
        "Uma aplicação funcional publicada em produção",
        "Contas, pagamentos e as integrações de que o seu fluxo depende",
        "Propriedade total do código-fonte desde o primeiro commit",
      ],
    },
    audience: [
      {
        title: "Fundadores sem perfil técnico",
        body: "Conhece o problema e o cliente melhor do que ninguém e precisa de uma equipa técnica que não tenha de gerir linha a linha.",
      },
      {
        title: "Startups em fase pre-seed",
        body: "Precisa de algo real à frente dos utilizadores antes da próxima ronda de investimento, e uma apresentação de slides já não chega.",
      },
      {
        title: "Empresas a testar uma nova linha",
        body: "O negócio principal funciona e quer experimentar um produto adjacente sem desviar os seus programadores do que já têm em mãos.",
      },
      {
        title: "Fundadores com um protótipo parado",
        body: "Construiu algo com uma ferramenta de IA, funciona bem numa demonstração e falha com utilizadores reais. Nós levamo-lo até ao fim.",
      },
    ],
    deliverables: [
      "Uma aplicação em produção, disponível no seu próprio domínio",
      "Código-fonte no seu próprio repositório, seu desde o primeiro dia",
      "Autenticação, faturação e as integrações com terceiros de que precisa",
      "Um processo de publicação automatizado, para voltar a lançar sem depender de nós",
      "Analítica configurada, para que o lançamento lhe diga alguma coisa",
      "Uma sessão de passagem de testemunho e documentação escrita",
    ],
    process: [
      {
        title: "Identificar o problema",
        body: "Diz-nos o que está a tentar provar e quem tem de acreditar nisso. Separamos o que a primeira versão tem de fazer do que pode esperar.",
      },
      {
        title: "Propor a solução",
        body: "Apresentamos tudo o que vai ser construído, o investimento, a data de entrega e os custos de funcionamento, antes de qualquer coisa começar.",
      },
      {
        title: "Design e desenvolvimento",
        body: "Desenhamos o produto e construímo-lo em incrementos semanais que pode abrir e experimentar, para que nada seja uma surpresa no fim.",
      },
      {
        title: "Lançamento",
        body: "Publicamos em produção, ligamos o seu domínio e garantimos que tudo funciona com tráfego real e não apenas num portátil.",
      },
      {
        title: "Suporte",
        body: "Continuamos disponíveis depois do lançamento, porque as primeiras semanas com utilizadores reais são quando mais se aprende e mais coisas falham.",
      },
    ],
    faq: [
      {
        question: "Quanto tempo demora um MVP?",
        answer:
          "A maioria começa nas seis semanas. A data exata depende do âmbito, e comprometemo-nos com ela por escrito antes de o desenvolvimento começar, em vez de irmos estimando pelo caminho.",
      },
      {
        question: "O código-fonte fica a ser meu?",
        answer:
          "Sim, na totalidade, desde o primeiro commit. O repositório é seu, não há licença para renovar e pode levá-lo para outra equipa quando quiser.",
      },
      {
        question: "Com que tecnologias trabalham?",
        answer:
          "Next.js, Supabase, React Native e n8n, publicados na Vercel ou na Netlify. São escolhas sóbrias e bem documentadas, que é exatamente o que quer quando outra equipa pode vir a herdar o código.",
      },
      {
        question: "Podem partir de um protótipo que eu já tenho?",
        answer:
          "Sim. Analisamos o que existe, dizemos-lhe com honestidade o que é reaproveitável e o que não é, e levamo-lo para produção em vez de recomeçar só por recomeçar.",
      },
      {
        question: "E se o âmbito mudar a meio do projeto?",
        answer:
          "Normalmente muda. Tratamos as alterações como uma conversa explícita sobre a data e o investimento, para que o âmbito nunca mude em silêncio e nunca seja surpreendido por uma fatura.",
      },
      {
        question: "O que acontece depois do lançamento?",
        answer:
          "Recebe uma passagem de testemunho e documentação, e pode continuar connosco no suporte ou passar tudo para a sua equipa interna. Não construímos nada que precise de nós para continuar a funcionar.",
      },
    ],
  },
  {
    slug: "app-development",
    title: "Desenvolvimento de Aplicações",
    onHome: true,
    description:
      "Dê aos seus clientes e à sua equipa uma forma mais simples de fazer marcações, pedir serviços e acompanhar o progresso. Construímos aplicações móveis ligadas aos sistemas do seu negócio e ajudamos a lançá-las.",
    eyebrow: "Desenvolvimento de Aplicações",
    h1: "Aplicações móveis, construídas e publicadas nas duas lojas.",
    lead: "Construímos aplicações para iOS e Android e acompanhamo-las na revisão até à App Store e ao Google Play, para que o projeto termine com algo que as pessoas possam descarregar.",
    answer: {
      question: "O que inclui o desenvolvimento de uma aplicação móvel?",
      body: "É todo o percurso desde a ideia até uma página na loja que os clientes podem instalar. Construímos uma única base de código que funciona em iOS e Android, ligamo-la ao backend e aos serviços de que precisa e tratamos das submissões às lojas, que é onde a maioria dos primeiros projetos de aplicações fica parada.",
      includes: [
        "Uma única base de código para iOS e Android",
        "Design de interface que segue as convenções de cada plataforma",
        "Backend, base de dados e notificações push",
        "Submissão na App Store e no Google Play, incluindo a revisão",
        "Materiais para a página da loja, capturas de ecrã e descrições",
      ],
    },
    audience: [
      {
        title: "Fundadores com uma ideia de aplicação",
        body: "Tem o conceito e o mercado, e precisa de uma equipa que já tenha passado pela revisão das lojas.",
      },
      {
        title: "Negócios a passar para o telemóvel",
        body: "Os seus clientes já o usam na web, e é no telemóvel que a relação realmente acontece.",
      },
      {
        title: "Equipas com um desenvolvimento parado",
        body: "Alguém começou a aplicação, ela nunca chegou às lojas, e precisa que seja terminada em vez de recomeçada.",
      },
      {
        title: "Produtos que precisam de uma aplicação complementar",
        body: "A plataforma funciona, e é a parte móvel que a torna utilizável no terreno ou em movimento.",
      },
    ],
    deliverables: [
      "Uma página publicada na App Store e no Google Play",
      "Uma única base de código para as duas plataformas, no seu repositório",
      "Backend e base de dados, publicados e a funcionar",
      "Notificações push configuradas e testadas",
      "Materiais para as lojas, capturas de ecrã e textos da página",
      "O processo de lançamento documentado, para que as atualizações não dependam de nós",
    ],
    process: [
      {
        title: "Definir o âmbito da aplicação",
        body: "Mapeamos os ecrãs e os fluxos, e acordamos o que sai na versão um e o que fica para a primeira atualização.",
      },
      {
        title: "Design",
        body: "Desenhamos todos os ecrãs antes de construir, para que a revisão aconteça sobre imagens e não sobre código que tenha de ser reescrito.",
      },
      {
        title: "Desenvolvimento",
        body: "Construímos por incrementos e entregamos-lhe versões instaláveis ao longo do projeto, para que esteja a testar no seu próprio telemóvel muito antes do lançamento.",
      },
      {
        title: "Submissão às lojas",
        body: "Preparamos as páginas, submetemos às duas lojas e tratamos das observações da revisão até a aplicação estar aprovada e disponível.",
      },
      {
        title: "Suporte",
        body: "Continuamos presentes depois do lançamento para as falhas e os casos-limite que só aparecem quando há dispositivos reais envolvidos.",
      },
    ],
    faq: [
      {
        question: "Desenvolvem para iOS e Android?",
        answer:
          "Sim, a partir de uma única base de código construída com React Native. Tem as duas plataformas sem pagar para construir o mesmo produto duas vezes.",
      },
      {
        question: "Tratam da submissão na App Store?",
        answer:
          "Sim, incluindo as observações da revisão. Um projeto que termina com um binário por submeter não é um projeto terminado.",
      },
      {
        question: "Quanto tempo demora o desenvolvimento de uma aplicação?",
        answer:
          "A maioria começa nas oito semanas, mais a revisão das lojas, que normalmente demora dias e não semanas, mas que não está totalmente nas mãos de ninguém.",
      },
      {
        question: "Preciso das minhas próprias contas da Apple e da Google?",
        answer:
          "Sim, e devem estar em nome da sua empresa, não no nosso. Ajudamo-lo a criá-las e nunca mantemos as suas páginas reféns.",
      },
      {
        question: "Podem atualizar uma aplicação que eu já tenho?",
        answer:
          "Muitas vezes, sim. Analisamos primeiro a base de código existente e dizemos-lhe com honestidade se expandi-la sai mais barato do que reconstruí-la.",
      },
      {
        question: "E as atualizações regulares nas lojas?",
        answer:
          "Documentamos o processo de lançamento para que a sua equipa possa publicar atualizações, e continuamos disponíveis para os lançamentos que prefira não fazer sozinho.",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Desenvolvimento de Software",
    onHome: true,
    description:
      "Substitua folhas de cálculo desligadas entre si por software construído à volta das suas operações. Faça a gestão de clientes, trabalhos e relatórios num só lugar, com integrações que mantêm a informação a circular.",
    eyebrow: "Desenvolvimento de Software",
    h1: "Software à medida que se adapta à forma como realmente trabalha.",
    lead: "Quando a folha de cálculo se torna o ponto de estrangulamento, construímos o sistema que a substitui, moldado ao seu processo em vez de obrigar o seu processo a caber no produto de outra pessoa.",
    answer: {
      question: "O que é o desenvolvimento de software à medida?",
      body: "É construir um sistema especificamente para a sua operação, em vez de adaptar a sua operação a software genérico. Aprendemos como o trabalho realmente acontece, incluindo as partes que ninguém documentou, e construímos algo que a sua equipa vai usar porque corresponde à realidade.",
      includes: [
        "Um estudo do seu processo atual antes de se desenhar qualquer coisa",
        "Um sistema construído à volta do seu fluxo de trabalho, não um modelo genérico",
        "Migração dos dados que hoje vivem em folhas de cálculo",
        "Perfis e permissões que correspondem à forma como a sua equipa está organizada",
        "Formação e um plano de implementação para as pessoas que o vão usar",
      ],
    },
    audience: [
      {
        title: "Empresas em crescimento",
        body: "O processo que funcionava com dez pessoas está a falhar discretamente com quarenta, e toda a gente sabe disso.",
      },
      {
        title: "Operações geridas em folhas de cálculo",
        body: "O negócio depende de um ficheiro que só uma pessoa percebe e em que toda a gente tem medo de mexer.",
      },
      {
        title: "Equipas com requisitos de conformidade",
        body: "Precisa de um registo de auditoria e de controlos que uma pasta partilhada nunca lhe vai dar.",
      },
      {
        title: "Negócios sem equipa técnica interna",
        body: "Precisa do sistema e de pessoas que o saibam explicar, não de um fornecedor que fala por cima de si.",
      },
    ],
    deliverables: [
      "Um sistema publicado e a funcionar, na sua infraestrutura",
      "Os seus dados existentes migrados e verificados",
      "Perfis e permissões que correspondem à sua organização",
      "Relatórios e painéis para os números que realmente acompanha",
      "Sessões de formação para a equipa que o vai usar todos os dias",
      "Documentação e um acordo de suporte",
    ],
    process: [
      {
        title: "Compreender a operação",
        body: "Sentamo-nos com as pessoas que fazem o trabalho e mapeamos o que realmente acontece, que raramente é o que diz o documento do processo.",
      },
      {
        title: "Propor a solução",
        body: "Apresentamos o sistema, o investimento, o prazo de entrega e os custos de funcionamento, juntamente com o retorno que esperamos que produza.",
      },
      {
        title: "Desenvolvimento",
        body: "Construímos por fases que entregam, cada uma, algo utilizável, para que o valor chegue antes de o sistema estar terminado.",
      },
      {
        title: "Migração e implementação",
        body: "Transferimos os seus dados, mantemos o sistema antigo e o novo lado a lado quando faz sentido, e damos formação à equipa.",
      },
      {
        title: "Suporte",
        body: "Ajustamos um acordo de suporte à sua medida, porque um sistema de que o negócio depende não pode ficar sem um.",
      },
    ],
    faq: [
      {
        question: "Em que é que isto é diferente de comprar software pronto a usar?",
        answer:
          "O software pronto a usar é mais rápido e mais barato quando o seu processo é comum. Nós compensamos quando o processo é a sua vantagem e adaptá-lo a um produto lhe custaria essa vantagem.",
      },
      {
        question: "Quanto tempo demora o software à medida?",
        answer:
          "A maioria começa nas doze semanas. Entregamos por fases utilizáveis, para que a primeira parte do sistema esteja nas suas mãos bem antes da última.",
      },
      {
        question: "Podem migrar as nossas folhas de cálculo?",
        answer:
          "Sim, e tratamos isso como uma parte real do trabalho. A migração é onde estes projetos costumam correr mal, por isso verificamos os dados em vez de assumir que a importação funcionou.",
      },
      {
        question: "Vai integrar-se com as ferramentas que já usamos?",
        answer:
          "Sim, quando disponibilizam uma API. Contabilidade, CRM, email e pagamentos são as habituais, e confirmamos que cada uma é viável antes de entrar no âmbito.",
      },
      {
        question: "E se a nossa equipa resistir à mudança?",
        answer:
          "É a razão mais comum para estes projetos falharem, por isso planeamos para isso. Envolvemos as pessoas que fazem o trabalho desde o início e implementamos de forma gradual, em vez de mudar tudo de um dia para o outro.",
      },
      {
        question: "O sistema fica a ser nosso?",
        answer:
          "Sim, o código-fonte e os dados são seus. Funciona na sua infraestrutura e pode mudá-lo de lugar ou entregá-lo a outra equipa em qualquer momento.",
      },
    ],
  },
  {
    slug: "automations-and-integrations",
    title: "Automações e Integrações",
    onHome: true,
    description:
      "Ligue os seus formulários, CRM, email e ferramentas de negócio. Automatize a introdução repetitiva de dados, os seguimentos e os relatórios, com regras claras, tratamento de erros e aprovação humana onde importa.",
    eyebrow: "Automações e Integrações",
    h1: "Automatize o trabalho que ninguém devia estar a fazer à mão.",
    lead: "Copiar dados entre sistemas, andar atrás de aprovações, enviar o mesmo email outra vez. Encontramos esse trabalho, automatizamo-lo e devolvemos as horas às pessoas que as estavam a gastar.",
    answer: {
      question: "O que são automações e integrações de negócio?",
      body: "Uma automação executa uma tarefa repetitiva sem que uma pessoa a tenha de fazer. Uma integração faz com que dois sistemas que nunca foram pensados para comunicar troquem dados de forma fiável. Juntas, eliminam a cópia manual, a reintrodução de dados e as insistências que, discretamente, consomem uma grande parte da semana de uma equipa de operações.",
      includes: [
        "Uma auditoria de onde vai realmente o tempo manual e repetitivo",
        "Fluxos automatizados que ligam as ferramentas que já paga",
        "Integrações entre sistemas sem ligação nativa",
        "Agentes de IA para os passos que exigem discernimento, e não apenas regras",
        "Monitorização e alertas, para que uma falha silenciosa não fique em silêncio",
      ],
    },
    audience: [
      {
        title: "Equipas de operações",
        body: "As suas pessoas estão a copiar dados entre sistemas em vez de fazerem o trabalho para que as contratou.",
      },
      {
        title: "Empresas com ferramentas desligadas",
        body: "Paga por bom software que se recusa a comunicar com o outro bom software por que também paga.",
      },
      {
        title: "Equipas pequenas sob pressão",
        body: "O volume cresceu, a equipa não, e contratar não é a resposta para um problema de copiar e colar.",
      },
      {
        title: "Quem introduz os mesmos dados várias vezes",
        body: "Se um número é introduzido duas vezes na sua empresa, uma dessas vezes pode deixar de acontecer.",
      },
    ],
    deliverables: [
      "Fluxos automatizados, a funcionar e monitorizados",
      "Integrações entre os sistemas que já usa",
      "Um mapa escrito do que está automatizado e do que o desencadeia",
      "Alertas quando algo falha, enviados para onde os vai ver",
      "Documentação para que a sua equipa possa ajustar as partes simples",
      "Medição do antes e do depois, para que a poupança seja um número",
    ],
    process: [
      {
        title: "Encontrar o desperdício",
        body: "Analisamos para onde vai o tempo repetitivo e ordenamos as tarefas pelas horas poupadas face ao esforço de as automatizar.",
      },
      {
        title: "Propor a solução",
        body: "Mostramos o que vai ser automatizado, quanto custa construir e manter, e quantas horas por mês devolve.",
      },
      {
        title: "Desenvolvimento",
        body: "Construímos com n8n, integrações por API e agentes de IA onde é preciso discernimento, começando pelo maior retorno.",
      },
      {
        title: "Implementação",
        body: "Primeiro corremos as automações em paralelo com o processo manual, para que possa confiar no resultado antes de as pessoas se afastarem.",
      },
      {
        title: "Monitorização",
        body: "Acrescentamos alertas e continuamos disponíveis, porque o verdadeiro risco da automação é uma falha que ninguém nota.",
      },
    ],
    faq: [
      {
        question: "O que é que se pode realisticamente automatizar?",
        answer:
          "Tudo o que seja repetitivo e baseado em regras: introdução de dados, relatórios, notificações, aprovações, faturação, integração de novos clientes ou colaboradores. Se uma pessoa segue os mesmos passos de cada vez, é uma candidata.",
      },
      {
        question: "Quanto tempo demoram as automações a pagar-se?",
        answer:
          "A maioria começa nas duas semanas de desenvolvimento. Medimos as horas antes e depois, para que o retorno seja um número que pode verificar e não uma afirmação nossa.",
      },
      {
        question: "Trabalham com as ferramentas que já temos?",
        answer:
          "Sim. O objetivo é ligar o que já paga, não vender-lhe um conjunto de ferramentas novo.",
      },
      {
        question: "E se uma automação falhar?",
        answer:
          "Acrescentamos monitorização e alertas desde o início. Uma automação avariada gere-se, uma avariada em silêncio é o que causa prejuízo, por isso garantimos que as falhas se fazem notar.",
      },
      {
        question: "Onde entram os agentes de IA?",
        answer:
          "Onde o passo exige discernimento em vez de uma regra, como classificar uma mensagem ou resumir um documento. Usamo-los para isso e mantemos regras determinísticas em tudo o resto.",
      },
      {
        question: "A nossa equipa consegue fazer a manutenção?",
        answer:
          "Das partes simples, sim, e documentamo-las exatamente para isso. As integrações mais complexas costumam justificar um acordo de suporte.",
      },
    ],
  },
  {
    slug: "website-development",
    title: "Desenvolvimento de Sites",
    onHome: false,
    description:
      "Um site rápido e bem construído, que os motores de busca conseguem ler e em que os clientes podem confiar. Desenhamos e desenvolvemos tudo e, no fim, entregamos-lhe o código-fonte e uma forma de o editar sozinho.",
    eyebrow: "Desenvolvimento de Sites",
    h1: "Sites construídos para serem encontrados e para converter.",
    lead: "A maioria dos sites de empresas é lenta, invisível nas pesquisas e impossível de editar. Construímos o contrário: rápidos, estruturados para os motores de busca e seus para manter.",
    answer: {
      question: "O que inclui o desenvolvimento de um site?",
      body: "Inclui design, desenvolvimento, estrutura de conteúdos e lançamento. Construímos o site para carregar depressa e para ser legível por motores de busca e assistentes de IA, que é hoje a forma como uma grande parte dos clientes encontra as empresas. Recebe o código-fonte e uma forma de alterar os textos sem nos ligar.",
      includes: [
        "Design e desenvolvimento de todas as páginas",
        "SEO técnico: metadados, dados estruturados, sitemap e robots",
        "Trabalho de desempenho, para que o site carregue depressa no telemóvel",
        "Formulários de contacto ligados à sua caixa de correio ou ao seu CRM",
        "Analítica e Search Console ligados no lançamento",
      ],
    },
    audience: [
      {
        title: "Empresas com um site desatualizado",
        body: "Foi feito há anos, ninguém o consegue editar e já não se parece com a empresa que é hoje.",
      },
      {
        title: "Negócios novos",
        body: "Precisa de uma presença credível antes de os clientes levarem a sério a primeira conversa.",
      },
      {
        title: "Negócios invisíveis nas pesquisas",
        body: "Existe online, mas ninguém o encontra, porque o site nunca foi construído para ser encontrado.",
      },
      {
        title: "Equipas presas à sua agência",
        body: "Cada pequena alteração de texto é um pedido e uma fatura, e quer voltar a ter o site sob o seu controlo.",
      },
    ],
    deliverables: [
      "Um site disponível no seu próprio domínio, com HTTPS",
      "Código-fonte no seu repositório",
      "SEO técnico implementado, não vendido à parte mais tarde",
      "Formulários de contacto a chegar onde realmente lê",
      "Analítica e Google Search Console ligados",
      "Uma sessão curta a mostrar-lhe como editar os conteúdos",
    ],
    process: [
      {
        title: "Compreender o negócio",
        body: "Definimos para quem é o site e o que tem de levar essas pessoas a fazer, antes de alguém falar em páginas ou cores.",
      },
      {
        title: "Design",
        body: "Desenhamos as páginas e validamo-las consigo, para que a estrutura e os textos estejam fechados antes de o desenvolvimento começar.",
      },
      {
        title: "Desenvolvimento",
        body: "Desenvolvemos o site com o desempenho e a visibilidade nas pesquisas incorporados de raiz, e não acrescentados mais tarde como correção.",
      },
      {
        title: "Lançamento",
        body: "Ligamos o seu domínio, configuramos os certificados, submetemos o sitemap e confirmamos que o site está a ser indexado.",
      },
      {
        title: "Entrega",
        body: "Mostramos-lhe como editar os conteúdos e entregamos o código, para que o site não dependa de nós.",
      },
    ],
    faq: [
      {
        question: "Quanto tempo demora um site?",
        answer:
          "A maioria demora algumas semanas, consoante o número de páginas e o quão prontos estão os seus conteúdos. Normalmente, são os conteúdos que definem a data.",
      },
      {
        question: "Posso editar o site sozinho depois?",
        answer:
          "Sim. Configuramos a edição de conteúdos para as partes que mudam com frequência e mostramos-lhe como funciona antes da entrega.",
      },
      {
        question: "Tratam do SEO?",
        answer:
          "A parte técnica está incluída: metadados, dados estruturados, desempenho, sitemap e indexação. A produção contínua de conteúdos e a obtenção de links são um esforço separado e continuado.",
      },
      {
        question: "E o alojamento?",
        answer:
          "Publicamos na Vercel ou na Netlify, na sua própria conta. Alojar um site institucional costuma ser gratuito ou quase, com um tráfego normal.",
      },
      {
        question: "Vai funcionar em telemóveis?",
        answer:
          "Sim, e tratamos o telemóvel como o caso principal e não como um pormenor, porque é daí que vem a maior parte do seu tráfego.",
      },
      {
        question: "O site fica a ser meu?",
        answer:
          "Sim, o código, o domínio e as contas estão todos em seu nome. Nada fica do nosso lado.",
      },
    ],
  },
  {
    slug: "landing-page-development",
    title: "Desenvolvimento de Landing Pages",
    onHome: false,
    description:
      "Uma única página com uma só função: transformar o tráfego que pagou em contactos. Construída depressa, medida como deve ser e pronta para ser testada contra uma segunda versão.",
    eyebrow: "Desenvolvimento de Landing Pages",
    h1: "Landing pages que transformam tráfego pago em contactos.",
    lead: "Enviar anúncios para a página inicial desperdiça o orçamento. Construímos uma página focada, com uma mensagem e uma ação, ligada ao acompanhamento de conversões desde a primeira visita.",
    answer: {
      question: "O que é uma landing page e quando precisa de uma?",
      body: "Uma landing page é uma única página construída à volta de uma oferta e de uma ação, sem a navegação e as distrações. Precisa de uma sempre que paga por tráfego, porque uma página inicial pede aos visitantes que escolham entre dez coisas e uma landing page pede-lhes que façam uma.",
      includes: [
        "Textos e design construídos à volta de uma única conversão",
        "Um formulário ou fluxo de marcação que chega onde trabalha",
        "Acompanhamento de conversões para o Google Ads e o Analytics",
        "Carregamento rápido, que afeta diretamente os custos dos seus anúncios",
        "Uma segunda variante preparada para testes A/B",
      ],
    },
    audience: [
      {
        title: "Quem faz anúncios pagos",
        body: "Está a comprar cliques e a enviá-los para uma página que nunca foi pensada para os converter.",
      },
      {
        title: "Negócios a lançar uma oferta",
        body: "Um produto, uma promoção, uma campanha que merece a sua própria página em vez de uma secção na página inicial.",
      },
      {
        title: "Equipas a testar um novo mercado",
        body: "Quer saber se a procura é real antes de se comprometer a construir tudo.",
      },
      {
        title: "Empresas com poucos contactos",
        body: "O tráfego chega e vai-se embora, e ninguém lhe consegue dizer em que ponto desiste.",
      },
    ],
    deliverables: [
      "Uma landing page disponível, rápida no telemóvel",
      "Textos escritos para a oferta, não enchimento genérico",
      "Um formulário ou fluxo de marcação a entregar na sua caixa de correio ou no seu CRM",
      "Acompanhamento de conversões verificado com uma submissão de teste real",
      "Uma segunda variante pronta para testes A/B",
      "Um relatório curto sobre o que acompanhar nas primeiras semanas",
    ],
    process: [
      {
        title: "Compreender a oferta",
        body: "Percebemos quem está a chegar, o que procura e que ação única a página tem de produzir.",
      },
      {
        title: "Textos e design",
        body: "Escrevemos a página à volta dessa ação e desenhamo-la para que nada no ecrã concorra com ela.",
      },
      {
        title: "Desenvolvimento",
        body: "Desenvolvemos a página a pensar na velocidade, porque o tempo de carregamento afeta tanto a conversão como o custo dos seus cliques.",
      },
      {
        title: "Acompanhamento",
        body: "Ligamos o acompanhamento de conversões e confirmamo-lo com uma submissão real, para que a sua plataforma de anúncios otimize com base na verdade.",
      },
      {
        title: "Testes",
        body: "Preparamos uma segunda variante para que possa melhorar a página com base em dados e não em opiniões.",
      },
    ],
    faq: [
      {
        question: "Em que é que isto é diferente de um site?",
        answer:
          "Um site informa e deixa as pessoas explorar. Uma landing page elimina a exploração e leva a uma única ação. Têm funções diferentes, e misturá-las custa-lhe conversões.",
      },
      {
        question: "Em quanto tempo fica pronta uma landing page?",
        answer:
          "Normalmente em cerca de duas semanas. É a forma mais rápida de testar se uma oferta funciona antes de investir em algo maior.",
      },
      {
        question: "Escrevem os textos?",
        answer:
          "Sim. Os textos são a maior parte do que faz uma landing page funcionar, por isso fazem parte do trabalho e não são algo que tenha de fornecer.",
      },
      {
        question: "Podem configurar testes A/B?",
        answer:
          "Sim. Preparamos uma segunda variante e configuramos o teste, para que possa melhorar a página com base no que os visitantes realmente fazem.",
      },
      {
        question: "Vai ligar-se ao meu CRM?",
        answer:
          "Sim, se o seu CRM o permitir. Caso contrário, as submissões chegam à sua caixa de correio ou a uma folha de cálculo, e podemos automatizar a partir daí.",
      },
      {
        question: "Preciso de uma página ou de várias?",
        answer:
          "Uma por oferta ou por público. Se os seus anúncios dizem coisas diferentes a pessoas diferentes, enviá-las todas para a mesma página desfaz a segmentação que pagou.",
      },
    ],
  },
  {
    slug: "google-ads-management",
    title: "Gestão de Google Ads",
    onHome: false,
    description:
      "Tráfego pago gerido por quem também constrói a página onde ele chega. Configuramos as campanhas, garantimos que o acompanhamento de conversões diz a verdade e cortamos o investimento que não está a gerar clientes.",
    eyebrow: "Gestão de Google Ads",
    h1: "Google Ads geridos com base em conversões reais.",
    lead: "A maioria das contas otimiza para o número errado. Primeiro configuramos bem o acompanhamento de conversões e depois gerimos as campanhas com base na métrica que importa: clientes, não cliques.",
    answer: {
      question: "O que inclui a gestão de Google Ads?",
      body: "Inclui a configuração das campanhas, o acompanhamento de conversões, a otimização contínua e os relatórios. A parte que a maioria das contas faz mal é o acompanhamento. Se a Google não consegue ver que cliques se tornaram clientes, otimiza para a coisa errada e o orçamento vai para tráfego que nunca converte.",
      includes: [
        "Configuração da conta e das campanhas, ou uma auditoria da existente",
        "Pesquisa de palavras-chave e uma lista de palavras-chave negativas desde o primeiro dia",
        "Acompanhamento de conversões verificado de ponta a ponta, não presumido",
        "Textos dos anúncios escritos e testados uns contra os outros",
        "Relatórios mensais em linguagem simples, com o que muda a seguir",
      ],
    },
    audience: [
      {
        title: "Negócios novos nos anúncios pagos",
        body: "Quer clientes vindos das pesquisas e prefere não aprender isto a queimar primeiro um orçamento.",
      },
      {
        title: "Contas que gastam sem resultados",
        body: "O dinheiro sai todos os meses e ninguém consegue mostrar que parte dele trouxe um cliente.",
      },
      {
        title: "Empresas com uma boa oferta",
        body: "O produto converte assim que as pessoas o veem, e o problema é simplesmente que não há pessoas suficientes a vê-lo.",
      },
      {
        title: "Equipas sem acompanhamento",
        body: "Os seus relatórios mostram cliques e impressões, e nada que esteja ligado à receita.",
      },
    ],
    deliverables: [
      "Campanhas construídas e ativas, ou reestruturadas se já existirem",
      "Acompanhamento de conversões verificado com uma conversão real",
      "Listas de palavras-chave e de palavras-chave negativas que pode consultar",
      "Variantes de texto dos anúncios a competir entre si",
      "Relatórios mensais ligados aos contactos e ao custo por contacto",
      "Propriedade total da conta de anúncios, em seu nome",
    ],
    process: [
      {
        title: "Auditoria e objetivos",
        body: "Analisamos a conta que já exista, acordamos quanto vale uma conversão para si e definimos o custo por contacto pretendido.",
      },
      {
        title: "Acompanhamento primeiro",
        body: "Configuramos e verificamos o acompanhamento de conversões antes de gastar o que quer que seja, porque tudo o que vem a seguir depende disso.",
      },
      {
        title: "Construção das campanhas",
        body: "Construímos as campanhas, as palavras-chave, as negativas e os textos dos anúncios, estruturados para que os relatórios sejam realmente legíveis.",
      },
      {
        title: "Otimização",
        body: "Cortamos o que não converte, expandimos o que converte e continuamos a aumentar a lista de palavras-chave negativas todos os meses.",
      },
      {
        title: "Relatórios",
        body: "Recebe relatórios mensais em linguagem simples, com o que alterámos e o que vamos alterar a seguir.",
      },
    ],
    faq: [
      {
        question: "De que orçamento preciso para começar?",
        answer:
          "O suficiente para recolher dados num prazo razoável, o que depende do seu custo por clique e de quantos contactos precisa para avaliar os resultados. Fazemos essas contas consigo antes de se comprometer.",
      },
      {
        question: "De quem é a conta de anúncios?",
        answer:
          "É sua, em nome da sua empresa. Trabalhamos dentro da sua conta, por isso, se deixarmos de trabalhar juntos, fica com a conta, o histórico e os dados.",
      },
      {
        question: "Quando vou ver resultados?",
        answer:
          "O tráfego começa de imediato, mas as primeiras semanas servem para aprender. Avaliar o desempenho com bom senso costuma exigir um ou dois meses de dados reais de conversão.",
      },
      {
        question: "Também constroem a landing page?",
        answer:
          "Sim, e normalmente ela importa mais do que as definições da campanha. Anúncios e página são o mesmo trabalho, e é por isso que preferimos fazer os dois.",
      },
      {
        question: "Porque é que o acompanhamento de conversões é tão importante?",
        answer:
          "Porque a Google otimiza para aquilo que lhe disser para contar. Se esse número estiver errado, o algoritmo vai comprar-lhe, com toda a eficiência, o tráfego errado.",
      },
      {
        question: "Trabalham com outras plataformas de anúncios?",
        answer:
          "O nosso foco é o Google Ads, porque capta pessoas que já estão a pesquisar o que vende. Podemos aconselhar sobre outras, mas não vamos fingir que somos especialistas em tudo.",
      },
    ],
  },
];

/** The method really is a sequence, which is why these are numbered. */
export const methodPt: MethodStep[] = [
  {
    step: "01",
    title: "Identificar o problema",
    body: "Analisamos os passos que a sua equipa repete, as ferramentas envolvidas e os pontos onde a informação se atrasa ou é copiada à mão. Em conjunto, escolhemos um fluxo de trabalho que vale a pena melhorar.",
  },
  {
    step: "02",
    title: "Propor a solução",
    body: "Apresentamos tudo o que vai ser construído, o investimento, o prazo de entrega, os custos de funcionamento (servidores, bases de dados, integrações, entre outros) e a forma como vamos medir o resultado.",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    body: "Trabalhamos com tecnologias como Next.js, Supabase, n8n, envio de email, integrações por API e agentes de IA para construir a melhor solução, e a mais adaptada, para a sua necessidade.",
  },
  {
    step: "04",
    title: "Entrega",
    body: "Conduzimos um processo contínuo consigo e com a sua equipa para integrar o sistema no dia a dia. O nosso objetivo é tornar toda a adaptação o mais fácil possível.",
  },
  {
    step: "05",
    title: "Suporte",
    body: "Cada sistema, aplicação ou automação precisa do seu próprio suporte dedicado. É por isso que ajustamos o nosso à sua medida, para manter a parceria a funcionar a longo prazo.",
  },
];
