import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { alternates, localePath, resolveLang } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const pt = lang === "pt";
  return {
    title: pt ? "Termos de Utilização" : "Terms of Use",
    description: pt
      ? "Os termos que se aplicam à utilização do website da GuyShore: o que pode fazer com o conteúdo, o que o site promete e não promete, e qual a lei aplicável."
      : "The terms that apply to using the GuyShore website: what you may do with the content, what the site does and does not promise, and which law governs it.",
    alternates: alternates(lang, "/terms"),
  };
}

const UPDATED = "2026-09-15";

export default async function TermsPage({ params }: Props) {
  const lang = await resolveLang(params);
  return lang === "pt" ? <TermsPt /> : <TermsEn />;
}

function TermsEn() {
  return (
    <>
      <PageHeader
        eyebrow="Terms of Use"
        title="The rules for using this website."
        lead="Short and in plain language. These terms cover the website itself. The work we do for clients is governed by the contract we sign with them, not by this page."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="prose max-w-[68ch]">
          <p className="font-label text-xs tracking-[0.08em] text-slate uppercase">
            Last updated {UPDATED}
          </p>

          <h2>Who operates this site</h2>
          <p>
            This website is operated by {site.listingName}, at{" "}
            {site.address.street}, {site.address.postalCode}{" "}
            {site.address.city}, {site.address.country}. You can reach us on{" "}
            {site.phone.display} or at {site.email}.
          </p>
          <p>
            By using the site you accept these terms. If you do not accept
            them, please do not use it.
          </p>

          <h2>Using the site</h2>
          <p>
            You may read, print and share our pages for your own use or your
            company&rsquo;s. What you may not do is interfere with the site,
            try to gain access to parts of it that are not public, scrape it at
            a volume that degrades it for other people, or use it to send us
            anything unlawful.
          </p>

          <h2>Our content</h2>
          <p>
            The text, design, code, logo and images on this site belong to us,
            except where they clearly belong to someone else. The partner logos
            shown on our home page belong to those companies and appear with
            their agreement.
          </p>
          <p>
            You are welcome to quote a passage with a link back to the page it
            came from. Republishing whole pages, or reusing the design or the
            code, needs our written permission.
          </p>

          <h2>What you send us</h2>
          <p>
            When you write to us through the contact form you keep ownership of
            what you send. You give us permission to read it, store it and
            reply to it, which is the whole point of sending it. Please do not
            send confidential information through the form before we have a
            confidentiality agreement in place. If your idea is sensitive, tell
            us that first and we will arrange one.
          </p>
          <p>
            How we handle the personal data in a submission is set out in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Links to other sites</h2>
          <p>
            Some pages link to sites we do not run, including those of our
            partners. We link to them because we think they are useful, but we
            do not control them and we are not responsible for their content or
            their privacy practices. Read their terms when you get there.
          </p>

          {/* Required, not decorative: the Google Maps Platform terms
              (section 3.2.2) oblige any site that shows Google Maps content
              to say this and link both documents. Remove it only together
              with the reviews section. */}
          <h2>Google Maps content</h2>
          <p>
            Our home page can show our rating, our number of reviews and a
            selection of reviews from Google Maps. Use of that Google Maps
            content is subject to the current{" "}
            <a
              href="https://maps.google.com/help/terms_maps/"
              target="_blank"
              rel="noreferrer"
            >
              Google Maps End User Additional Terms of Service
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            and the{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Google Privacy Policy
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>

          <h2>What this site does and does not promise</h2>
          <p>
            We work to keep the information here accurate and the site
            available, but we do not guarantee either. Pages describe our
            services in general terms. They are not a quote, not an offer
            capable of acceptance, and not professional advice for your
            specific situation. Nothing on this site creates a contract between
            us.
          </p>
          <p>
            Timelines, scope and price for actual work are agreed in writing
            before a project starts, and it is that document that binds us, not
            anything on this page.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent the law allows, we are not liable for loss arising
            from your use of this website or from relying on its general
            information. Nothing here limits liability that cannot be limited
            by law, including liability for death, personal injury or fraud.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The version on this page is the one that
            applies, and the date above tells you when it last changed.
          </p>

          <h2>Which law applies</h2>
          <p>
            These terms are governed by Portuguese law, and the courts of
            Lisbon have jurisdiction over any dispute about them. If you are
            using the site as a consumer, this does not take away the
            protection of the mandatory law of the country you live in.
          </p>

          <h2>Getting in touch</h2>
          <p>
            Questions about these terms can go to {site.email} or{" "}
            {site.phone.display}, or through the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

function TermsPt() {
  return (
    <>
      <PageHeader
        eyebrow="Termos de Utilização"
        title="As regras de utilização deste website."
        lead="Curtos e em linguagem simples. Estes termos abrangem o website em si. O trabalho que fazemos para clientes rege-se pelo contrato que assinamos com eles, e não por esta página."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="prose max-w-[68ch]">
          <p className="font-label text-xs tracking-[0.08em] text-slate uppercase">
            Última atualização {UPDATED}
          </p>

          <h2>Quem gere este site</h2>
          <p>
            Este website é gerido por {site.listingName}, com sede em{" "}
            {site.address.street}, {site.address.postalCode}{" "}
            {site.address.city}, {site.address.country}. Pode contactar-nos
            pelo telefone {site.phone.display} ou para {site.email}.
          </p>
          <p>
            Ao utilizar o site, aceita estes termos. Se não os aceitar, por
            favor não o utilize.
          </p>

          <h2>Utilização do site</h2>
          <p>
            Pode ler, imprimir e partilhar as nossas páginas para uso próprio
            ou da sua empresa. O que não pode fazer é interferir com o site,
            tentar aceder a partes que não são públicas, extrair o seu conteúdo
            de forma automatizada num volume que o degrade para outras pessoas,
            ou utilizá-lo para nos enviar algo ilícito.
          </p>

          <h2>O nosso conteúdo</h2>
          <p>
            Os textos, o design, o código, o logótipo e as imagens deste site
            pertencem-nos, exceto quando claramente pertencem a outra pessoa.
            Os logótipos de parceiros apresentados na nossa página inicial
            pertencem a essas empresas e aparecem com o seu acordo.
          </p>
          <p>
            Pode citar um excerto com uma ligação para a página de onde foi
            retirado. Republicar páginas inteiras, ou reutilizar o design ou o
            código, requer a nossa autorização escrita.
          </p>

          <h2>O que nos envia</h2>
          <p>
            Quando nos escreve através do formulário de contacto, continua a
            ser titular do que envia. Dá-nos autorização para o ler, guardar e
            responder, que é precisamente o objetivo de o enviar. Por favor,
            não envie informação confidencial através do formulário antes de
            termos um acordo de confidencialidade em vigor. Se a sua ideia for
            sensível, diga-nos isso primeiro e trataremos de o celebrar.
          </p>
          <p>
            A forma como tratamos os dados pessoais de um envio está descrita
            na nossa{" "}
            <Link href={localePath("pt", "/privacy")}>
              Política de Privacidade
            </Link>
            .
          </p>

          <h2>Ligações para outros sites</h2>
          <p>
            Algumas páginas têm ligações para sites que não gerimos, incluindo
            os dos nossos parceiros. Incluímos essas ligações por as
            considerarmos úteis, mas não as controlamos e não somos
            responsáveis pelo seu conteúdo nem pelas suas práticas de
            privacidade. Leia os termos desses sites quando lá chegar.
          </p>

          {/* Required, not decorative: the Google Maps Platform terms
              (section 3.2.2) oblige any site that shows Google Maps content
              to say this and link both documents. Remove it only together
              with the reviews section. */}
          <h2>Conteúdo do Google Maps</h2>
          <p>
            A nossa página inicial pode mostrar a nossa classificação, o nosso
            número de avaliações e uma seleção de avaliações do Google Maps. A
            utilização desse conteúdo do Google Maps está sujeita aos atuais{" "}
            <a
              href="https://maps.google.com/help/terms_maps/"
              target="_blank"
              rel="noreferrer"
            >
              Termos de Utilização Adicionais do Google Maps para Utilizadores
              Finais
              <span className="sr-only"> (abre num novo separador)</span>
            </a>{" "}
            e à{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Política de Privacidade da Google
              <span className="sr-only"> (abre num novo separador)</span>
            </a>
            .
          </p>

          <h2>O que este site promete e não promete</h2>
          <p>
            Esforçamo-nos por manter a informação aqui exata e o site
            disponível, mas não garantimos nem uma coisa nem outra. As páginas
            descrevem os nossos serviços em termos gerais. Não constituem um
            orçamento, nem uma proposta suscetível de aceitação, nem
            aconselhamento profissional para a sua situação concreta. Nada
            neste site cria um contrato entre nós.
          </p>
          <p>
            Os prazos, o âmbito e o preço de qualquer trabalho são acordados
            por escrito antes do início do projeto, e é esse documento que nos
            vincula, e não algo que conste desta página.
          </p>

          <h2>Responsabilidade</h2>
          <p>
            Na medida permitida por lei, não somos responsáveis por perdas
            resultantes da sua utilização deste website ou da confiança na sua
            informação geral. Nada aqui limita a responsabilidade que não possa
            ser limitada por lei, incluindo a responsabilidade por morte,
            danos pessoais ou fraude.
          </p>

          <h2>Alterações</h2>
          <p>
            Podemos atualizar estes termos. A versão que consta desta página é
            a que se aplica, e a data acima indica quando foi alterada pela
            última vez.
          </p>

          <h2>Lei aplicável</h2>
          <p>
            Estes termos regem-se pela lei portuguesa, e os tribunais de Lisboa
            são competentes para qualquer litígio relativo aos mesmos. Se
            utilizar o site como consumidor, isto não o priva da proteção
            conferida pelas normas imperativas da lei do país onde reside.
          </p>

          <h2>Contacto</h2>
          <p>
            As questões sobre estes termos podem ser enviadas para {site.email}{" "}
            ou feitas pelo telefone {site.phone.display}, ou através da{" "}
            <Link href={localePath("pt", "/contact")}>página de contacto</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
