import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Privacy() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-destructive">Privacy Policy</h1>
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
                  At Zyren, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform for storing, managing, and sharing text snippets, notes, and code.
                </p>
                <p className="leading-relaxed">
                  By using Zyren, you consent to the data practices described in this policy. We are committed to transparency and protecting your data in accordance with applicable privacy laws.
                </p>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Information We Collect</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">We collect the following types of information:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Account Information:</strong> Email address, password (encrypted), and account preferences</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Content Data:</strong> Text snippets, code, notes, and metadata you create and store on Zyren</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Usage Data:</strong> Information about how you interact with our platform, including access times and features used</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Cookies:</strong> Small data files stored on your device to enhance user experience and analytics</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>How We Use Information</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">We use your information to:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Provide, maintain, and improve our platform services</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Authenticate your identity and manage your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Store and manage your pastes, both private and public</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Generate shareable links for public pastes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Communicate with you about service updates, security alerts, and support</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Analyze usage patterns to improve platform performance and user experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Detect, prevent, and address security issues, fraud, and abuse</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Comply with legal obligations and enforce our Terms & Conditions</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Data Sharing</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">We share your information only in the following circumstances:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Public Pastes:</strong> Content you mark as public is accessible to anyone with the share code</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Service Providers:</strong> Trusted third-party services that help us operate our platform (e.g., hosting, analytics)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Legal Requirements:</strong> When required by law, court order, or government request</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</span>
                  </li>
                </ul>
                <p className="leading-relaxed mt-3">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>User Rights</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">You have the following rights regarding your data:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Access:</strong> Request a copy of the personal data we hold about you</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Correction:</strong> Update or correct inaccurate information in your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Deletion:</strong> Request deletion of your account and associated data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Export:</strong> Download your pastes and content in a portable format</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Opt-Out:</strong> Unsubscribe from promotional communications at any time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Restriction:</strong> Request limitation of processing of your personal data</span>
                  </li>
                </ul>
                <p className="leading-relaxed mt-3">
                  To exercise these rights, please contact us through your account settings or our support channels.
                </p>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Data Security</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">We implement robust security measures to protect your data:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Encryption of data in transit using HTTPS/TLS protocols</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Secure password storage using industry-standard hashing algorithms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Authentication via JWT tokens with secure session management</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Regular security audits and vulnerability assessments</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Access controls and monitoring to prevent unauthorized access</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Backup systems to prevent data loss</span>
                  </li>
                </ul>
                <p className="leading-relaxed mt-3">
                  While we strive to protect your data, no method of transmission over the internet is 100% secure. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Data Retention</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">We retain your data as follows:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Account Data:</strong> Retained for as long as your account is active</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Pastes:</strong> Stored until you delete them or they reach their expiration date</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Usage Logs:</strong> Retained for up to 90 days for security and analytics purposes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Deleted Data:</strong> Permanently removed from active systems within 30 days of deletion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Backup Data:</strong> May persist in backups for up to 90 days after deletion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span><strong>Legal Holds:</strong> Data may be retained longer if required by law or legal proceedings</span>
                  </li>
                </ul>
              </div>
            </section>
            {}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Changes to Privacy Policy</span>
              </h2>
              <div className="space-y-2 pl-6">
                <p className="leading-relaxed">Updates to this policy:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>The "Last updated" date at the top of this page indicates when the policy was last revised</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Material changes will be communicated via email or prominent notice on our platform</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>Continued use of Zyren after changes constitutes acceptance of the updated policy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>We encourage you to review this policy periodically to stay informed about how we protect your data</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us through the platform.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}