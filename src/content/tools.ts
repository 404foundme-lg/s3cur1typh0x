export type ToolCategory = "Reconnaissance" | "Exploitation" | "Post-Exploitation" | "Evasion" | "Reporting" | "Infrastructure";

export type ToolItem = {
  slug: string;
  name: string;
  type: "Custom Tool" | "Framework Extension" | "Script Collection" | "PoC" | "Library";
  category: ToolCategory;
  problemStatement: string;
  architectureAndLogic: string[];
  screenshotsOrExamples: string[];
  techStack: string[];
  githubUrl?: string;
  safetyNote: string;
  status: "Active" | "Maintained" | "Archived" | "In Development";
  stars?: number;
  lastUpdated?: string;
};

export const toolCategories: Record<ToolCategory, { description: string; iconName: string }> = {
  "Reconnaissance": {
    description: "Intelligence gathering and target enumeration",
    iconName: "Search",
  },
  "Exploitation": {
    description: "Vulnerability validation and initial access",
    iconName: "Zap",
  },
  "Post-Exploitation": {
    description: "Persistence, lateral movement, and data collection",
    iconName: "Network",
  },
  "Evasion": {
    description: "Detection bypass and operational security",
    iconName: "EyeOff",
  },
  "Reporting": {
    description: "Evidence collection and deliverable generation",
    iconName: "FileText",
  },
  "Infrastructure": {
    description: "C2, redirectors, and engagement setup",
    iconName: "Server",
  },
};

