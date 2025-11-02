
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read the terms and conditions for using the services of KAWADY mildsteel consultants Ltd.',
  robots: 'noindex, nofollow', // this is practice for legal practice
};

export default function TermsPage() {
  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">Terms and Conditions</h1>
          <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground space-y-6">
            <p className="text-sm text-center">Last updated: {new Date().toLocaleDateString()}</p>
            
            <p>
              Please read these terms and conditions carefully before using Our Service. These Terms and Conditions govern your use of the KAWADY mildsteel consultants Ltd website and the services offered.
            </p>

            <h2 className="text-2xl font-semibold text-primary">1. Interpretation and Definitions</h2>
            <p>
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h2 className="text-2xl font-semibold text-primary">2. Acknowledgment</h2>
            <p>
              By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms and conditions then you may not access the Service. This is a template and should be reviewed by a legal professional.
            </p>

            <h2 className="text-2xl font-semibold text-primary">3. Our Services</h2>
            <p>
              KAWADY mildsteel consultants Ltd provides expert consultancy services related to mild steel applications, including but not limited to WPS development, failure analysis, and process optimization. The information provided on this website is for general informational purposes only.
            </p>

            <h2 className="text-2xl font-semibold text-primary">4. Intellectual Property</h2>
            <p>
              The Service and its original content, features and functionality are and will remain the exclusive property of KAWADY mildsteel consultants Ltd and its licensors. The Service is protected by copyright, trademark, and other laws of both the Kenya and foreign countries.
            </p>

            <h2 className="text-2xl font-semibold text-primary">5. Limitation of Liability</h2>
            <p>
              In no event shall KAWADY mildsteel consultants Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-2xl font-semibold text-primary">6. Governing Law</h2>
            <p>
              The laws of Kenya, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
            </p>
            
            <h2 className="text-2xl font-semibold text-primary">7. Changes to These Terms and Conditions</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-2xl font-semibold text-primary">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, you can contact us by email at <a href="mailto:kawadymildsteelconsultants@gmail.com" className="text-accent hover:underline">kawadymildsteelconsultants@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
