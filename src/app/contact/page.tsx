
import type { Metadata } from 'next';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact Us - Get a Quote for Steel Consultancy',
  description: 'Reach out to KAWADY Mildsteel Consultants Ltd for project inquiries, quotes, or questions about our fabrication and welding services. We are ready to help you.',
};

export default function ContactPage() {
    return <ContactForm />;
}
