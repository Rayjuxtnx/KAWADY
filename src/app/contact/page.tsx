import type { Metadata } from 'next';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach out to Kawida for project inquiries, quotes, or any questions. We are ready to help you build your vision.',
};

export default function ContactPage() {
    return <ContactForm />;
}
