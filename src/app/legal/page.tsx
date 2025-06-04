import React from 'react';

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center font-display">Terms of Service & Privacy Policy</h1>

      <div className="bg-surface p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Terms of Service</h2>
          <p className="text-text-secondary leading-relaxed mb-2">
            Welcome to SharEat! These terms and conditions outline the rules and regulations for the use of
            SharEat's Website, located at [Your Website URL].
          </p>
          <p className="text-text-secondary leading-relaxed mb-2">
            By accessing this website we assume you accept these terms and conditions. Do not continue to use
            SharEat if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <p className="text-text-secondary leading-relaxed">
            {/* Placeholder for more detailed terms */}
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
            and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and
            compliant to the Company’s terms and conditions...
            <br /><br />
            <strong>Content Liability:</strong> We shall not be hold responsible for any content that appears on your
            Website. You agree to protect and defend us against all claims that is rising on your Website...
            <br /><br />
            <strong>Reservation of Rights:</strong> We reserve the right to request that you remove all links or any
            particular link to our Website...
          </p>
          <p className="text-text-secondary mt-4">
            <em>[Full Terms of Service content to be added here. This is a placeholder.]</em>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3 mt-8">Privacy Policy</h2>
          <p className="text-text-secondary leading-relaxed mb-2">
            Your privacy is important to us. It is SharEat's policy to respect your privacy regarding any
            information we may collect from you across our website, [Your Website URL], and other sites we own
            and operate.
          </p>
          <p className="text-text-secondary leading-relaxed mb-2">
            We only ask for personal information when we truly need it to provide a service to you. We collect
            it by fair and lawful means, with your knowledge and consent. We also let you know why we’re
            collecting it and how it will be used.
          </p>
          <p className="text-text-secondary leading-relaxed">
            {/* Placeholder for more detailed privacy policy */}
            We only retain collected information for as long as necessary to provide you with your requested
            service. What data we store, we’ll protect within commercially acceptable means to prevent loss and
            theft, as well as unauthorized access, disclosure, copying, use or modification...
            <br /><br />
            Our website may link to external sites that are not operated by us. Please be aware that we have
            no control over the content and practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies.
          </p>
          <p className="text-text-secondary mt-4">
            <em>[Full Privacy Policy content to be added here. This is a placeholder.]</em>
          </p>
        </section>

        <p className="text-sm text-text-tertiary mt-10 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}