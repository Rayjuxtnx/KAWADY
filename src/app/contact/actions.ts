
'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const quickQuerySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
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

  try {
    console.log('Received contact form data:', validatedFields.data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real application, you would send an email or save to a database here.
  } catch (e) {
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

export async function submitQuickQuery(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = quickQuerySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      success: false,
    };
  }

  try {
    console.log('Received quick query data:', validatedFields.data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real application, you would send an email or save to a database here.
  } catch (e) {
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    }
  }
  
  return {
    message: 'Thank you for your query! We will get back to you shortly.',
    success: true,
  };
}
