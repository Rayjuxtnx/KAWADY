'use server';

import * as z from 'zod';

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

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const validated = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      success: false,
    };
  }

  const { name, email, phone, message } = validated.data;

  // this is the kawady formspree endpoint URL message to be sent
  const FORMSPREE_URL = "https://formspree.io/f/mblqoajv";

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Formspree error:", data);
      return {
        message: "Error sending message. Please try again.",
        success: false,
      };
    }

  } catch (err) {
    console.error("Formspree request error:", err);
    return {
      message: "Network error. Please try again.",
      success: false,
    };
  }

  return {
    message: "Thank you! Your message has been sent successfully and kawady will contact you shortly, see you soon.",
    success: true,
  };
}
