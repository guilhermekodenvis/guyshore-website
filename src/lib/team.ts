export const founder = {
  name: "Guy Sartori",
  role: "Founder",
  bio: "Developer since 2012. He has founded other companies and worked as a developer for large organizations across autotech, banking, agribusiness and other sectors.",
  photo: "/guy-sartori-avatar.png",
  linkedin: "https://www.linkedin.com/in/guy-sartori",
  /**
   * Rendered under the LinkedIn button. A `value` is shown large; an entry
   * without one is a statement that does not reduce to a number. Keep these
   * consistent with `bio`: "since 2012" is what makes "10+ years" true.
   */
  highlights: [
    { value: "10+", label: "years as a developer" },
    { value: "6+", label: "years coding without AI" },
    { value: "50+", label: "projects" },
    {
      value: null,
      label:
        "A bank management system, from scratch to production-ready software",
    },
  ],
} as const;
