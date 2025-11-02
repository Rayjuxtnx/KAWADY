
'use server';

import * as z from 'zod';
import { Resend } from 'resend';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    phone?: string[];
  };
  success: boolean;
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      success: false,
    };
  }

  const { name, email, phone, message } = validatedFields.data;

  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API key is not configured.');
    return {
      message: 'The email service is not configured. Please contact the site administrator.',
      success: false,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['kawadymildsteelconsultants@gmail.com'],
      subject: `New Message from ${name} via KAWADY Website`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        message: 'An unexpected error occurred while sending the email. Please try again.',
        success: false,
      }
    }

  } catch (e) {
    console.error('Email sending error:', e);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    }
  }
  
  return {
    message: 'Thank you for your message! We will get back to you shortly.',
    success: true,
  };
}
