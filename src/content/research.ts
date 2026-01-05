export type ResearchItem = {
  slug: string;
  title: string;
  summary: string;
  topics: string[];
};

export const research: ResearchItem[] = [
  {
    slug: "ad-abuse-path-analysis",
    title: "Active Directory Abuse Path Analysis (Constraints-First)",
    summary:
      "An analytical write-up format that focuses on preconditions, constraints, defensive visibility, and why some paths were rejected.",
    topics: ["Active Directory", "Detection", "Privilege Boundaries"],
  },
  {
    slug: "defense-bypass-with-constraints",
    title: "Defense Bypass Techniques Under Real Constraints",
    summary:
      "Notes on how detection, policy, and business impact shape what a red team should and should not do.",
    topics: ["EDR", "Tradeoffs", "Rules of Engagement"],
  },
];
