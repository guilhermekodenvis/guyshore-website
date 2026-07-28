export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mx-auto max-w-[76rem] px-6 pt-20 pb-14 lg:px-10 lg:pt-28 lg:pb-20">
      <p className="eyebrow text-surf">{eyebrow}</p>
      <h1 className="mt-5 max-w-[18ch] text-title">{title}</h1>
      {lead ? (
        <p className="mt-7 max-w-[52ch] text-lead text-tide">{lead}</p>
      ) : null}
      <div className="tick-rule mt-14" />
    </header>
  );
}
