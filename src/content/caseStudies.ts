export type MitreRef = {
  tactic: string;
  technique: string;
  techniqueId: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  scenario: string;
  assumedScope: string[];
  initialAccessVectorsConsidered: string[];
  exploitationPathWithDecisionLogic: string[];
  privilegeEscalationAndLateralMovement: string[];
  impactSummary: string[];
  defensiveVisibilityAndDetectionPoints: string[];
  remediationGuidance: string[];
  mitre: MitreRef[];
  assets: {
    label: string;
    src: string;
  }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ad-internal-segmentation-bypass",
    title: "Internal AD Engagement: Segmentation Weakness → Domain Impact",
    scenario:
      "Assume an internal foothold on a workstation in a segmented enterprise network with standard EDR controls and centralized logging.",
    assumedScope: [
      "Authorized internal network test (time-bound)",
      "Active Directory domain + member servers",
      "No disruption / no data exfiltration",
      "All actions recorded and delivered as a report",
    ],
    initialAccessVectorsConsidered: [
      "Valid credential reuse observed in helpdesk workflows",
      "Misconfigurations in internal web apps",
      "Legacy protocol exposure within a “restricted” VLAN",
      "Trust boundary assumptions between user and server subnets",
    ],
    exploitationPathWithDecisionLogic: [
      "Validated what was reachable from the foothold (service inventory + identity context).",
      "Chose the least noisy path that preserved evidentiary value (minimizing authentication spray and broad scanning).",
      "Prioritized paths with clear rollback / containment and high defensive learnings.",
      "Used incremental privilege increases to reduce blast radius at each step.",
    ],
    privilegeEscalationAndLateralMovement: [
      "Targeted privilege opportunities tied to configuration drift and delegated admin patterns.",
      "Moved laterally only when detections and controls were measured and documented.",
      "Maintained a “defender-first” view: each hop included artifacts to validate visibility.",
    ],
    impactSummary: [
      "Demonstrated how a single internal foothold could cascade into broader identity impact under specific misconfigurations.",
      "Mapped impact to business systems dependent on AD authentication.",
    ],
    defensiveVisibilityAndDetectionPoints: [
      "Identity telemetry: anomalous logon patterns, unusual ticket usage, and new service principals.",
      "Endpoint telemetry: suspicious parent-child processes and credential material access attempts.",
      "Network telemetry: lateral authentication patterns across subnets.",
    ],
    remediationGuidance: [
      "Tighten delegated permissions; remove standing privileges where feasible.",
      "Harden tiering and restrict administrative logons to dedicated systems.",
      "Enforce network allow-lists for management protocols; monitor deviations.",
      "Add detection for identity anomalies tied to admin workflows.",
    ],
    mitre: [
      {
        tactic: "Credential Access",
        technique: "Valid Accounts",
        techniqueId: "T1078",
      },
      {
        tactic: "Lateral Movement",
        technique: "Remote Services",
        techniqueId: "T1021",
      },
      {
        tactic: "Privilege Escalation",
        technique: "Exploitation for Privilege Escalation",
        techniqueId: "T1068",
      },
    ],
    assets: [
      { label: "Redacted screenshot", src: "/media/redacted.svg" },
      { label: "Attack flow diagram", src: "/media/attack-flow.svg" },
    ],
  },
];
