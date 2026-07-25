import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Terms() {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        <Button variant="ghost" size="sm" className="mb-6 gap-2" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-destructive">Terms & Conditions</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>
          <div className="space-y-8 text-foreground/90">
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Introduction</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">
                  Welcome to Zyren. By accessing or using our platform, you agree to be bound by these Terms & Conditions. Zyren provides an AI-powered secure platform for storing, managing, and sharing text snippets, notes, code, and media — privately or publicly — with intelligent features including title generation, content summarization, vision analysis, and interactive chat assistance.
                </p>
                <p className="leading-relaxed">
                  These terms govern your use of our services, including AI-powered features. If you do not agree with any part of these terms, please do not use Zyren.
                </p>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Eligibility</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">To use Zyren, you must:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Be at least 13 years of age</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Have the legal capacity to enter into binding agreements</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Not be prohibited from using our services under applicable laws</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Provide accurate and complete registration information</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>User Accounts</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">When creating an account on Zyren:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You are responsible for maintaining the confidentiality of your account credentials</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You agree to notify us immediately of any unauthorized access to your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You are responsible for all activities that occur under your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You may not share your account with others or create multiple accounts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We reserve the right to suspend or terminate accounts that violate these terms</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Acceptable Use</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">You agree not to use Zyren to:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Upload, share, or distribute illegal, harmful, or offensive content</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Violate any intellectual property rights or privacy rights of others</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Distribute malware, viruses, or any malicious code</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Attempt to gain unauthorized access to our systems or other users' accounts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Use automated systems to scrape or collect data from our platform</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Interfere with or disrupt the integrity or performance of our services</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Impersonate any person or entity or misrepresent your affiliation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Abuse AI features by attempting prompt injection, generating harmful content, or circumventing rate limits</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Use AI features to process confidential, sensitive, or personally identifiable information without proper authorization</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Content Ownership</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Regarding content on Zyren:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You retain all ownership rights to the content you upload and share</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>By sharing content publicly, you grant Zyren a license to store, display, and distribute that content</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You are solely responsible for the content you post and its legality</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We reserve the right to remove content that violates these terms or applicable laws</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Private pastes remain private and are only accessible to you when logged in</span>
                  </li>
                </ul>
              </div>
            </section>
            {/* AI Features Usage */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>AI Features Usage</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Regarding AI-powered features:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>AI features include title generation, content summarization, vision analysis, and interactive chat</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Your content may be processed by third-party AI providers (Groq, Google Gemini) when using AI features</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>AI-generated content is provided "as is" and may not always be accurate or complete</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You are responsible for verifying AI-generated content before use</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We reserve the right to implement rate limits on AI feature usage</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Do not use AI features to process highly sensitive or confidential information</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>AI models may change or be updated without prior notice to improve performance</span>
                  </li>
                </ul>
              </div>
            </section>
            {/* Security & Abuse */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Security & Abuse</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">To maintain platform security:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We implement industry-standard security measures to protect your data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You must report any security vulnerabilities or abuse to us immediately</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We reserve the right to investigate and take action against abusive behavior</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Repeated violations may result in permanent account suspension</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We may cooperate with law enforcement in cases of illegal activity</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Limitation of Liability</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Zyren is provided "as is" without warranties:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We do not guarantee uninterrupted or error-free service</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We are not liable for any loss of data, content, or access to your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We are not responsible for content posted by users or third parties</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Our total liability shall not exceed the amount you paid us in the past 12 months</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We are not liable for indirect, incidental, or consequential damages</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Termination</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Account termination terms:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You may delete your account at any time through your account settings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We may suspend or terminate your account for violations of these terms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Upon termination, your access to private content will be revoked</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Public pastes may remain accessible unless you delete them before termination</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Provisions regarding liability and disputes survive termination</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Modifications</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Changes to terms and services:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We reserve the right to modify these terms at any time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Changes will be effective upon posting to this page</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Continued use of Zyren after changes constitutes acceptance of new terms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We may modify or discontinue features without prior notice</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Material changes will be communicated via email or platform notification</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Governing Law</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Legal jurisdiction and dispute resolution:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>These terms are governed by the laws of Karnataka, India</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>You agree to resolve disputes through good faith negotiation first</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>If negotiation fails, disputes may be resolved through arbitration or litigation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>These terms constitute the entire agreement between you and Zyren</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              If you have any questions about these Terms & Conditions, please contact us through the platform.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}