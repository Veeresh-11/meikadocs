import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Mail, ArrowRight, Clock, ChevronRight,
  Shield, AlertTriangle, BookOpen, Cpu, Lock, Globe,
  TrendingUp, CheckCircle2, Send, ArrowLeft, Calendar, User, Tag
} from 'lucide-react';
import { Footer } from '../components/Footer';

interface BlogPageProps {
  setCurrentPage: (page: string) => void;
}

// ─── Content block types ───────────────────────────────────────────────────
type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; title?: string; items: string[] }
  | { type: 'callout'; emoji?: string; title: string; items: string[] }
  | { type: 'cta'; text: string };

interface ArticleContent {
  intro: string;
  blocks: Block[];
}

// ─── Categories ────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Threat Intelligence', 'Identity Security', 'Compliance', 'Product Guides', 'Zero Trust', 'Security Research'];

// ─── Featured article ──────────────────────────────────────────────────────
const FEATURED = {
  id: 'featured',
  category: 'Threat Intelligence',
  date: 'June 14, 2026',
  readTime: '7 min read',
  title: 'Why SaaS Credentials Have Become the New Enterprise Attack Surface',
  excerpt:
    'Organizations are moving sensitive data into cloud platforms faster than ever. This shift has made identity and access management a primary target for attackers. Learn the most common attack techniques and how security teams can reduce exposure.',
  author: 'Veeresh Babu',
  authorRole: 'CEO & Co-Founder',
  gradient: 'from-cyan-900/60 via-[#0d1117]/80 to-[#0d1117]',
  accentColor: 'text-cyan-400',
  borderColor: 'border-cyan-500/30',
  tagBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

// ─── Post cards ────────────────────────────────────────────────────────────
interface Post {
  id: number;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  icon: React.ElementType;
  accentColor: string;
  tagBg: string;
  gradient: string;
  author: string;
  authorRole: string;
}

const POSTS: Post[] = [
  {
    id: 1,
    category: 'Compliance',
    date: 'June 8, 2026',
    readTime: '5 min read',
    title: 'GDPR Compliance Checklist for SaaS Companies',
    excerpt: 'A practical guide to preparing your organization for modern data protection requirements and audits.',
    icon: Shield,
    accentColor: 'text-yellow-400',
    tagBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    gradient: 'from-yellow-900/20 to-transparent',
    author: 'Meika Research Team',
    authorRole: 'Security & Compliance',
  },
  {
    id: 2,
    category: 'Zero Trust',
    date: 'June 4, 2026',
    readTime: '6 min read',
    title: 'Zero Trust Security Explained for Growing Organizations',
    excerpt: 'Understand the principles behind zero trust architecture and how to implement them without disrupting operations.',
    icon: Lock,
    accentColor: 'text-green-400',
    tagBg: 'bg-green-500/10 text-green-400 border-green-500/20',
    gradient: 'from-green-900/20 to-transparent',
    author: 'Meika Research Team',
    authorRole: 'Identity Security',
  },
  {
    id: 3,
    category: 'Product Guides',
    date: 'May 30, 2026',
    readTime: '4 min read',
    title: 'Setting Up Passwordless Authentication with Meika',
    excerpt: 'A step-by-step guide to deploying passwordless authentication across your organization.',
    icon: Cpu,
    accentColor: 'text-blue-400',
    tagBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gradient: 'from-blue-900/20 to-transparent',
    author: 'Veeresh Babu',
    authorRole: 'CEO & Co-Founder',
  },
  {
    id: 4,
    category: 'Security Research',
    date: 'May 24, 2026',
    readTime: '7 min read',
    title: 'How Credential Stuffing Attacks Work and How to Prevent Them',
    excerpt: 'Learn how attackers automate credential abuse and what defensive controls provide the strongest protection.',
    icon: AlertTriangle,
    accentColor: 'text-red-400',
    tagBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    gradient: 'from-red-900/20 to-transparent',
    author: 'Meika Research Team',
    authorRole: 'Threat Intelligence',
  },
  {
    id: 5,
    category: 'Threat Intelligence',
    date: 'May 18, 2026',
    readTime: '6 min read',
    title: 'AI-Powered Phishing Campaigns: What Security Teams Need to Know',
    excerpt: 'Generative AI is changing phishing tactics. Discover emerging threats and effective detection strategies.',
    icon: Globe,
    accentColor: 'text-cyan-400',
    tagBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    gradient: 'from-cyan-900/20 to-transparent',
    author: 'Meika Research Team',
    authorRole: 'Threat Intelligence',
  },
  {
    id: 6,
    category: 'Compliance',
    date: 'May 12, 2026',
    readTime: '5 min read',
    title: 'SOC 2 Preparation Guide for Fast-Growing Startups',
    excerpt: 'A founder-focused roadmap to achieving compliance while maintaining product velocity.',
    icon: BookOpen,
    accentColor: 'text-yellow-400',
    tagBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    gradient: 'from-yellow-900/20 to-transparent',
    author: 'Veeresh Babu',
    authorRole: 'CEO & Co-Founder',
  },
  {
    id: 7,
    category: 'Zero Trust',
    date: 'May 6, 2026',
    readTime: '6 min read',
    title: 'Network Segmentation Best Practices in a Zero Trust Environment',
    excerpt: 'Reduce lateral movement risk with a modern segmentation strategy built for cloud-first organizations.',
    icon: TrendingUp,
    accentColor: 'text-green-400',
    tagBg: 'bg-green-500/10 text-green-400 border-green-500/20',
    gradient: 'from-green-900/20 to-transparent',
    author: 'Meika Research Team',
    authorRole: 'Identity Security',
  },
  {
    id: 8,
    category: 'Product Guides',
    date: 'April 28, 2026',
    readTime: '4 min read',
    title: 'Managing Secure Document Access with Meika Vaults',
    excerpt: 'Learn how to implement granular permissions and secure collaboration workflows.',
    icon: Lock,
    accentColor: 'text-blue-400',
    tagBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gradient: 'from-blue-900/20 to-transparent',
    author: 'Veeresh Babu',
    authorRole: 'CEO & Co-Founder',
  },
  {
    id: 9,
    category: 'Threat Intelligence',
    date: 'June 16, 2026',
    readTime: '4 min read',
    title: 'Anatomy of a Ransomware Attack: How Hackers Infiltrate Enterprise Networks',
    excerpt: 'Ransomware is no longer just a malware problem. Learn the step-by-step attack lifecycle and the controls that stop it.',
    icon: AlertTriangle,
    accentColor: 'text-red-400',
    tagBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    gradient: 'from-red-900/20 to-transparent',
    author: 'Veeresh Babu',
    authorRole: 'CEO & Co-Founder',
  },
];

// ─── Full article content ──────────────────────────────────────────────────
const CONTENT: Record<string, ArticleContent> = {
  featured: {
    intro: "The security perimeter has dissolved. Sensitive data that once sat behind a corporate firewall now lives in Salesforce, Google Workspace, Microsoft 365, Slack, and dozens of other SaaS platforms. Attackers have adapted faster than most security programs. Identity has become the new perimeter — and credentials are the new keys to your kingdom.",
    blocks: [
      { type: 'heading', text: 'Why Identity Became the Primary Attack Vector' },
      { type: 'paragraph', text: 'Traditional network-based attacks required significant technical skill. Exploiting a firewall misconfiguration or crafting a zero-day exploit takes time and expertise. Stealing or buying a valid set of employee credentials is vastly simpler.' },
      { type: 'paragraph', text: 'Once an attacker has legitimate credentials to your SaaS platforms, they are authenticated — they look identical to your own employees. Standard perimeter security tools generate no alerts. Antivirus software sees no malware. The attacker can operate for days or weeks without detection.' },
      { type: 'heading', text: 'The Three Most Common SaaS Credential Attack Techniques' },
      { type: 'subheading', text: '1. Phishing and Spear Phishing' },
      { type: 'paragraph', text: 'Phishing remains the dominant initial access method. Modern phishing pages are near-perfect replicas of Microsoft, Google, and Okta login pages. Spear phishing takes this further — attackers research specific employees on LinkedIn, craft personalized emails, and dramatically increase success rates.' },
      { type: 'subheading', text: '2. MFA Bypass and Prompt Bombing' },
      { type: 'paragraph', text: 'Many organizations have deployed MFA but not all MFA is equal. Attackers use MFA prompt bombing (sending repeated push notifications until a fatigued user approves) and adversary-in-the-middle (AiTM) proxies that capture session tokens in real time, bypassing authentication entirely.' },
      { type: 'subheading', text: '3. Credential Stuffing from Data Breaches' },
      { type: 'paragraph', text: 'Billions of username and password combinations from historical breaches are available on underground forums. Automated tools test these at scale against SaaS login portals. Employees who reuse passwords across personal and work accounts are especially vulnerable.' },
      { type: 'heading', text: 'What Happens After Access Is Gained' },
      { type: 'paragraph', text: 'Initial access is rarely the end goal. Once inside, attackers pivot. They enumerate what data is accessible, identify accounts with elevated privileges, establish persistence through OAuth app grants or rogue forwarding rules, and exfiltrate data methodically before triggering any further action.' },
      { type: 'callout', emoji: '🛡️', title: 'Practical Controls That Reduce SaaS Credential Risk', items: [
        'Deploy phishing-resistant MFA such as passkeys or hardware security keys — eliminate SMS and push-based MFA wherever possible',
        'Enforce conditional access policies that restrict logins from unmanaged devices and untrusted locations',
        'Audit OAuth application grants regularly — remove any third-party app with permissions your team did not explicitly authorize',
        'Enable identity threat detection tools that flag anomalous login behavior such as impossible travel or unusual access patterns',
        'Implement a privileged access workstation policy for accounts with administrative access to sensitive SaaS platforms',
      ]},
      { type: 'heading', text: 'The Shift to Passwordless as a Long-Term Solution' },
      { type: 'paragraph', text: 'The most durable defense against credential-based attacks is eliminating passwords entirely. Passkeys and hardware security keys make phishing attacks technically impossible — there is no password to steal. Meika Authenticator is built around this principle, providing passwordless authentication that meets enterprise compliance requirements without compromising user experience.' },
      { type: 'cta', text: 'Learn how Meika Authenticator eliminates credential-based risk with passwordless identity.' },
    ],
  },

  '1': {
    intro: "GDPR is now several years old, but enforcement has steadily intensified. For SaaS companies, the regulation covers any personal data belonging to EU residents — regardless of where your company is based. This checklist covers the foundational requirements every SaaS organization must address.",
    blocks: [
      { type: 'heading', text: 'Step 1: Build a Complete Data Inventory' },
      { type: 'paragraph', text: 'You cannot protect data you do not know you have. Before anything else, map every data flow in your organization: what personal data you collect, where it is stored, who can access it, and how long you retain it. Include your third-party vendors — if a processor handles EU personal data on your behalf, you are responsible for their compliance.' },
      { type: 'heading', text: 'Step 2: Establish a Lawful Basis for Processing' },
      { type: 'paragraph', text: 'For every category of personal data you process, you must have a documented lawful basis. The most common for SaaS companies are contractual necessity (processing is required to deliver the service) and legitimate interest. Consent is often the wrong choice for B2B SaaS — it is harder to maintain and can be withdrawn at any time.' },
      { type: 'heading', text: 'Step 3: Implement Your Breach Notification Process' },
      { type: 'paragraph', text: 'GDPR requires notification to the relevant supervisory authority within 72 hours of discovering a personal data breach. That timeline is extremely tight. You need an incident response plan documented and tested before a breach occurs, not after.' },
      { type: 'callout', emoji: '✅', title: 'Core GDPR Compliance Checklist', items: [
        'Maintain a Record of Processing Activities (RoPA) covering all data flows',
        'Appoint a Data Protection Officer if required for your processing activities',
        'Publish a clear, jargon-free Privacy Policy that explains your processing in plain language',
        'Implement mechanisms for data subject rights: access, rectification, erasure, and portability',
        'Review all vendor contracts for Data Processing Agreements (DPAs)',
        'Document your lawful basis for each category of personal data processing',
        'Test your 72-hour breach notification process at least annually',
        'Ensure data minimization — collect only what you genuinely need',
      ]},
      { type: 'heading', text: 'Step 4: Manage Data Subject Rights' },
      { type: 'paragraph', text: 'Individuals have the right to access their data, correct inaccuracies, request deletion, and export their information in a portable format. You need operational processes to handle these requests within the 30-day statutory window. For SaaS companies, this often requires coordination between your customer success, engineering, and legal teams.' },
      { type: 'cta', text: 'Meika helps SaaS teams maintain document-level access controls that simplify GDPR compliance audits.' },
    ],
  },

  '2': {
    intro: "Zero trust is one of the most discussed frameworks in modern cybersecurity — and one of the most misunderstood. It is not a product you can purchase or a technology you can install. Zero trust is an architectural philosophy built on a single principle: never trust, always verify.",
    blocks: [
      { type: 'heading', text: 'The Three Core Principles of Zero Trust' },
      { type: 'subheading', text: 'Verify Explicitly' },
      { type: 'paragraph', text: 'Every access request — from every user, device, and application — must be authenticated and authorized based on all available signals: identity, location, device health, and the sensitivity of the resource being accessed. A valid password is not sufficient on its own.' },
      { type: 'subheading', text: 'Use Least Privilege Access' },
      { type: 'paragraph', text: 'Users and systems should have access only to what they need for their specific role — nothing more. This limits the blast radius of a compromised account. If an attacker gains access to a junior employee\'s credentials, they should be able to reach very little of your environment.' },
      { type: 'subheading', text: 'Assume Breach' },
      { type: 'paragraph', text: 'Design your security posture assuming that attackers are already inside your network. Focus on limiting lateral movement, monitoring for anomalous behavior, and ensuring that a single compromised system cannot cascade into a full organizational breach.' },
      { type: 'heading', text: 'A Practical Implementation Roadmap' },
      { type: 'list', items: [
        'Start with identity — implement strong, phishing-resistant MFA across all users and applications',
        'Inventory your devices — only managed, compliant devices should access corporate resources',
        'Segment your network — prevent east-west movement between systems that do not need to communicate',
        'Apply least-privilege to every role — audit current permissions and remove excess access',
        'Monitor continuously — deploy behavioral analytics to detect anomalous access patterns',
        'Protect your data — classify sensitive information and apply controls based on classification',
      ]},
      { type: 'heading', text: 'Common Mistakes Organizations Make' },
      { type: 'paragraph', text: 'The biggest mistake is treating zero trust as a checkbox rather than an ongoing practice. Many organizations buy a zero trust networking product and consider the work done. In reality, zero trust requires continuous policy refinement, regular access reviews, and a security culture that enforces the model across every team.' },
      { type: 'cta', text: 'Meika Authenticator provides the identity foundation your zero trust architecture requires.' },
    ],
  },

  '3': {
    intro: "Passwords are the weakest link in enterprise security. They can be phished, stolen, guessed, and reused. Passwordless authentication eliminates passwords entirely, replacing them with cryptographic credentials that cannot be phished or stolen in transit. Here is how to deploy it with Meika.",
    blocks: [
      { type: 'heading', text: 'What Passwordless Authentication Actually Means' },
      { type: 'paragraph', text: 'Passwordless authentication uses public-key cryptography to verify a user\'s identity. The private key never leaves the user\'s device — it is stored in secure hardware such as a TPM chip or platform authenticator. During login, a cryptographic challenge is signed with the private key and verified with the corresponding public key on the server. There is no shared secret that an attacker can intercept or steal.' },
      { type: 'heading', text: 'Prerequisites Before You Begin' },
      { type: 'list', items: [
        'A Meika account with administrator access',
        'An inventory of your existing applications and identity providers',
        'Decision on rollout scope — start with a pilot group before organization-wide deployment',
        'Employee communication plan explaining what will change and why',
      ]},
      { type: 'heading', text: 'Step-by-Step Setup Guide' },
      { type: 'subheading', text: 'Step 1: Configure Your Identity Provider Integration' },
      { type: 'paragraph', text: 'In the Meika admin console, navigate to Integrations and connect your existing IdP — whether that is Azure AD, Okta, Google Workspace, or a custom SAML provider. Meika operates as an authentication layer on top of your existing directory, so you do not need to migrate users or rebuild access policies.' },
      { type: 'subheading', text: 'Step 2: Enroll Authenticator Methods' },
      { type: 'paragraph', text: 'Enable passkey enrollment for your pilot group. Meika supports device passkeys (Touch ID, Face ID, Windows Hello) and hardware security keys (FIDO2/WebAuthn). We recommend making device passkeys the primary method and hardware keys the fallback for high-privilege accounts.' },
      { type: 'subheading', text: 'Step 3: Configure Application Policies' },
      { type: 'paragraph', text: 'Define which applications require passwordless authentication and which conditional access rules apply. You can enforce stricter requirements — such as hardware key only — for access to sensitive systems while allowing device passkeys for standard productivity applications.' },
      { type: 'subheading', text: 'Step 4: Pilot, Monitor, and Expand' },
      { type: 'paragraph', text: 'Roll out to your pilot group and monitor the Meika dashboard for enrollment rates and authentication success. Address friction points before expanding. Most organizations achieve full deployment within four to six weeks of their pilot launch.' },
      { type: 'callout', emoji: '🔐', title: 'What to Expect After Deployment', items: [
        'Employees no longer need to remember or reset passwords',
        'Phishing attacks targeting passwords become ineffective',
        'IT helpdesk password reset tickets drop significantly',
        'Authentication is faster — a biometric gesture replaces typing a password',
        'Audit logs capture every authentication event with device context',
      ]},
      { type: 'cta', text: 'Ready to eliminate passwords from your organization? Start your Meika pilot today.' },
    ],
  },

  '4': {
    intro: "Credential stuffing is one of the most pervasive and underappreciated threats facing organizations today. Unlike sophisticated zero-day exploits, credential stuffing requires minimal technical skill — attackers simply take leaked username and password combinations from historical breaches and test them at scale against live services.",
    blocks: [
      { type: 'heading', text: 'How a Credential Stuffing Attack Works' },
      { type: 'paragraph', text: 'Billions of credential records from past breaches are available on underground forums and dark web marketplaces. Attackers obtain these lists and run automated tools — commonly called credential stuffing frameworks — that test each credential pair against a target login page. The process is industrialized and can test millions of credentials per hour.' },
      { type: 'paragraph', text: 'The attack relies entirely on password reuse. If an employee used the same password for a breached personal service as they use for their corporate email, the attacker gains access. Given that password reuse remains extremely common despite years of security awareness training, credential stuffing remains highly effective.' },
      { type: 'heading', text: 'Why Standard Defenses Often Fail' },
      { type: 'list', items: [
        'Rate limiting alone is ineffective — attackers distribute requests across thousands of IP addresses',
        'CAPTCHA can be bypassed using third-party solving services or AI-based recognition',
        'IP blocklisting is reactive and attackers rotate infrastructure constantly',
        'Security awareness training does not eliminate password reuse behavior reliably',
      ]},
      { type: 'heading', text: 'Effective Detection Signals' },
      { type: 'paragraph', text: 'Credential stuffing leaves detectable patterns if you know what to look for. Watch for a spike in failed authentication attempts across many different accounts, login attempts from IP addresses or ASNs not previously seen in your user population, successful logins immediately followed by unusual actions such as data exports or permission changes, and authentication from geographies inconsistent with your user base.' },
      { type: 'heading', text: 'Controls That Provide Strong Protection' },
      { type: 'callout', emoji: '🛡️', title: 'Defense Priorities', items: [
        'Deploy phishing-resistant MFA — even if credentials are stolen, the attacker cannot complete authentication',
        'Check new and existing passwords against known-breached credential databases (NIST SP 800-63B recommends this)',
        'Implement behavioral risk scoring on authentication attempts — flag anomalous patterns for step-up authentication',
        'Monitor for impossible travel — a user authenticating from London and then Singapore within minutes is a clear signal',
        'Enforce unique passwords with a password manager policy and remove shared account credentials entirely',
      ]},
      { type: 'paragraph', text: 'The most durable long-term defense is eliminating passwords entirely through passwordless authentication. Without a password to stuff, the attack class becomes irrelevant.' },
      { type: 'cta', text: 'See how Meika Authenticator eliminates credential stuffing risk with passkey-based authentication.' },
    ],
  },

  '5': {
    intro: "Phishing has always been the most reliable initial access technique available to attackers. The arrival of capable generative AI has not changed this fact — it has amplified it. What previously required a skilled social engineer can now be done at scale with minimal effort.",
    blocks: [
      { type: 'heading', text: 'What Has Changed with AI-Generated Phishing' },
      { type: 'paragraph', text: 'Traditional phishing emails were identifiable by poor grammar, awkward phrasing, and generic templates. Security awareness training taught employees to look for these signals. AI-generated phishing emails contain none of these flaws. They are grammatically correct, contextually appropriate, and often personalized using publicly available information from LinkedIn, company websites, and social media.' },
      { type: 'paragraph', text: 'AI also enables attackers to produce phishing content at a scale that was previously impractical. Campaigns that once required a team of social engineers can now be executed by a single attacker with access to an AI writing tool.' },
      { type: 'heading', text: 'Emerging Attack Techniques' },
      { type: 'subheading', text: 'Spear Phishing at Scale' },
      { type: 'paragraph', text: 'Attackers use AI to generate highly personalized emails referencing specific projects, colleagues, and recent company events. The email appears to come from a trusted colleague or vendor and asks for a plausible action — reviewing a document, approving a payment, or resetting an account.' },
      { type: 'subheading', text: 'Voice Cloning and Vishing' },
      { type: 'paragraph', text: 'AI voice cloning can replicate a known colleague\'s or executive\'s voice with a brief audio sample. This is being used in phone-based attacks where an employee receives a call from what appears to be their manager requesting urgent action — transferring funds, sharing credentials, or approving access.' },
      { type: 'subheading', text: 'AiTM Phishing Pages' },
      { type: 'paragraph', text: 'Adversary-in-the-middle phishing proxies sit between the victim and a legitimate service. The victim logs in normally, the proxy captures the session token in real time, and the attacker gains authenticated access — bypassing MFA entirely. AI is making these pages harder to detect and easier to deploy.' },
      { type: 'heading', text: 'What Effective Detection Looks Like Now' },
      { type: 'list', items: [
        'Email authentication (SPF, DKIM, DMARC) stops spoofing but not compromised legitimate sender accounts',
        'Behavioral analysis of email content can flag unusual request patterns even in well-written emails',
        'Phishing-resistant MFA (passkeys, hardware keys) makes credential capture irrelevant even when phishing succeeds',
        'Out-of-band verification for high-risk actions such as wire transfers and credential resets',
        'Regular realistic phishing simulations that reflect current AI-generated attack styles',
      ]},
      { type: 'callout', emoji: '⚠️', title: 'The Most Important Mindset Shift', items: [
        'Do not train employees to identify bad grammar — that signal is gone',
        'Train employees to be suspicious of any unexpected urgency, regardless of how legitimate the email looks',
        'Establish a simple verbal verification protocol for any out-of-the-ordinary request, even from known contacts',
      ]},
      { type: 'cta', text: 'Meika\'s phishing-resistant MFA eliminates the credential theft risk that makes phishing valuable.' },
    ],
  },

  '6': {
    intro: "SOC 2 has become a de facto requirement for SaaS companies selling to mid-market and enterprise customers. A SOC 2 Type II report demonstrates that your security controls are not just documented — they operated effectively over a sustained audit period. Here is how to approach it without losing months of engineering velocity.",
    blocks: [
      { type: 'heading', text: 'Understanding What SOC 2 Actually Measures' },
      { type: 'paragraph', text: 'SOC 2 is structured around Trust Services Criteria (TSC). Security is the only mandatory category. The others — Availability, Processing Integrity, Confidentiality, and Privacy — are included based on what is relevant to your service and what your customers require. Most SaaS companies start with Security alone and add Availability and Confidentiality as their customer base matures.' },
      { type: 'heading', text: 'Type I vs. Type II: Know the Difference' },
      { type: 'paragraph', text: 'A Type I report confirms that your controls are appropriately designed at a point in time. A Type II report confirms that those controls operated effectively over a period — typically six to twelve months. Enterprise buyers increasingly require Type II. Plan your timeline accordingly: you need to run controls for at least six months before your Type II audit can begin.' },
      { type: 'heading', text: 'Where Most Startups Struggle' },
      { type: 'list', items: [
        'Access reviews — you need to conduct and document quarterly reviews of who has access to what',
        'Change management — every production deployment needs a documented approval and testing record',
        'Vendor management — you need security assessments for every critical vendor in your supply chain',
        'Incident response — you need a written plan and evidence that you have tested it',
        'Background checks — many frameworks expect background checks for employees with privileged access',
      ]},
      { type: 'heading', text: 'A Realistic Preparation Timeline' },
      { type: 'subheading', text: 'Months 1–2: Readiness Assessment' },
      { type: 'paragraph', text: 'Work with a compliance platform or consultant to identify your control gaps. Document your current security policies — even if some are aspirational. Prioritize closing the most critical gaps first.' },
      { type: 'subheading', text: 'Months 3–8: Evidence Collection Period' },
      { type: 'paragraph', text: 'Run your controls consistently and collect evidence as you go. Do not try to backfill evidence at audit time. Automated compliance platforms that integrate with your cloud provider and ticketing systems make this significantly easier.' },
      { type: 'subheading', text: 'Month 9+: Audit' },
      { type: 'paragraph', text: 'Select a CPA firm with strong SaaS expertise. The audit itself typically takes four to six weeks. Cooperate fully with document requests — delays extend the timeline and cost.' },
      { type: 'callout', emoji: '💡', title: 'Practical Shortcuts That Do Not Cut Corners', items: [
        'Use a compliance automation platform — manual evidence collection is a significant time sink',
        'Implement access controls in code from the start rather than bolt-on solutions',
        'Choose vendors that have their own SOC 2 reports — it simplifies your vendor management evidence',
        'Write policies that reflect what you actually do, not an idealized version',
      ]},
      { type: 'cta', text: 'Meika helps SaaS teams demonstrate compliant document and credential access controls for SOC 2 audits.' },
    ],
  },

  '7': {
    intro: "Network segmentation has existed for decades, but the zero trust era has fundamentally changed how it should be implemented. Legacy segmentation was about creating zones with walls between them. Modern micro-segmentation is about controlling every flow between every workload — regardless of where those workloads run.",
    blocks: [
      { type: 'heading', text: 'Why Traditional Segmentation Is No Longer Sufficient' },
      { type: 'paragraph', text: 'The classic approach — DMZ, internal network, VLAN segmentation — was designed for on-premises infrastructure where the network perimeter was meaningful. In a cloud-first environment, workloads span multiple cloud providers, SaaS platforms, and remote offices. The perimeter does not exist. Flat or coarsely segmented networks allow an attacker who compromises one workload to move laterally to high-value targets with minimal resistance.' },
      { type: 'heading', text: 'Core Principles of Zero Trust Segmentation' },
      { type: 'subheading', text: 'Identity-Based Policies' },
      { type: 'paragraph', text: 'In a zero trust segmentation model, access between workloads is granted based on identity — the verified identity of the service, application, or user making the request — not the IP address or network location. This works regardless of where the workload runs.' },
      { type: 'subheading', text: 'Default Deny' },
      { type: 'paragraph', text: 'All communication between segments should be denied by default. Explicit allow rules are created only for flows that are required and documented. This is the opposite of most legacy firewall configurations, which default to allow with explicit deny rules added over time.' },
      { type: 'subheading', text: 'Continuous Monitoring of East-West Traffic' },
      { type: 'paragraph', text: 'Monitoring north-south traffic (in and out of your network) is standard practice. Monitoring east-west traffic (between systems inside your network) is where most organizations have blind spots. Lateral movement is invisible if you are not watching internal traffic.' },
      { type: 'heading', text: 'Practical Implementation for Cloud-First Organizations' },
      { type: 'list', items: [
        'Map your application dependencies before you segment — blind segmentation breaks production systems',
        'Start segmentation at the application layer, not just the network layer',
        'Use cloud-native security groups and VPC policies as your first segmentation layer',
        'Layer micro-segmentation software for east-west visibility and policy enforcement within segments',
        'Monitor all inter-segment traffic with a SIEM or cloud security posture management tool',
        'Conduct quarterly policy reviews — environments change and stale rules create both gaps and friction',
      ]},
      { type: 'cta', text: 'Meika\'s access control framework helps define and enforce identity-based access between your services and documents.' },
    ],
  },

  '8': {
    intro: "Document security is one of the most overlooked areas of organizational information security. Files containing sensitive contracts, financial data, personnel records, and intellectual property often live in shared drives with access policies set years ago and never reviewed. Meika Vaults provide structured, auditable, and granular access control for your most sensitive documents.",
    blocks: [
      { type: 'heading', text: 'What Meika Vaults Are' },
      { type: 'paragraph', text: 'A Meika Vault is a secure container for documents that require controlled access. Unlike a standard shared folder, a Vault enforces access policies at the document level, generates a complete audit trail of every access event, and supports time-limited and purpose-limited access grants. You control not just who can see a document, but when, from what devices, and for how long.' },
      { type: 'heading', text: 'Setting Up Granular Permission Structures' },
      { type: 'subheading', text: 'Roles and Groups' },
      { type: 'paragraph', text: 'Start by defining roles that reflect your organizational structure. Meika integrates with your existing directory (Azure AD, Okta, Google Workspace) to pull group memberships. Assign Vault access to roles, not individual users, wherever possible. This ensures that when an employee changes roles or leaves, their access changes automatically.' },
      { type: 'subheading', text: 'Permission Levels' },
      { type: 'paragraph', text: 'Meika Vaults support View, Comment, Download, Edit, Share, and Manage permission levels. Apply the most restrictive level that allows the user to complete their work. Legal reviewers rarely need to edit — View is sufficient. External collaborators should almost never have Download access to sensitive documents.' },
      { type: 'subheading', text: 'Time-Limited Access' },
      { type: 'paragraph', text: 'For vendor, contractor, and external auditor access, use time-limited grants that expire automatically. You specify an end date when granting access; Meika revokes it without any manual action required. This eliminates the common problem of dormant access that persists long after a project ends.' },
      { type: 'heading', text: 'Secure Collaboration Workflows' },
      { type: 'list', items: [
        'Share documents with external parties using Meika\'s secure link feature — recipients authenticate before gaining access',
        'Enable watermarking on sensitive documents to deter unauthorized distribution',
        'Use Vault-level access reviews to audit permissions quarterly without manual spreadsheet tracking',
        'Configure notifications for high-sensitivity documents — get alerted when specific files are accessed',
        'Set download restrictions on documents that should only be read in-browser',
      ]},
      { type: 'heading', text: 'Audit and Compliance Reporting' },
      { type: 'paragraph', text: 'Every access event in a Meika Vault is logged with the user identity, timestamp, device context, and action taken. This audit trail is immutable and exportable in formats accepted by SOC 2, ISO 27001, and GDPR audit processes. For compliance-heavy industries, this evidence collection is automatic rather than manual.' },
      { type: 'cta', text: 'Get started with Meika Vaults and bring structure to your most sensitive document workflows.' },
    ],
  },

  '9': {
    intro: "Ransomware is no longer just a malware problem. It is a highly organized criminal enterprise. Today, attackers do not just encrypt files and demand a fee — they steal sensitive data, leak it publicly, and target your backups. To defend your organization, you must understand exactly how these threat actors operate.",
    blocks: [
      { type: 'heading', text: 'Step 1: Initial Infiltration (The Open Door)' },
      { type: 'paragraph', text: 'Attackers rarely breach a network by brute-forcing a firewall. Instead, they look for the path of least resistance.' },
      { type: 'list', title: 'The three most common entry points are:', items: [
        'Phishing Emails — employees receive highly convincing emails containing malicious links or attachments',
        'Compromised Credentials — attackers obtain valid employee passwords from dark web markets or prior breaches',
        'Unpatched Software — attackers scan the internet for known vulnerabilities in public-facing systems',
      ]},
      { type: 'heading', text: 'Step 2: Lateral Movement (Exploring the House)' },
      { type: 'paragraph', text: 'Once a hacker gains access to a single computer, they do not deploy ransomware immediately. They want to maximize leverage. Over days or weeks, they quietly move from computer to computer across your network. They search for your crown jewels: customer databases, intellectual property, and critical financial records.' },
      { type: 'heading', text: 'Step 3: Data Exfiltration (The Double Ransom)' },
      { type: 'paragraph', text: 'Before any file is encrypted, the attackers steal your data and upload it to their own infrastructure. This enables a double extortion tactic. Even if you can restore your systems from a backup without paying the ransom, the attackers will threaten to publish your private data online unless you pay. Backups alone are no longer sufficient protection.' },
      { type: 'heading', text: 'Step 4: Execution (The Lockdown)' },
      { type: 'paragraph', text: 'Finally, the attackers deploy the ransomware payload across all infected machines simultaneously. Within minutes, files become unreadable, systems crash, and a ransom note appears on employee screens. At this point, the organization is in crisis mode.' },
      { type: 'callout', emoji: '🛡️', title: 'Three Controls to Implement Today', items: [
        'Enforce Multi-Factor Authentication — make MFA mandatory across every corporate application and VPN login; this renders stolen passwords ineffective at Step 1',
        'Isolate Critical Backups — keep backups completely separate from your main network (immutable or offline) so attackers cannot delete them during lateral movement',
        'Deploy Continuous Monitoring — use behavioral monitoring tools that detect unusual patterns such as a user account accessing hundreds of files in minutes',
      ]},
      { type: 'heading', text: 'Why Traditional Antivirus Is Not Enough' },
      { type: 'paragraph', text: 'Modern ransomware is operated by skilled human adversaries, not automated scripts. The attacker is present in your environment for days before executing the final payload. During that time, they adapt to your specific defenses, disable security tools where possible, and operate in ways designed to evade signature-based detection. The defense must match the threat: continuous monitoring, identity security, and network segmentation working together.' },
      { type: 'cta', text: 'Do not wait for a ransom note to find your weak spots. See how Meika helps close the identity gaps attackers rely on.' },
    ],
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function CategoryIcon({ category }: { category: string }) {
  const map: Record<string, React.ElementType> = {
    'Threat Intelligence': AlertTriangle,
    'Identity Security': Shield,
    'Compliance': Shield,
    'Product Guides': BookOpen,
    'Zero Trust': Lock,
    'Security Research': Cpu,
  };
  const Icon = map[category] ?? Globe;
  return <Icon className="w-3 h-3" />;
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// ─── Article reader ────────────────────────────────────────────────────────
interface ArticleMeta {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tagBg: string;
  accentColor: string;
  excerpt: string;
}

function ArticleView({ meta, content, onBack, setCurrentPage }: { meta: ArticleMeta; content: ArticleContent; onBack: () => void; setCurrentPage: (page: string) => void }) {
  return (
    <motion.div
      className="min-h-screen bg-[#0A0B0F] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back bar */}
      <div className="sticky top-0 z-40 bg-[#0A0B0F]/90 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-6 max-w-3xl py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-[#9EA3B0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Meika Security Research
          </button>
        </div>
      </div>

      <article className="container mx-auto px-6 max-w-3xl py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${meta.tagBg}`}>
              <CategoryIcon category={meta.category} />
              {meta.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#9EA3B0]">
              <Calendar className="w-3 h-3" />
              Published on {meta.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#9EA3B0]">
              <Clock className="w-3 h-3" />
              {meta.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl leading-tight mb-6">{meta.title}</h1>

          <p className="text-lg text-[#9EA3B0] leading-relaxed border-l-2 border-cyan-500/40 pl-5 mb-8">
            {meta.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {meta.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="text-sm text-white">{meta.author}</p>
              <p className="text-xs text-[#9EA3B0]">{meta.authorRole}</p>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Intro */}
        <p className="text-lg text-[#C8CDD8] leading-relaxed mb-10 font-light">{content.intro}</p>

        {/* Content blocks */}
        <div className="space-y-6">
          {content.blocks.map((block, i) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={i} className="text-2xl mt-12 mb-2 pt-6 border-t border-white/5 first:border-0 first:pt-0">
                    {block.text}
                  </h2>
                );
              case 'subheading':
                return (
                  <h3 key={i} className={`text-lg mt-8 mb-2 ${i > 0 ? 'text-cyan-300' : 'text-cyan-300'}`}>
                    {block.text}
                  </h3>
                );
              case 'paragraph':
                return (
                  <p key={i} className="text-[#C0C5D0] leading-relaxed">
                    {block.text}
                  </p>
                );
              case 'list':
                return (
                  <div key={i}>
                    {block.title && <p className="text-white mb-3 text-sm">{block.title}</p>}
                    <ul className="space-y-2.5">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[#C0C5D0] text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              case 'callout':
                return (
                  <div key={i} className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 my-8">
                    <div className="flex items-start gap-3 mb-4">
                      {block.emoji && <span className="text-xl">{block.emoji}</span>}
                      <h4 className="text-white">{block.title}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[#C0C5D0] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              case 'cta':
                return (
                  <div key={i} className="bg-gradient-to-br from-cyan-950/50 to-blue-950/30 border border-cyan-500/20 rounded-xl p-8 my-10 text-center">
                    <p className="text-[#C0C5D0] mb-5 text-sm leading-relaxed">{block.text}</p>
                    <button
                      onClick={() => { setCurrentPage('documentation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]"
                    >
                      Learn More About Meika
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-[#9EA3B0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </button>
        </div>
      </article>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export function BlogPage({ setCurrentPage }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openArticle, setOpenArticle] = useState<ArticleMeta | null>(null);

  const openFeatured = () => {
    setOpenArticle({
      id: 'featured',
      title: FEATURED.title,
      category: FEATURED.category,
      date: FEATURED.date,
      readTime: FEATURED.readTime,
      author: FEATURED.author,
      authorRole: FEATURED.authorRole,
      tagBg: FEATURED.tagBg,
      accentColor: FEATURED.accentColor,
      excerpt: FEATURED.excerpt,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPost = (post: Post) => {
    setOpenArticle({
      id: String(post.id),
      title: post.title,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      author: post.author,
      authorRole: post.authorRole,
      tagBg: post.tagBg,
      accentColor: post.accentColor,
      excerpt: post.excerpt,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setOpenArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  // Article reader
  if (openArticle) {
    const content = CONTENT[openArticle.id];
    if (content) {
      return (
        <AnimatePresence mode="wait">
          <ArticleView key={openArticle.id} meta={openArticle} content={content} onBack={closeArticle} setCurrentPage={setCurrentPage} />
        </AnimatePresence>
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <GridPattern />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/4 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative container mx-auto px-6 max-w-6xl">
          {/* Live badge */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Live Research & Analysis
              <span className="text-cyan-500/60">•</span>
              <span className="text-cyan-500/80">June 2026</span>
            </span>
          </motion.div>

          {/* Brand name — full-scale display */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-block relative">
              {/* Glow behind MEIKA */}
              <div className="absolute inset-0 bg-cyan-400/8 blur-3xl rounded-full scale-150" />
              <p className="relative text-[clamp(4rem,14vw,10rem)] font-black leading-none tracking-tighter text-white">
                MEIKA
              </p>
            </div>
            <p className="text-[clamp(1.5rem,5vw,3.75rem)] font-semibold tracking-[0.2em] uppercase text-cyan-400/90 mt-1 mb-0">
              SECURITY RESEARCH
            </p>

            {/* Rule line */}
            <div className="flex items-center justify-center gap-4 mt-8 mb-10">
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-cyan-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-cyan-500/40" />
            </div>
          </motion.div>

          {/* Subtitle & description */}
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h2 className="text-xl md:text-2xl text-white/80 mb-4 tracking-wide">
              Threat Intelligence, Identity Security & Compliance Insights
            </h2>
            <p className="text-base text-[#9EA3B0] leading-relaxed mb-10">
              Expert analysis, practical security guidance, compliance updates, and product insights
              from the Meika security team — written for CISOs, security leaders, and IT administrators.
            </p>

            {/* Newsletter form */}
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  You're subscribed. Welcome to Meika Security Research.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-cyan-500/50 transition-colors">
                    <Mail className="w-4 h-4 text-[#9EA3B0] flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@company.com"
                      className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder-[#9EA3B0] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    Subscribe Free
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Post ──────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-6xl mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs text-[#9EA3B0] uppercase tracking-widest">Featured</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <motion.article
          className={`relative rounded-2xl border ${FEATURED.borderColor} bg-gradient-to-br ${FEATURED.gradient} overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -2 }}
          onClick={openFeatured}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
            }}
          />
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

          <div className="relative grid lg:grid-cols-[1fr_420px] gap-0">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${FEATURED.tagBg}`}>
                  <CategoryIcon category={FEATURED.category} />
                  {FEATURED.category}
                </span>
                <span className="text-xs text-[#9EA3B0]">{FEATURED.date}</span>
                <span className="text-xs text-[#9EA3B0] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {FEATURED.readTime}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl leading-snug mb-5 group-hover:text-cyan-50 transition-colors">
                {FEATURED.title}
              </h2>

              <p className="text-[#9EA3B0] leading-relaxed mb-8 max-w-xl">
                {FEATURED.excerpt}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-semibold">
                    VB
                  </div>
                  <div>
                    <p className="text-sm text-white">{FEATURED.author}</p>
                    <p className="text-xs text-[#9EA3B0]">{FEATURED.authorRole}</p>
                  </div>
                </div>

                <button className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl text-cyan-400 text-sm transition-all duration-200">
                  Read Full Analysis
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Visual panel */}
            <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border-l border-white/5 p-12">
              <div className="relative w-full max-w-[280px] aspect-square">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-cyan-500/20"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
                    style={{ margin: `${i * 20}px` }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <AlertTriangle className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>
                {['Identity', 'SaaS IAM', 'Zero Trust', 'MFA'].map((label, i) => (
                  <motion.div
                    key={label}
                    className="absolute px-2 py-1 bg-[#0d1117] border border-cyan-500/20 rounded text-[10px] text-cyan-400 whitespace-nowrap"
                    style={{
                      top: `${[10, 70, 15, 65][i]}%`,
                      left: `${[5, 65, 60, 0][i]}%`,
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </section>

      {/* ── Filter Bar ────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-6xl mb-10">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400'
                    : 'bg-white/5 border-white/10 text-[#9EA3B0] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-cyan-500/40 transition-colors min-w-[220px]">
            <Search className="w-4 h-4 text-[#9EA3B0] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles…"
              className="flex-1 bg-transparent text-sm text-white placeholder-[#9EA3B0] outline-none"
            />
          </div>
        </div>
      </section>

      {/* ── Post Grid ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-6xl mb-24">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center text-[#9EA3B0]"
            >
              <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p>No articles match your filters.</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.map((post, i) => {
                const Icon = post.icon;
                return (
                  <motion.article
                    key={post.id}
                    className="group flex flex-col bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-200"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    onClick={() => openPost(post)}
                  >
                    <div className={`relative h-36 bg-gradient-to-br ${post.gradient} flex items-center justify-center border-b border-white/5`}>
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className={`w-7 h-7 ${post.accentColor}`} />
                      </div>
                      <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border ${post.tagBg}`}>
                          <CategoryIcon category={post.category} />
                          {post.category}
                        </span>
                        <span className="text-[11px] text-[#9EA3B0] ml-auto flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-base leading-snug mb-3 group-hover:text-cyan-50 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-[#9EA3B0] text-xs leading-relaxed flex-1 mb-5">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs text-[#9EA3B0]">{post.date}</span>
                        <span className={`inline-flex items-center gap-1 text-xs ${post.accentColor} group-hover:gap-2 transition-all`}>
                          Read more
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length > 0 && (
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-[#9EA3B0] hover:text-white transition-all duration-200 flex items-center gap-2 mx-auto">
              Load More Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-4xl mb-24">
        <motion.div
          className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-[#0d1117] to-blue-950/30 p-12 text-center overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-3xl mb-3">Stay Ahead of Emerging Security Threats</h2>
            <p className="text-[#9EA3B0] mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Receive expert analysis, threat intelligence updates, compliance guidance, and product
              best practices from the Meika security team.
            </p>
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 text-green-400 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  You're on the list.
                </motion.p>
              ) : (
                <motion.form
                  key="cta-form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@company.com"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EA3B0] outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    Subscribe Free
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
