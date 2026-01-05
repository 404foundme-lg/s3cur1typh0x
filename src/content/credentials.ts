export type CredentialItem = {
  name: string;
  date?: string;
  note?: string;
};

export const certifications: CredentialItem[] = [
  { name: "(Add cert) OSCP", date: "YYYY-MM" },
  { name: "(Add cert) CRTO", date: "YYYY-MM" },
];

export const training: CredentialItem[] = [
  { name: "(Add training) Advanced AD tradecraft", date: "YYYY-MM" },
];

export const talks: CredentialItem[] = [
  { name: "(Optional) Meetup talk title", date: "YYYY" },
];

export const disclosures: CredentialItem[] = [
  { name: "(Optional) Responsible disclosure summary", date: "YYYY" },
];
