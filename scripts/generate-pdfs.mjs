import fs from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writePdf(filePath, { title, subtitle, bullets }) {
  await ensureDir(path.dirname(filePath));

  const doc = new PDFDocument({
    size: "LETTER",
    margin: 54,
    info: {
      Title: title,
      Author: "Anthony",
    },
  });

  const chunks = [];
  doc.on("data", (c) => chunks.push(c));

  doc.font("Helvetica-Bold").fontSize(20).text(title);
  doc.moveDown(0.25);
  doc.font("Helvetica").fontSize(11).fillColor("#333333").text(subtitle);

  doc.moveDown(1);
  doc.font("Helvetica").fontSize(11).fillColor("#111111");

  for (const bullet of bullets) {
    doc.text(`• ${bullet}`);
  }

  doc.moveDown(1);
  doc.fillColor("#444444").fontSize(9).text(
    "Placeholder PDF generated for the website. Replace with your real documents."
  );

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));
  const out = Buffer.concat(chunks);
  await fs.writeFile(filePath, out);
}

await writePdf("public/resume.pdf", {
  title: "Resume (Placeholder)",
  subtitle: "Offensive Security · Authorized Engagements · Reporting",
  bullets: [
    "Replace this placeholder with your real resume PDF.",
    "Keep contact details consistent with /contact.",
  ],
});

await writePdf("public/reports/sample-red-team-report.pdf", {
  title: "Red Team Report (Sample Placeholder)",
  subtitle: "Executive + technical format with redacted details.",
  bullets: [
    "Replace with a sanitized client deliverable.",
    "Avoid including exploit code or sensitive identifiers.",
  ],
});

console.log("Generated PDFs in public/ (resume + sample report)");
