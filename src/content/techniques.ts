export type TechniqueCategory =
  | "Initial Access"
  | "Credential Access"
  | "Privilege Escalation"
  | "Lateral Movement"
  | "Command and Control"
  | "Defense Evasion";

export type Technique = {
  id: string;
  category: TechniqueCategory;
  name: string;
  mitreTactic?: string;
  mitreId?: string;
  difficulty: "Low" | "Medium" | "High" | "Expert";
  preconditions: string[];
  toolingOptions: string[];
  selectionLogic: string[];
  detectionArtifacts: string[];
  failureCases: string[];
};

export const techniques: Technique[] = [
  // ===== INITIAL ACCESS =====
  {
    id: "ia-1",
    category: "Initial Access",
    name: "Spear Phishing with Payload",
    mitreTactic: "Initial Access",
    mitreId: "T1566.001",
    difficulty: "Medium",
    preconditions: [
      "Explicit authorization for social engineering testing",
      "Pre-approved payload types and delivery mechanisms",
      "Target list validated against scope document",
      "Incident response team notified of exercise window",
    ],
    toolingOptions: [
      "GoPhish for campaign management and tracking",
      "Custom HTML templates with tracking pixels",
      "Macro-enabled documents with AV evasion",
      "HTA/LNK files for initial execution",
    ],
    selectionLogic: [
      "Choose payload complexity based on target security maturity",
      "Prefer lower-risk payloads demonstrating vulnerability",
      "Consider email gateway reputation for sender infrastructure",
    ],
    detectionArtifacts: [
      "Email gateway logs showing suspicious attachments",
      "Endpoint telemetry of macro/script execution",
      "Network connections to newly registered domains",
      "Beacon user-agent strings in proxy logs",
    ],
    failureCases: [
      "Advanced email filtering with sandboxing blocks payload",
      "User security awareness prevents click-through",
      "EDR quarantines payload before execution",
      "Network segmentation prevents callback",
    ],
  },
  {
    id: "ia-2",
    category: "Initial Access",
    name: "External Service Exploitation",
    mitreTactic: "Initial Access",
    mitreId: "T1190",
    difficulty: "High",
    preconditions: [
      "Identified vulnerable external-facing service",
      "Verified service ownership within authorized scope",
      "Exploitation method tested in lab environment first",
    ],
    toolingOptions: [
      "Nuclei for vulnerability validation",
      "Custom exploit development for novel vulnerabilities",
      "Metasploit modules for known CVEs",
      "Manual exploitation for complex chains",
    ],
    selectionLogic: [
      "Prioritize high-impact, low-noise exploitation paths",
      "Validate exploit reliability before production use",
      "Consider defensive visibility when choosing method",
    ],
    detectionArtifacts: [
      "WAF logs showing malformed requests or exploit patterns",
      "Application error logs indicating unexpected input",
      "IDS/IPS alerts for known vulnerability signatures",
      "Unusual process spawning from web service accounts",
    ],
    failureCases: [
      "WAF blocks exploit payload",
      "Service patched or version differs from recon",
      "Exploit causes service instability triggering alerts",
    ],
  },
  {
    id: "ia-3",
    category: "Initial Access",
    name: "Supply Chain Compromise Simulation",
    mitreTactic: "Initial Access",
    mitreId: "T1195",
    difficulty: "Expert",
    preconditions: [
      "Authorization to test vendor/partner access paths",
      "Identified trusted third-party relationships",
      "Coordinated testing window with stakeholders",
    ],
    toolingOptions: [
      "Dependency confusion attacks (controlled packages)",
      "Typosquatting for internal package repositories",
      "Compromised update simulation (mock malicious update)",
    ],
    selectionLogic: [
      "Focus on demonstrating trust relationship risks",
      "Avoid actual supply chain manipulation - simulate outcomes",
      "Document potential blast radius for stakeholder awareness",
    ],
    detectionArtifacts: [
      "Package manager logs showing unexpected sources",
      "Code signing validation failures",
      "Network traffic to unusual update servers",
    ],
    failureCases: [
      "Strong package verification prevents installation",
      "Network segmentation isolates dev environments",
      "Security team monitors package manager activity",
    ],
  },

  // ===== CREDENTIAL ACCESS =====
  {
    id: "ca-1",
    category: "Credential Access",
    name: "LSASS Memory Extraction",
    mitreTactic: "Credential Access",
    mitreId: "T1003.001",
    difficulty: "Medium",
    preconditions: [
      "Local administrator access on target system",
      "Understanding of endpoint protection capabilities",
      "Authorized credential harvesting within scope",
    ],
    toolingOptions: [
      "Mimikatz (with obfuscation for EDR bypass)",
      "ProcDump for LSASS dump creation",
      "Direct syscalls via custom tooling",
      "Comsvcs.dll MiniDump technique",
    ],
    selectionLogic: [
      "Assess EDR presence before selecting extraction method",
      "Prefer living-off-the-land techniques in monitored environments",
      "Consider memory-only extraction to reduce disk artifacts",
    ],
    detectionArtifacts: [
      "Sysmon Event ID 10 (process access to LSASS)",
      "EDR alerts for credential dumping behavior",
      "Suspicious process accessing lsass.exe",
      "Creation of .dmp files in temp directories",
    ],
    failureCases: [
      "Credential Guard enabled protecting secrets",
      "PPL (Protected Process Light) blocks LSASS access",
      "EDR terminates process before extraction completes",
    ],
  },
  {
    id: "ca-2",
    category: "Credential Access",
    name: "Kerberoasting",
    mitreTactic: "Credential Access",
    mitreId: "T1558.003",
    difficulty: "Low",
    preconditions: [
      "Valid domain user account (low privilege sufficient)",
      "Service accounts with SPNs configured in AD",
      "Offline cracking capability for extracted tickets",
    ],
    toolingOptions: [
      "Rubeus for ticket extraction",
      "Impacket GetUserSPNs.py",
      "PowerView for SPN enumeration",
      "Hashcat for offline cracking",
    ],
    selectionLogic: [
      "Target service accounts with weak password policies",
      "Prioritize high-privilege service accounts (SQL, Exchange)",
      "Consider detection risk of mass ticket requests",
    ],
    detectionArtifacts: [
      "Event ID 4769 with RC4 encryption (downgrade)",
      "Unusual volume of TGS requests from single user",
      "Kerberos traffic anomalies in network monitoring",
    ],
    failureCases: [
      "Strong service account passwords resist cracking",
      "AES-only Kerberos configuration blocks RC4",
      "Honey accounts trigger alerts on access",
    ],
  },
  {
    id: "ca-3",
    category: "Credential Access",
    name: "Password Spraying",
    mitreTactic: "Credential Access",
    mitreId: "T1110.003",
    difficulty: "Low",
    preconditions: [
      "Enumerated list of valid usernames",
      "Understanding of account lockout policies",
      "Authorization for authentication testing",
    ],
    toolingOptions: [
      "Spray for multi-protocol spraying",
      "Ruler for Exchange-based attacks",
      "Custom scripts with jitter and throttling",
      "Burp Intruder for web-based auth",
    ],
    selectionLogic: [
      "Stay under lockout threshold with timing controls",
      "Use commonly used passwords aligned with org policy",
      "Target services without MFA first (legacy protocols)",
    ],
    detectionArtifacts: [
      "Multiple failed logins across many accounts",
      "Authentication attempts from unusual source IPs",
      "Event ID 4625 patterns showing spray behavior",
    ],
    failureCases: [
      "Smart lockout policies detect and block spray",
      "MFA required on all authentication endpoints",
      "SIEM correlation identifies distributed attack",
    ],
  },
  {
    id: "ca-4",
    category: "Credential Access",
    name: "NTDS.dit Extraction",
    mitreTactic: "Credential Access",
    mitreId: "T1003.003",
    difficulty: "High",
    preconditions: [
      "Domain Admin or equivalent privileges",
      "Access to Domain Controller",
      "Volume Shadow Copy or ntdsutil access",
    ],
    toolingOptions: [
      "ntdsutil for creating IFM backup",
      "Volume Shadow Copy + copy operations",
      "Secretsdump.py for remote extraction",
      "Mimikatz DCSync for targeted extraction",
    ],
    selectionLogic: [
      "DCSync preferred for targeted credential access",
      "Full NTDS extraction for offline analysis",
      "Consider size and exfiltration requirements",
    ],
    detectionArtifacts: [
      "VSS operations on Domain Controllers",
      "Directory replication service requests (DCSync)",
      "Access to NTDS.dit and SYSTEM registry hive",
    ],
    failureCases: [
      "Protected Users group prevents caching",
      "DCSync detection alerts in place",
      "Network monitoring detects large data transfers",
    ],
  },

  // ===== PRIVILEGE ESCALATION =====
  {
    id: "pe-1",
    category: "Privilege Escalation",
    name: "Unquoted Service Path Exploitation",
    mitreTactic: "Privilege Escalation",
    mitreId: "T1574.009",
    difficulty: "Low",
    preconditions: [
      "Write access to directory in unquoted service path",
      "Service runs as SYSTEM or high-privilege account",
      "Ability to restart service or wait for reboot",
    ],
    toolingOptions: [
      "PowerUp for automated discovery",
      "Manual enumeration via wmic/sc",
      "Custom executable for path hijacking",
    ],
    selectionLogic: [
      "Prioritize services running as SYSTEM",
      "Verify write permissions before attempting",
      "Consider service restart visibility to defenders",
    ],
    detectionArtifacts: [
      "New executable in non-standard paths",
      "Service execution from unexpected binary location",
      "File creation in Program Files subdirectories",
    ],
    failureCases: [
      "Application whitelisting blocks execution",
      "No write access to exploitable path",
      "Service binary validation prevents hijack",
    ],
  },
  {
    id: "pe-2",
    category: "Privilege Escalation",
    name: "Token Impersonation",
    mitreTactic: "Privilege Escalation",
    mitreId: "T1134.001",
    difficulty: "Medium",
    preconditions: [
      "SeImpersonatePrivilege or SeAssignPrimaryTokenPrivilege",
      "Running as service account (IIS, SQL, etc.)",
      "Target tokens available in session",
    ],
    toolingOptions: [
      "PrintSpoofer for newer Windows versions",
      "JuicyPotato for older Windows",
      "RoguePotato for network-based impersonation",
      "GodPotato for latest Windows builds",
    ],
    selectionLogic: [
      "Select potato variant based on Windows version",
      "Consider CLSID requirements and availability",
      "Assess network egress for NTLM relay variants",
    ],
    detectionArtifacts: [
      "Unusual process creation from service accounts",
      "Token manipulation events in security logs",
      "Named pipe creation for impersonation",
    ],
    failureCases: [
      "Privilege removed from service account",
      "Network-level NTLM restrictions",
      "Modern Windows protections block technique",
    ],
  },
  {
    id: "pe-3",
    category: "Privilege Escalation",
    name: "AD Certificate Services Abuse (ESC1-ESC8)",
    mitreTactic: "Privilege Escalation",
    mitreId: "T1649",
    difficulty: "High",
    preconditions: [
      "Active Directory Certificate Services deployed",
      "Misconfigured certificate templates",
      "Enrollment rights for low-privilege user",
    ],
    toolingOptions: [
      "Certify for template enumeration and abuse",
      "Certipy for Python-based attacks",
      "Rubeus for certificate-based authentication",
    ],
    selectionLogic: [
      "Target ESC1-ESC8 misconfigurations based on findings",
      "Prioritize templates allowing arbitrary SANs",
      "Consider certificate validity for persistence",
    ],
    detectionArtifacts: [
      "Certificate enrollment from unusual users",
      "Certificates with unexpected subject alternative names",
      "Authentication using certificates for privileged accounts",
    ],
    failureCases: [
      "Templates properly secured",
      "Certificate-based auth monitoring in place",
      "Manager approval required for sensitive templates",
    ],
  },
  {
    id: "pe-4",
    category: "Privilege Escalation",
    name: "Kernel Exploit",
    mitreTactic: "Privilege Escalation",
    mitreId: "T1068",
    difficulty: "Expert",
    preconditions: [
      "Vulnerable kernel version identified",
      "Exploit reliability verified in lab",
      "Fallback plan if exploit causes instability",
    ],
    toolingOptions: [
      "Watson for Windows vulnerability enumeration",
      "Windows Exploit Suggester",
      "Pre-compiled public exploits (use with caution)",
      "Custom exploit development",
    ],
    selectionLogic: [
      "Verify exact OS build and patch level",
      "Prefer stable exploits over unreliable ones",
      "Consider system criticality before execution",
    ],
    detectionArtifacts: [
      "Unexpected SYSTEM processes from user context",
      "Kernel crash dump creation",
      "EDR behavioral detection of privilege change",
    ],
    failureCases: [
      "System patched against known vulnerabilities",
      "Exploit causes BSOD requiring recovery",
      "EDR blocks known exploit payloads",
    ],
  },

  // ===== LATERAL MOVEMENT =====
  {
    id: "lm-1",
    category: "Lateral Movement",
    name: "Pass-the-Hash",
    mitreTactic: "Lateral Movement",
    mitreId: "T1550.002",
    difficulty: "Medium",
    preconditions: [
      "Captured NTLM hash from credential access",
      "Target system accepts NTLM authentication",
      "Network access to target (SMB/WinRM)",
    ],
    toolingOptions: [
      "Impacket suite (wmiexec, smbexec, psexec)",
      "CrackMapExec for mass validation",
      "Mimikatz sekurlsa::pth",
      "Evil-WinRM for PowerShell remoting",
    ],
    selectionLogic: [
      "Choose execution method based on telemetry impact",
      "wmiexec preferred for reduced artifacts",
      "Consider target logging configuration",
    ],
    detectionArtifacts: [
      "Event ID 4624 Type 3 with NTLM authentication",
      "Unusual admin share access patterns",
      "Lateral movement correlation in SIEM",
    ],
    failureCases: [
      "Credential Guard prevents hash extraction",
      "NTLM disabled, Kerberos-only authentication",
      "Network segmentation blocks SMB access",
    ],
  },
  {
    id: "lm-2",
    category: "Lateral Movement",
    name: "WinRM/PSRemoting Abuse",
    mitreTactic: "Lateral Movement",
    mitreId: "T1021.006",
    difficulty: "Low",
    preconditions: [
      "Valid credentials (password or hash)",
      "WinRM enabled on target (TCP 5985/5986)",
      "User in Remote Management Users or local admin",
    ],
    toolingOptions: [
      "Evil-WinRM for interactive sessions",
      "PowerShell Enter-PSSession",
      "Invoke-Command for script execution",
      "CrackMapExec winrm module",
    ],
    selectionLogic: [
      "Preferred for PowerShell-heavy operations",
      "Consider certificate-based auth for stealth",
      "Assess JEA configurations that may limit access",
    ],
    detectionArtifacts: [
      "Event ID 4624 Type 3 to port 5985/5986",
      "PowerShell ScriptBlock logging",
      "WinRM operational logs",
    ],
    failureCases: [
      "WinRM disabled or firewalled",
      "JEA restricts available commands",
      "PowerShell Constrained Language Mode",
    ],
  },
  {
    id: "lm-3",
    category: "Lateral Movement",
    name: "DCOM Lateral Movement",
    mitreTactic: "Lateral Movement",
    mitreId: "T1021.003",
    difficulty: "Medium",
    preconditions: [
      "Local admin rights on target",
      "DCOM enabled (default on Windows)",
      "Network access to RPC endpoint mapper",
    ],
    toolingOptions: [
      "Impacket dcomexec.py",
      "MMC20.Application DCOM object",
      "ShellWindows/ShellBrowserWindow objects",
    ],
    selectionLogic: [
      "Less commonly monitored than PSExec/WMI",
      "Multiple DCOM objects available for variety",
      "Consider object availability on target OS version",
    ],
    detectionArtifacts: [
      "DCOM server process spawning unusual children",
      "Network connections to high RPC ports",
      "mmc.exe or explorer.exe spawning suspicious processes",
    ],
    failureCases: [
      "DCOM hardening restricts remote activation",
      "Firewall blocks RPC dynamic ports",
      "EDR monitors DCOM lateral movement patterns",
    ],
  },
  {
    id: "lm-4",
    category: "Lateral Movement",
    name: "SSH Key Abuse",
    mitreTactic: "Lateral Movement",
    mitreId: "T1021.004",
    difficulty: "Low",
    preconditions: [
      "Discovered SSH private keys on compromised system",
      "SSH access to target systems",
      "Keys not passphrase-protected or passphrase known",
    ],
    toolingOptions: [
      "Native SSH client with key auth",
      "Paramiko for Python-based SSH",
      "SSH key discovery scripts",
    ],
    selectionLogic: [
      "Check authorized_keys for reusable patterns",
      "Enumerate known_hosts for potential targets",
      "Consider key-based pivoting chains",
    ],
    detectionArtifacts: [
      "SSH authentication logs on target systems",
      "Unusual source IPs for SSH connections",
      "Key fingerprint tracking",
    ],
    failureCases: [
      "Keys require unknown passphrase",
      "Certificate-based SSH auth required",
      "Network segmentation prevents SSH access",
    ],
  },

  // ===== COMMAND AND CONTROL =====
  {
    id: "c2-1",
    category: "Command and Control",
    name: "HTTPS Beaconing",
    mitreTactic: "Command and Control",
    mitreId: "T1071.001",
    difficulty: "Medium",
    preconditions: [
      "Egress allowed to internet on port 443",
      "C2 infrastructure deployed with valid TLS",
      "Domain categorization to avoid filtering",
    ],
    toolingOptions: [
      "Cobalt Strike with malleable profiles",
      "Sliver for open-source alternative",
      "Mythic for multi-agent management",
      "Custom implants for specific requirements",
    ],
    selectionLogic: [
      "Match beacon profile to target normal traffic",
      "Use domain fronting where possible and authorized",
      "Consider certificate pinning detection",
    ],
    detectionArtifacts: [
      "Beaconing patterns in network metadata",
      "JA3/JA3S fingerprints for known C2 frameworks",
      "Unusual SSL certificate characteristics",
      "DNS queries to newly registered domains",
    ],
    failureCases: [
      "SSL inspection reveals C2 traffic",
      "Domain reputation filtering blocks access",
      "Behavioral analysis detects beaconing intervals",
    ],
  },
  {
    id: "c2-2",
    category: "Command and Control",
    name: "DNS Tunneling",
    mitreTactic: "Command and Control",
    mitreId: "T1071.004",
    difficulty: "High",
    preconditions: [
      "DNS egress allowed (direct or via resolver)",
      "Controlled DNS infrastructure",
      "Tolerance for slower data transfer",
    ],
    toolingOptions: [
      "dnscat2 for interactive tunneling",
      "Cobalt Strike DNS beacon",
      "Iodine for IP-over-DNS",
      "Custom DNS-based exfiltration tools",
    ],
    selectionLogic: [
      "Use when HTTPS egress blocked",
      "Accept performance tradeoff for stealth",
      "Consider query volume and detection thresholds",
    ],
    detectionArtifacts: [
      "High volume of DNS TXT/NULL record queries",
      "Unusual subdomain length and entropy",
      "DNS queries to non-standard nameservers",
    ],
    failureCases: [
      "DNS inspection/filtering in place",
      "Query rate limiting blocks high-volume traffic",
      "Machine learning detects tunneling patterns",
    ],
  },
  {
    id: "c2-3",
    category: "Command and Control",
    name: "Cloud Service C2",
    mitreTactic: "Command and Control",
    mitreId: "T1102",
    difficulty: "Medium",
    preconditions: [
      "Access to cloud services (Azure, AWS, GCP)",
      "Implant capability to communicate via cloud APIs",
      "Cloud service not blocked by proxy",
    ],
    toolingOptions: [
      "Azure Functions for serverless C2",
      "S3 bucket polling for commands",
      "Teams/Slack webhook abuse",
      "Cloud storage dead drops",
    ],
    selectionLogic: [
      "Blend with organization existing cloud usage",
      "Consider API rate limits and logging",
      "Use organization trusted cloud providers",
    ],
    detectionArtifacts: [
      "Unusual cloud API call patterns",
      "Large data transfers to cloud storage",
      "Webhook usage from unexpected processes",
    ],
    failureCases: [
      "Cloud service blocked or inspected",
      "API authentication required",
      "Cloud logging reveals C2 activity",
    ],
  },

  // ===== DEFENSE EVASION =====
  {
    id: "de-1",
    category: "Defense Evasion",
    name: "AMSI Bypass",
    mitreTactic: "Defense Evasion",
    mitreId: "T1562.001",
    difficulty: "Medium",
    preconditions: [
      "PowerShell or .NET execution context",
      "Understanding of current AMSI implementation",
      "Bypass not already patched by latest updates",
    ],
    toolingOptions: [
      "Memory patching of amsi.dll",
      "Reflection-based AMSI context corruption",
      "CLR hooking techniques",
      "Hardware breakpoint methods",
    ],
    selectionLogic: [
      "Select bypass based on target patch level",
      "Consider EDR hooks beyond AMSI",
      "Test bypass in lab before production use",
    ],
    detectionArtifacts: [
      "AMSI provider logs showing scan failures",
      "Memory modification of amsi.dll",
      "Unusual .NET assembly loading patterns",
    ],
    failureCases: [
      "EDR monitors AMSI bypass attempts",
      "Kernel-level protection prevents patching",
      "Bypass technique already signatured",
    ],
  },
  {
    id: "de-2",
    category: "Defense Evasion",
    name: "Process Injection",
    mitreTactic: "Defense Evasion",
    mitreId: "T1055",
    difficulty: "High",
    preconditions: [
      "Sufficient privileges for target process",
      "Understanding of target process memory layout",
      "Bypass for any memory protection in place",
    ],
    toolingOptions: [
      "Classic DLL injection via CreateRemoteThread",
      "Process hollowing for full replacement",
      "Module stomping to hide in legitimate modules",
      "Direct syscalls to avoid userland hooks",
    ],
    selectionLogic: [
      "Choose technique based on EDR presence",
      "Consider target process trustworthiness",
      "Module stomping preferred for reduced artifacts",
    ],
    detectionArtifacts: [
      "Cross-process memory operations",
      "Unsigned code execution in signed processes",
      "Unusual thread creation in system processes",
    ],
    failureCases: [
      "CFG (Control Flow Guard) blocks shellcode",
      "EDR monitors cross-process operations",
      "Memory integrity protections prevent modification",
    ],
  },
  {
    id: "de-3",
    category: "Defense Evasion",
    name: "Timestomping",
    mitreTactic: "Defense Evasion",
    mitreId: "T1070.006",
    difficulty: "Low",
    preconditions: [
      "Write access to target files",
      "Goal to reduce forensic timeline accuracy",
    ],
    toolingOptions: [
      "PowerShell Set-ItemProperty for basic timestamps",
      "Metasploit timestomp module",
      "Custom tools for $STANDARD_INFORMATION modification",
    ],
    selectionLogic: [
      "Match timestamps to legitimate system files",
      "Consider both SI and FN timestamps for thoroughness",
      "Understand that MFT analysis may still reveal truth",
    ],
    detectionArtifacts: [
      "Timestamp inconsistencies (SI vs FN)",
      "Files with creation dates before parent directory",
      "USN journal showing recent modifications",
    ],
    failureCases: [
      "NTFS artifacts preserve original timestamps",
      "Forensic analysis of MFT reveals manipulation",
      "EDR logs file operations independently",
    ],
  },
  {
    id: "de-4",
    category: "Defense Evasion",
    name: "Living Off the Land (LOLBins)",
    mitreTactic: "Defense Evasion",
    mitreId: "T1218",
    difficulty: "Low",
    preconditions: [
      "Target system has exploitable signed binaries",
      "Understanding of LOLBin capabilities and limitations",
    ],
    toolingOptions: [
      "Rundll32 for DLL execution",
      "Regsvr32 for scriptlet execution",
      "Mshta for HTA payload delivery",
      "Certutil for download and decode",
      "Wmic for process creation",
    ],
    selectionLogic: [
      "Choose LOLBin based on required capability",
      "Consider which binaries are monitored by EDR",
      "Stack multiple LOLBins for complex operations",
    ],
    detectionArtifacts: [
      "Unusual command-line arguments for signed binaries",
      "Network connections from unexpected processes",
      "Script execution via proxy binaries",
    ],
    failureCases: [
      "Application whitelisting restricts execution",
      "EDR has specific LOLBin detection rules",
      "Command-line logging exposes technique",
    ],
  },
  {
    id: "de-5",
    category: "Defense Evasion",
    name: "Reflective Code Loading",
    mitreTactic: "Defense Evasion",
    mitreId: "T1620",
    difficulty: "High",
    preconditions: [
      "Ability to execute initial loader code",
      "Target environment allows in-memory execution",
      "Payload designed for reflective loading",
    ],
    toolingOptions: [
      "Reflective DLL injection frameworks",
      "BOF (Beacon Object Files) execution",
      ".NET Assembly.Load for managed code",
      "Custom PE loaders for flexibility",
    ],
    selectionLogic: [
      "Preferred when disk writes would trigger alerts",
      "Consider memory scanners in selection",
      "Use position-independent code for reliability",
    ],
    detectionArtifacts: [
      "Memory-only execution without disk artifacts",
      "RWX memory regions in unexpected processes",
      "ETW traces of Assembly.Load operations",
    ],
    failureCases: [
      "Memory scanning detects known payloads",
      "ETW monitoring catches loading events",
      "AMSI integration inspects loaded assemblies",
    ],
  },
  {
    id: "de-6",
    category: "Defense Evasion",
    name: "ETW Patching",
    mitreTactic: "Defense Evasion",
    mitreId: "T1562.006",
    difficulty: "Expert",
    preconditions: [
      "Ability to modify process memory",
      "Understanding of ETW provider architecture",
      "Target processes using ETW for telemetry",
    ],
    toolingOptions: [
      "ETWPatching for provider disabling",
      "Direct memory patching of ntdll",
      "Unhooking frameworks",
    ],
    selectionLogic: [
      "Target specific providers based on evasion goals",
      "Consider kernel-level ETW that cannot be patched",
      "Combine with other evasion for layered approach",
    ],
    detectionArtifacts: [
      "Gaps in expected telemetry streams",
      "Memory modifications to ETW structures",
      "Provider registration anomalies",
    ],
    failureCases: [
      "Kernel-level ETW continues logging",
      "EDR detects ETW tampering attempts",
      "Telemetry gaps themselves are suspicious",
    ],
  },
];

// Category metadata for UI - icons are Lucide icon names
export const categoryInfo: Record<TechniqueCategory, { iconName: string; color: string; description: string }> = {
  "Initial Access": {
    iconName: "DoorOpen",
    color: "#ef4444",
    description: "Techniques for gaining initial foothold in target environments",
  },
  "Credential Access": {
    iconName: "Key",
    color: "#f59e0b",
    description: "Methods for obtaining credentials and authentication materials",
  },
  "Privilege Escalation": {
    iconName: "TrendingUp",
    color: "#8b5cf6",
    description: "Techniques for gaining higher-level permissions on systems",
  },
  "Lateral Movement": {
    iconName: "ArrowLeftRight",
    color: "#3b82f6",
    description: "Methods for moving through the network to access additional systems",
  },
  "Command and Control": {
    iconName: "Radio",
    color: "#06b6d4",
    description: "Techniques for maintaining communication with compromised systems",
  },
  "Defense Evasion": {
    iconName: "EyeOff",
    color: "#10b981",
    description: "Methods for avoiding detection by security controls",
  },
};