export const tools: ToolItem[] = [
  // Reconnaissance Tools
  {
    slug: "subdomain-reaper",
    name: "Subdomain Reaper",
    type: "Custom Tool",
    category: "Reconnaissance",
    problemStatement:
      "Aggregate subdomain enumeration from multiple sources with intelligent deduplication and validation, reducing manual effort during external reconnaissance.",
    architectureAndLogic: [
      "Parallel queries to Certificate Transparency logs, DNS brute-force, and passive sources.",
      "Automatic resolution and HTTP fingerprinting of discovered hosts.",
      "JSON/CSV export with severity scoring based on exposed services.",
      "Rate limiting and source rotation to avoid detection.",
    ],
    techStack: ["Go", "PostgreSQL", "Docker"],
    screenshotsOrExamples: [
      "$ reaper -d target.com -o json --resolve --fingerprint",
      "Output: 847 unique subdomains, 234 live hosts, 12 high-interest targets",
    ],
    githubUrl: "https://github.com/your-handle/subdomain-reaper",
    safetyNote: "Passive reconnaissance only. Active scanning requires explicit authorization.",
    status: "Active",
    stars: 342,
    lastUpdated: "2024-12",
  },
  {
    slug: "cloud-enum-toolkit",
    name: "Cloud Enum Toolkit",
    type: "Script Collection",
    category: "Reconnaissance",
    problemStatement:
      "Streamline cloud asset discovery across AWS, Azure, and GCP with unified output formats.",
    architectureAndLogic: [
      "Multi-cloud credential validation and enumeration.",
      "S3/Blob/GCS bucket discovery and permission testing.",
      "Serverless function enumeration and metadata extraction.",
      "IAM policy analysis for privilege escalation paths.",
    ],
    techStack: ["Python", "boto3", "azure-sdk", "gcloud"],
    screenshotsOrExamples: [
      "$ cloud-enum --provider aws --profile target --modules all",
      "Discovered: 23 S3 buckets, 5 publicly accessible, 2 with write permissions",
    ],
    githubUrl: "https://github.com/your-handle/cloud-enum-toolkit",
    safetyNote: "Requires valid credentials or authorized access. No exploitation capabilities.",
    status: "Maintained",
    stars: 189,
    lastUpdated: "2024-11",
  },

  // Exploitation Tools
  {
    slug: "payload-forge",
    name: "Payload Forge",
    type: "Custom Tool",
    category: "Exploitation",
    problemStatement:
      "Generate context-aware payloads with built-in evasion techniques, reducing time spent on manual payload crafting.",
    architectureAndLogic: [
      "Template-based payload generation with variable substitution.",
      "Automatic encoding chain selection based on target context.",
      "Integration with common C2 frameworks (Cobalt Strike, Sliver, Mythic).",
      "Payload testing sandbox with AV detection simulation.",
    ],
    techStack: ["Python", "Nim", "C#", "PowerShell"],
    screenshotsOrExamples: [
      "$ forge --template shellcode-runner --format exe --evasion amsi,etw --c2 sliver",
      "Generated: runner.exe (staged, AMSI bypass, ETW patching, Sliver beacon)",
    ],
    safetyNote: "Source code only. No pre-compiled binaries. For authorized testing only.",
    status: "Active",
    lastUpdated: "2024-12",
  },
  {
    slug: "web-exploit-framework",
    name: "WEF - Web Exploit Framework",
    type: "Framework Extension",
    category: "Exploitation",
    problemStatement:
      "Extend Burp Suite with advanced exploitation modules for complex web application vulnerabilities.",
    architectureAndLogic: [
      "Automated SSRF chain detection and exploitation.",
      "Deserialization payload generation for Java, .NET, PHP.",
      "GraphQL introspection and injection testing.",
      "JWT manipulation and algorithm confusion attacks.",
    ],
    techStack: ["Java", "Kotlin", "Burp Extender API"],
    screenshotsOrExamples: [
      "Right-click → Extensions → WEF → Generate Deserialization Payload",
      "Automatic gadget chain detection based on fingerprinted libraries",
    ],
    githubUrl: "https://github.com/your-handle/wef-burp",
    safetyNote: "Framework extension only. Requires licensed Burp Suite Professional.",
    status: "Active",
    stars: 567,
    lastUpdated: "2024-12",
  },

  // Post-Exploitation Tools
  {
    slug: "operator-evidence-notebook",
    name: "Operator Evidence Notebook",
    type: "Custom Tool",
    category: "Reporting",
    problemStatement:
      "Improve repeatable evidence capture and reporting consistency across engagements without increasing operational noise.",
    architectureAndLogic: [
      "Structured data model for findings, artifacts, and timelines.",
      "Local-first storage with export to report-ready formats.",
      "Designed to keep redaction workflows explicit.",
      "MITRE ATT&CK mapping for each captured artifact.",
    ],
    techStack: ["TypeScript", "SQLite", "Electron"],
    screenshotsOrExamples: [
      "Usage example: generate a finding bundle with redacted screenshots.",
      "Output: consistent sections aligned to executive + defender audiences.",
    ],
    githubUrl: "https://github.com/your-handle/operator-notebook",
    safetyNote:
      "No live weaponized binaries are hosted. Only documentation, safe code patterns, and non-abusive examples.",
    status: "Active",
    stars: 423,
    lastUpdated: "2024-12",
  },
  {
    slug: "ad-pathfinder",
    name: "AD Pathfinder",
    type: "Custom Tool",
    category: "Post-Exploitation",
    problemStatement:
      "Visualize and automate Active Directory attack path discovery beyond BloodHound's default queries.",
    architectureAndLogic: [
      "Custom Cypher query library for complex privilege escalation paths.",
      "Automated path pruning based on operational constraints.",
      "Integration with Cobalt Strike and Sliver for live path validation.",
      "Export attack narratives for reporting.",
    ],
    techStack: ["Python", "Neo4j", "Cypher", "React"],
    screenshotsOrExamples: [
      "$ pathfinder --neo4j localhost:7687 --target 'Domain Admins' --constraints stealth",
      "Found: 3 viable paths, shortest: 4 hops via Kerberoasting + RBCD",
    ],
    githubUrl: "https://github.com/your-handle/ad-pathfinder",
    safetyNote: "Requires existing BloodHound data collection. Analysis tool only.",
    status: "Active",
    stars: 892,
    lastUpdated: "2024-12",
  },
  {
    slug: "cred-harvest-suite",
    name: "Credential Harvest Suite",
    type: "Script Collection",
    category: "Post-Exploitation",
    problemStatement:
      "Consolidate credential extraction techniques with operational security considerations.",
    architectureAndLogic: [
      "Memory-safe LSASS dumping with multiple fallback techniques.",
      "Targeted credential extraction to minimize forensic footprint.",
      "Automatic credential correlation and password spraying prep.",
      "Hash extraction without touching disk where possible.",
    ],
    techStack: ["C#", "PowerShell", "BOF"],
    screenshotsOrExamples: [
      "beacon> cred-harvest --method comsvcs --target lsass --output encrypted",
      "Extracted: 47 NTLM hashes, 12 Kerberos tickets, 3 cleartext passwords",
    ],
    safetyNote: "For authorized red team engagements only. Follows rules of engagement.",
    status: "Maintained",
    lastUpdated: "2024-11",
  },

  // Evasion Tools
  {
    slug: "signature-morpher",
    name: "Signature Morpher",
    type: "Library",
    category: "Evasion",
    problemStatement:
      "Automate binary modification to evade static signature detection while maintaining payload functionality.",
    architectureAndLogic: [
      "PE/ELF section manipulation and entropy normalization.",
      "String obfuscation with reversible encoding.",
      "Import table reconstruction and API hashing.",
      "Metadata spoofing to match legitimate software.",
    ],
    techStack: ["Rust", "LLVM", "PE/COFF"],
    screenshotsOrExamples: [
      "$ morpher --input implant.exe --techniques all --verify",
      "Applied: 12 transformations, 0/67 VT detections (was 23/67)",
    ],
    safetyNote: "Research tool for understanding detection mechanisms. Document all modifications.",
    status: "In Development",
    lastUpdated: "2024-12",
  },
  {
    slug: "etw-silencer",
    name: "ETW Silencer",
    type: "PoC",
    category: "Evasion",
    problemStatement:
      "Research and demonstrate Event Tracing for Windows bypass techniques for security research.",
    architectureAndLogic: [
      "Multiple ETW provider patching techniques.",
      "Selective event suppression vs. full provider disable.",
      "Userland and kernel-mode bypass options.",
      "Detection research: what artifacts remain after patching.",
    ],
    techStack: ["C", "Windows Internals", "ETW"],
    screenshotsOrExamples: [
      "Demonstrates: NtTraceControl hook, provider registration hijack",
      "Research output: detection opportunities for defenders",
    ],
    safetyNote: "Proof-of-concept for research. Includes detection guidance for blue teams.",
    status: "Archived",
    lastUpdated: "2024-08",
  },

  // Infrastructure Tools
  {
    slug: "c2-terraform-kit",
    name: "C2 Terraform Kit",
    type: "Script Collection",
    category: "Infrastructure",
    problemStatement:
      "Rapidly deploy and tear down C2 infrastructure with consistent configurations and operational security.",
    architectureAndLogic: [
      "Multi-cloud Terraform modules for redirector deployment.",
      "Automatic SSL certificate provisioning and rotation.",
      "Domain fronting configuration for supported CDNs.",
      "Infrastructure-as-code for reproducible engagements.",
    ],
    techStack: ["Terraform", "Ansible", "Bash", "Cloud APIs"],
    screenshotsOrExamples: [
      "$ terraform apply -var='c2_type=sliver' -var='redirectors=3'",
      "Deployed: 3 HTTPS redirectors, 1 DNS redirector, auto-SSL configured",
    ],
    githubUrl: "https://github.com/your-handle/c2-terraform",
    safetyNote: "Infrastructure templates only. Requires your own cloud accounts and C2 software.",
    status: "Active",
    stars: 234,
    lastUpdated: "2024-12",
  },
  {
    slug: "phishing-gopher",
    name: "Phishing Gopher",
    type: "Custom Tool",
    category: "Infrastructure",
    problemStatement:
      "Manage phishing infrastructure with built-in operational security and campaign tracking.",
    architectureAndLogic: [
      "GoPhish enhancement with additional evasion features.",
      "Automatic sender reputation warming.",
      "Real-time campaign analytics with click tracking.",
      "Integration with common pretexting frameworks.",
    ],
    techStack: ["Go", "PostgreSQL", "Redis", "React"],
    screenshotsOrExamples: [
      "Campaign: IT-Security-Update | Sent: 150 | Opened: 89 | Clicked: 34 | Creds: 12",
      "Automatic IP rotation and header randomization",
    ],
    safetyNote: "For authorized social engineering assessments only. Follows engagement ROE.",
    status: "Maintained",
    stars: 156,
    lastUpdated: "2024-10",
  },

  // Reporting Tools
  {
    slug: "burp-extension-triage",
    name: "Burp Extension: Triage Helpers",
    type: "Framework Extension",
    category: "Reporting",
    problemStatement:
      "Reduce analyst time spent on repetitive triage tasks while keeping findings reproducible.",
    architectureAndLogic: [
      "Custom panels to annotate requests/responses with analyst context.",
      "Export helpers to attach evidence to reports.",
      "Automatic severity scoring based on vulnerability context.",
      "One-click reproduction packet generation.",
    ],
    techStack: ["Java", "Burp Extender API"],
    screenshotsOrExamples: [
      "Example: tag auth flows and export a minimal reproduction packet.",
      "Integrates with Operator Evidence Notebook for seamless workflow.",
    ],
    githubUrl: "https://github.com/your-handle/burp-triage",
    safetyNote:
      "Avoids automation that would materially increase exploitation capability; focuses on workflow efficiency and evidence quality.",
    status: "Active",
    stars: 278,
    lastUpdated: "2024-11",
  },
  {
    slug: "report-generator-pro",
    name: "Report Generator Pro",
    type: "Custom Tool",
    category: "Reporting",
    problemStatement:
      "Transform raw engagement data into polished executive and technical reports with minimal manual formatting.",
    architectureAndLogic: [
      "Template engine with customizable branding and sections.",
      "Automatic CVSS scoring and risk prioritization.",
      "MITRE ATT&CK mapping visualization.",
      "Multi-format export: PDF, DOCX, HTML, Markdown.",
    ],
    techStack: ["Python", "Jinja2", "WeasyPrint", "React"],
    screenshotsOrExamples: [
      "$ report-gen --input findings.json --template executive --brand client",
      "Generated: Executive_Report_ClientName_2024-12.pdf (23 pages)",
    ],
    githubUrl: "https://github.com/your-handle/report-generator",
    safetyNote: "Reporting tool only. No offensive capabilities.",
    status: "Active",
    stars: 445,
    lastUpdated: "2024-12",
  },
];

// Stats for the tools page
export const toolStats = {
  totalTools: tools.length,
  activeTools: tools.filter(t => t.status === "Active").length,
  totalStars: tools.reduce((acc, t) => acc + (t.stars || 0), 0),
  categories: Object.keys(toolCategories).length,
};
