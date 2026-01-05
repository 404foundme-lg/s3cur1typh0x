"use client";

import { useState, useEffect } from "react";
import { Skull, Shield, Monitor, Server, Castle, AlertTriangle } from "lucide-react";

interface NetworkNode {
  id: string;
  type: "workstation" | "server" | "dc" | "firewall" | "attacker";
  compromised?: boolean;
}

const networkTopology: NetworkNode[] = [
  { id: "ATTACKER", type: "attacker", compromised: true },
  { id: "FW-01", type: "firewall" },
  { id: "WS-001", type: "workstation" },
  { id: "WS-002", type: "workstation" },
  { id: "SRV-APP", type: "server" },
  { id: "SRV-DB", type: "server" },
  { id: "DC-01", type: "dc" },
];

export function NetworkMap() {
  const [scanPhase, setScanPhase] = useState(0);
  const [discoveredNodes, setDiscoveredNodes] = useState<string[]>([]);
  const [compromisedNodes, setCompromisedNodes] = useState<string[]>(["ATTACKER"]);
  const [showCursor, setShowCursor] = useState(true);
  const [logs, setLogs] = useState<{ text: string; type: string }[]>([]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Network scan animation
  useEffect(() => {
    const sequence = [
      { delay: 500, action: () => {
        setScanPhase(1);
        setLogs((prev) => [...prev, { text: "[*] Starting network reconnaissance...", type: "info" }]);
      }},
      { delay: 1200, action: () => {
        setLogs((prev) => [...prev, { text: "[*] Running: nmap -sV -sC 10.10.10.0/24", type: "muted" }]);
      }},
      { delay: 2000, action: () => {
        setDiscoveredNodes(["FW-01"]);
        setLogs((prev) => [...prev, { text: "[+] Host discovered: FW-01 (10.10.10.1) - Firewall", type: "success" }]);
      }},
      { delay: 2600, action: () => {
        setDiscoveredNodes((prev) => [...prev, "WS-001", "WS-002"]);
        setLogs((prev) => [...prev, { text: "[+] Hosts discovered: WS-001, WS-002 - Workstations", type: "success" }]);
      }},
      { delay: 3200, action: () => {
        setDiscoveredNodes((prev) => [...prev, "SRV-APP"]);
        setLogs((prev) => [...prev, { text: "[+] Host discovered: SRV-APP (10.10.10.20) - Application Server", type: "success" }]);
      }},
      { delay: 3800, action: () => {
        setDiscoveredNodes((prev) => [...prev, "SRV-DB"]);
        setLogs((prev) => [...prev, { text: "[+] Host discovered: SRV-DB (10.10.10.21) - Database Server", type: "success" }]);
      }},
      { delay: 4400, action: () => {
        setDiscoveredNodes((prev) => [...prev, "DC-01"]);
        setLogs((prev) => [...prev, { text: "[+] Host discovered: DC-01 (10.10.10.10) - Domain Controller", type: "success" }]);
      }},
      { delay: 5000, action: () => {
        setScanPhase(2);
        setLogs((prev) => [...prev, { text: "[*] Scan complete. Initiating exploitation phase...", type: "info" }]);
      }},
      { delay: 5800, action: () => {
        setCompromisedNodes((prev) => [...prev, "WS-001"]);
        setLogs((prev) => [...prev, { text: "[!] WS-001 compromised via phishing payload", type: "warning" }]);
      }},
      { delay: 6600, action: () => {
        setCompromisedNodes((prev) => [...prev, "SRV-APP"]);
        setLogs((prev) => [...prev, { text: "[!] SRV-APP compromised via lateral movement", type: "warning" }]);
      }},
      { delay: 7400, action: () => {
        setCompromisedNodes((prev) => [...prev, "DC-01"]);
        setLogs((prev) => [...prev, { text: "[!] DC-01 compromised - Domain Admin achieved!", type: "danger" }]);
      }},
      { delay: 8200, action: () => {
        setScanPhase(3);
        setLogs((prev) => [...prev, { text: "[+] Full domain compromise achieved", type: "success" }]);
      }},
    ];

    const timers = sequence.map((item) => 
      setTimeout(item.action, item.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const getNodeStyle = (node: NetworkNode) => {
    const isDiscovered = discoveredNodes.includes(node.id) || node.type === "attacker";
    const isCompromised = compromisedNodes.includes(node.id);

    if (!isDiscovered) return "bg-muted/30 text-mutedForeground/30 border-muted/20";
    if (isCompromised) return "bg-danger/20 text-danger border-danger/50 animate-pulse";
    return "bg-muted text-foreground border-border";
  };

  const getNodeIcon = (type: NetworkNode["type"]) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "attacker": return <Skull className={iconClass} />;
      case "firewall": return <Shield className={iconClass} />;
      case "workstation": return <Monitor className={iconClass} />;
      case "server": return <Server className={iconClass} />;
      case "dc": return <Castle className={iconClass} />;
    }
  };

  const getLogStyle = (type: string) => {
    switch (type) {
      case "info": return "text-info";
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "danger": return "text-danger font-bold";
      case "muted": return "text-mutedForeground";
      default: return "text-foreground";
    }
  };

  return (
    <div className="surface overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">network-recon.sh</span>
        {scanPhase === 3 && (
          <span className="ml-auto flex items-center gap-1 text-xs font-mono text-danger animate-pulse">
            <AlertTriangle className="w-3 h-3" /> DOMAIN COMPROMISED
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Network visualization */}
        <div className="p-4">
          <p className="text-xs text-mutedForeground font-mono mb-3">// Network Topology</p>
          <div className="grid grid-cols-3 gap-2">
            {networkTopology.map((node) => (
              <div
                key={node.id}
                className={`p-2 rounded border text-center text-xs font-mono transition-all duration-300 ${getNodeStyle(node)}`}
              >
                <div className="flex justify-center">{getNodeIcon(node.type)}</div>
                <p className="mt-1 truncate">{node.id}</p>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-mutedForeground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-muted" /> Discovered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" /> Compromised
            </span>
          </div>
        </div>

        {/* Log output */}
        <div className="p-4 font-mono text-xs max-h-[300px] overflow-y-auto">
          <p className="text-mutedForeground mb-2">
            <span className="text-accent">$</span> ./recon-and-exploit.sh --target internal
          </p>
          {logs.map((log, i) => (
            <p key={i} className={`animate-fade-in ${getLogStyle(log.type)}`}>
              {log.text}
            </p>
          ))}
          {scanPhase < 3 && (
            <p className="mt-2">
              <span className="text-accent">$</span>{" "}
              <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
