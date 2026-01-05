export type Report = {
  slug: string;
  title: string;
  audience: "Executive" | "Executive + Technical";
  summary: string;
  pdfPath: string;
  webView: {
    executiveSummary: string[];
    technicalFindingsForDefenders: {
      title: string;
      whatWeObserved: string[];
      whyItMatters: string[];
      detection: string[];
      remediation: string[];
    }[];
    riskScoringRationale: string[];
    businessImpactMapping: string[];
  };
};

export const reports: Report[] = [
  {
    slug: "sample-red-team-report",
    title: "Red Team Report (Sample Format)",
    audience: "Executive + Technical",
    summary:
      "A sample structure that demonstrates executive clarity, technical depth for defenders, and risk rationale. Replace with your own sanitized deliverable.",
    pdfPath: "/reports/sample-red-team-report.pdf",
    webView: {
      executiveSummary: [
        "Objective: measure resilience against realistic adversary tradecraft under explicit authorization.",
        "Outcome: identified specific control gaps and visibility breakpoints that materially changed time-to-detect.",
        "What leadership should do next: prioritize remediation of identity controls and monitoring coverage for privileged workflows.",
      ],
      technicalFindingsForDefenders: [
        {
          title: "Identity workflow exposure created high-leverage access paths",
          whatWeObserved: [
            "Misconfigurations and operational patterns enabled escalation under constrained assumptions.",
            "The chain required multiple conditions; it was not a single “magic” exploit.",
          ],
          whyItMatters: [
            "Identity control failures scale across many systems and reduce containment options.",
          ],
          detection: [
            "Monitor high-signal identity events around privileged group changes and anomalous logons.",
            "Correlate endpoint + identity telemetry around privileged sessions.",
          ],
          remediation: [
            "Reduce standing privileges; implement tiered admin.",
            "Add controls to privileged workflows; validate with purple-team retesting.",
          ],
        },
      ],
      riskScoringRationale: [
        "Likelihood considered preconditions, attacker effort, and required access level.",
        "Impact considered business process disruption and breadth of identity compromise.",
        "Rationale recorded to keep scoring defensible across stakeholders.",
      ],
      businessImpactMapping: [
        "Mapped identity compromise to downstream business applications relying on SSO/AD.",
        "Highlighted operational downtime risk and incident response complexity.",
      ],
    },
  },
];
