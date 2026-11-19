import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { localePath, resolveLang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const pt = lang === "pt";
  return pageMetadata({
    lang,
    path: "/privacy",
    title: pt ? "Política de Privacidade" : "Privacy Policy",
    description: pt
      ? "Como a GuyShore trata dados pessoais: o que o formulário de contacto recolhe, a etiqueta da Google que só funciona com o seu consentimento, quem trata os seus dados, durante quanto tempo são conservados e quais são os seus direitos."
      : "How GuyShore handles personal data: what the contact form collects, the Google tag that runs only with your consent, who processes your data, how long it is kept, and your rights.",
  });
}

/** Shown on the page and used as the schema's dateModified. */
const UPDATED = "2026-09-15";

export default async function PrivacyPage({ params }: Props) {
  const lang = await resolveLang(params);
  return lang === "pt" ? <PrivacyPt /> : <PrivacyEn />;
}

function PrivacyEn() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        title="What we collect, and what we do not."
        lead="This site has one Google tag, used for Google Ads and Google Analytics, and it sets cookies only if you accept. Beyond that, the only personal data we hold is what you choose to send us."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="prose max-w-[68ch]">
          <p className="font-label text-xs tracking-[0.08em] text-slate uppercase">
            Last updated {UPDATED}
          </p>

          <h2>Who is responsible for your data</h2>
          <p>
            {site.listingName} is the controller of the personal data described
            here. You can reach us at {site.address.street},{" "}
            {site.address.postalCode} {site.address.city},{" "}
            {site.address.country}, by phone on {site.phone.display} or by
            email at {site.email}.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>What you send through the contact form.</strong> Your name,
            your email address and your message. The form also has optional
            fields for your company and what you need. We do not ask for
            anything else, and nothing in the form is required beyond what is
            marked as such.
          </p>
          <p>
            <strong>Technical records from our host.</strong> Serving a web
            page necessarily involves your IP address, your browser type and
            the time of the request. Our hosting provider records these in
            standard server logs. We do not connect them to anything else and
            we do not use them to build a profile of you.
          </p>
          <p>
            <strong>Advertising and visit data, only if you accept.</strong> If
            you accept cookies, the Google tag records that you visited, the
            pages you view, your IP address, your browser and device, and
            whether you arrived from one of our ads. It sends this to Google Ads,
            so we can measure whether our ads work and Google can show our ads
            to people who have visited the site, and to Google Analytics, so we
            can count visits and see which pages people read. If you decline, or
            do not choose, the tag sets no cookies and sends Google only basic
            signals without identifiers, as Google&rsquo;s consent mode
            requires, so none of this is linked to you.
          </p>
          <p>That is the complete list. Nothing else on this site tracks you.</p>

          <h2>Why we use it, and on what basis</h2>
          <p>
            We use what you send through the form to answer you and, if the
            conversation continues, to prepare a proposal. Under the General
            Data Protection Regulation the basis for this is our legitimate
            interest in responding to someone who contacted us, and, once a
            project is under discussion, the steps taken at your request before
            entering into a contract.
          </p>
          <p>
            We use the server logs to keep the site running and secure, which
            is also a legitimate interest.
          </p>
          <p>
            The Google tag sets cookies and collects the data above only on your
            consent. You can withdraw it at any
            time from <strong>Cookie settings</strong> at the bottom of every
            page, and withdrawing is as easy as accepting was.
          </p>

          <h2>Who else handles it</h2>
          <p>
            We keep the number of companies touching your data as small as we
            can. These process it on our instructions and for no purpose of
            their own:
          </p>
          <ul>
            <li>
              <strong>Netlify</strong> hosts the site and produces the server
              logs described above.
            </li>
            <li>
              <strong>n8n Cloud</strong> receives each form submission and
              routes it to our inbox.
            </li>
            <li>
              <strong>Google Workspace</strong> provides the mailbox where your
              message arrives and where our reply is written.
            </li>
          </ul>
          <p>
            <strong>Google Ads and Google Analytics</strong>, run by Google
            Ireland Limited, are different. If you accept the tag, Google
            receives the advertising and visit data described above and also
            uses it under its own terms, which are explained in{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
            >
              how Google uses information from sites that use its services
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
          <p>
            We do not sell personal data. Apart from the Google tag, which you
            can decline, we do not share it with anyone for marketing.
          </p>

          <h2>Data leaving the European Economic Area</h2>
          <p>
            The providers above are United States companies or part of United
            States groups, and your data may be processed there. Those transfers
            rely on the European Commission&rsquo;s standard contractual
            clauses, or on the EU to US Data Privacy Framework where the
            provider is certified under it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            If a message does not lead to work together, we delete it within
            twelve months. If it does, we keep the correspondence for as long
            as the working relationship lasts and then for the period our
            accounting and tax obligations require. Server logs are kept for a
            short retention window by our host and are not archived by us.
          </p>
          <p>
            The Google Ads cookie expires after 90 days. We remember your cookie
            choice for up to 13 months if you accept and 6 months if you
            decline, and then ask again.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us for a copy of the data we hold about you, ask us to
            correct it, ask us to delete it, ask us to restrict how we use it,
            ask for it in a portable format, or object to our use of it. Write
            to {site.email} and we will respond within one month.
          </p>
          <p>
            If you believe we have handled your data badly, you can complain to
            the Portuguese data protection authority, the Comissão Nacional de
            Proteção de Dados, or to the authority in the country where you
            live.
          </p>

          <h2>Cookies and storage on your device</h2>
          <p>
            <strong>If you accept</strong>, the Google tag sets the{" "}
            <code>_gcl_au</code> cookie, which links a visit to an ad you
            clicked and lasts 90 days. Google Analytics runs without setting its
            own cookies on this site. Google may also read or set cookies on its
            own domains, under its own policy.
          </p>
          <p>
            <strong>If you decline</strong>, no advertising or analytics cookie
            is set, and the tag sends Google only basic signals without
            identifiers.
          </p>
          <p>
            <strong>Either way</strong>, we keep your choice in your
            browser&rsquo;s local storage under the name{" "}
            <code>guyshore-consent</code>, so we do not ask on every page. It
            holds only your choice and the date you made it, and exists so that
            your decision is respected. You can change your mind at any time
            from <strong>Cookie settings</strong> at the bottom of every page;
            withdrawing an acceptance deletes the Google Ads cookie.
          </p>

          <h2>Children</h2>
          <p>
            This site is aimed at businesses and is not directed at children.
            We do not knowingly collect data from anyone under sixteen.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle personal data, we will update this page
            and change the date at the top. Material changes will be described
            rather than quietly folded in. The change of {UPDATED} added the
            Google tag, for Google Ads and Google Analytics, and the choice to
            accept or decline it.
          </p>

          <h2>Getting in touch</h2>
          <p>
            Any question about this policy can go to {site.email} or{" "}
            {site.phone.display}. You can also use the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

function PrivacyPt() {
  return (
    <>
      <PageHeader
        eyebrow="Política de Privacidade"
        title="O que recolhemos, e o que não recolhemos."
        lead="Este site tem uma única etiqueta da Google, utilizada para o Google Ads e o Google Analytics, e só define cookies se aceitar. Para além disso, os únicos dados pessoais que guardamos são os que decide enviar-nos."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="prose max-w-[68ch]">
          <p className="font-label text-xs tracking-[0.08em] text-slate uppercase">
            Última atualização {UPDATED}
          </p>

          <h2>Quem é responsável pelos seus dados</h2>
          <p>
            {site.listingName} é o responsável pelo tratamento dos dados
            pessoais aqui descritos. Pode contactar-nos em{" "}
            {site.address.street}, {site.address.postalCode}{" "}
            {site.address.city},{" "}
            {site.address.country}, pelo telefone {site.phone.display} ou por
            email para {site.email}.
          </p>

          <h2>O que recolhemos</h2>
          <p>
            <strong>O que nos envia através do formulário de contacto.</strong>{" "}
            O seu nome, o seu endereço de email e a sua mensagem. O formulário
            tem também campos opcionais para a sua empresa e para aquilo de que
            precisa. Não pedimos mais nada, e nenhum campo do formulário é
            obrigatório para além dos que estão assinalados como tal.
          </p>
          <p>
            <strong>Registos técnicos do nosso alojamento.</strong> Servir uma
            página web envolve necessariamente o seu endereço IP, o tipo de
            navegador e a hora do pedido. O nosso fornecedor de alojamento
            guarda estes dados em registos de servidor normais. Não os
            associamos a mais nada e não os utilizamos para traçar o seu
            perfil.
          </p>
          <p>
            <strong>Dados de publicidade e de visita, só se aceitar.</strong> Se
            aceitar os cookies, a etiqueta da Google regista que visitou o site,
            as páginas que vê, o seu endereço IP, o seu navegador e dispositivo,
            e se chegou através de um dos nossos anúncios. Envia estes dados ao
            Google Ads, para podermos medir se os nossos anúncios funcionam e
            para a Google poder mostrar os nossos anúncios a pessoas que
            visitaram o site, e ao Google Analytics, para podermos contar as
            visitas e ver que páginas são lidas. Se recusar, ou não escolher, a
            etiqueta não define cookies e envia à Google apenas sinais básicos
            sem identificadores, como exige o modo de consentimento da Google,
            pelo que nada disto fica associado a si.
          </p>
          <p>
            A lista está completa. Nada mais neste site acompanha a sua
            atividade.
          </p>

          <h2>Para que os utilizamos, e com que fundamento</h2>
          <p>
            Utilizamos o que nos envia através do formulário para lhe responder
            e, se a conversa continuar, para preparar uma proposta. Nos termos
            do Regulamento Geral sobre a Proteção de Dados (RGPD), o fundamento
            é o nosso interesse legítimo em responder a quem nos contactou e,
            quando um projeto está em discussão, as diligências pré-contratuais
            tomadas a seu pedido.
          </p>
          <p>
            Utilizamos os registos de servidor para manter o site a funcionar e
            em segurança, o que é também um interesse legítimo.
          </p>
          <p>
            A etiqueta da Google só define cookies e recolhe os dados acima
            indicados com o seu consentimento. Pode retirar o consentimento a
            qualquer momento em <strong>Definições de cookies</strong>, no fundo
            de todas as páginas, e retirá-lo é tão fácil como foi dá-lo.
          </p>

          <h2>Quem mais os trata</h2>
          <p>
            Mantemos o número de empresas com acesso aos seus dados tão pequeno
            quanto possível. Estes subcontratantes tratam-nos segundo as nossas
            instruções e sem qualquer finalidade própria:
          </p>
          <ul>
            <li>
              <strong>Netlify</strong> aloja o site e produz os registos de
              servidor acima descritos.
            </li>
            <li>
              <strong>n8n Cloud</strong> recebe cada envio do formulário e
              encaminha-o para a nossa caixa de correio.
            </li>
            <li>
              <strong>Google Workspace</strong> fornece a caixa de correio onde
              a sua mensagem chega e onde a nossa resposta é escrita.
            </li>
          </ul>
          <p>
            O <strong>Google Ads e o Google Analytics</strong>, geridos pela
            Google Ireland Limited, são diferentes. Se aceitar a etiqueta, a
            Google recebe os dados de publicidade e de visita acima descritos e
            utiliza-os também nos seus próprios termos, explicados em{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
            >
              como a Google utiliza informações de sites que utilizam os seus
              serviços
              <span className="sr-only"> (abre num novo separador)</span>
            </a>
            .
          </p>
          <p>
            Não vendemos dados pessoais. Para além da etiqueta da Google, que
            pode recusar, não os partilhamos com ninguém para fins de
            marketing.
          </p>

          <h2>Dados que saem do Espaço Económico Europeu</h2>
          <p>
            Os fornecedores acima são empresas dos Estados Unidos ou fazem parte
            de grupos dos Estados Unidos, e os seus dados podem ser tratados
            nesse país. Essas transferências assentam nas cláusulas
            contratuais-tipo da Comissão Europeia ou, quando o fornecedor está
            certificado ao abrigo do mesmo, no Quadro de Privacidade de Dados
            UE-EUA.
          </p>

          <h2>Durante quanto tempo os conservamos</h2>
          <p>
            Se uma mensagem não der origem a trabalho conjunto, apagamo-la no
            prazo de doze meses. Se der, conservamos a correspondência enquanto
            durar a relação de trabalho e, depois disso, pelo período exigido
            pelas nossas obrigações contabilísticas e fiscais. Os registos de
            servidor são conservados pelo nosso fornecedor de alojamento durante
            um curto período e não são arquivados por nós.
          </p>
          <p>
            O cookie do Google Ads expira ao fim de 90 dias. Lembramo-nos da sua
            escolha sobre cookies durante até 13 meses se aceitar e 6 meses se
            recusar, e depois voltamos a perguntar.
          </p>

          <h2>Os seus direitos</h2>
          <p>
            Pode pedir-nos uma cópia dos dados que temos sobre si, pedir que os
            retifiquemos, que os apaguemos, que limitemos a forma como os
            utilizamos, pedir que lhos entreguemos num formato portável, ou
            opor-se à sua utilização. Escreva para {site.email} e responderemos
            no prazo de um mês.
          </p>
          <p>
            Se considerar que tratámos mal os seus dados, pode apresentar
            reclamação à autoridade portuguesa de proteção de dados, a Comissão
            Nacional de Proteção de Dados (CNPD), ou à autoridade do país onde
            vive.
          </p>

          <h2>Cookies e armazenamento no seu dispositivo</h2>
          <p>
            <strong>Se aceitar</strong>, a etiqueta da Google define o cookie{" "}
            <code>_gcl_au</code>, que associa uma visita a um anúncio em que
            clicou e dura 90 dias. O Google Analytics funciona sem definir os
            seus próprios cookies neste site. A Google pode também ler ou
            definir cookies nos seus próprios domínios, ao abrigo da sua própria
            política.
          </p>
          <p>
            <strong>Se recusar</strong>, não é definido nenhum cookie de
            publicidade ou de análise, e a etiqueta envia à Google apenas sinais
            básicos sem identificadores.
          </p>
          <p>
            <strong>Em qualquer dos casos</strong>, guardamos a sua escolha no
            armazenamento local do seu navegador com o nome{" "}
            <code>guyshore-consent</code>, para não lhe perguntarmos em cada
            página. Contém apenas a sua escolha e a data em que a fez, e existe
            para que a sua decisão seja respeitada. Pode mudar de ideias a
            qualquer momento em <strong>Definições de cookies</strong>, no
            fundo de todas as páginas. Retirar uma aceitação apaga o cookie do
            Google Ads.
          </p>

          <h2>Crianças</h2>
          <p>
            Este site destina-se a empresas e não se dirige a crianças. Não
            recolhemos conscientemente dados de menores de dezasseis anos.
          </p>

          <h2>Alterações a esta política</h2>
          <p>
            Se mudarmos a forma como tratamos dados pessoais, atualizaremos
            esta página e a data no topo. As alterações relevantes serão
            descritas, e não incluídas discretamente. A alteração de {UPDATED}{" "}
            acrescentou a etiqueta da Google, para o Google Ads e o Google
            Analytics, e a possibilidade de a aceitar ou recusar.
          </p>

          <h2>Contacto</h2>
          <p>
            Qualquer questão sobre esta política pode ser enviada para{" "}
            {site.email} ou feita pelo telefone {site.phone.display}. Pode
            também utilizar a{" "}
            <Link href={localePath("pt", "/contact")}>página de contacto</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
