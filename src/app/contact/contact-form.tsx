
"use client";

import React, { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SubmitButton } from './submit-button';
import { BlueprintBackground } from '@/components/layout/blueprint-background';

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

const initialState: FormState = {
  message: '',
  errors: undefined,
  success: false,
};

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (!state.success && state.message && state.errors) {
      // This toast can show a generic error if specific field errors are already displayed
    }
  }, [state, toast]);

  return (
    <div className="fade-in">
        <section className="py-12 md:py-20 bg-transparent relative overflow-hidden">
            <BlueprintBackground />
            <div className="container max-w-7xl relative px-4 flex flex-col items-center">
                <div className="text-center mb-10 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary">Get In Touch</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-muted-foreground text-sm">
                    Have a project in mind or need expert advice? We're here to help. Reach out to us through the form below or contact us directly.
                    </p>
                </div>

                <div className="w-full grid lg:grid-cols-2 gap-8 md:gap-12">
                    <Card className="shadow-lg bg-card/50 backdrop-blur-lg border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-xl">Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                            <form ref={formRef} action={formAction} className="space-y-4">
                                <div className="space-y-1 group">
                                  <label htmlFor="name" className="text-xs font-medium">Full Name</label>
                                  <Input id="name" name="name" placeholder="John Doe" required className="glow-input text-sm" />
                                  {state.errors?.name && <p className="text-xs font-medium text-destructive">{state.errors.name[0]}</p>}
                                </div>
                                <div className="space-y-1 group">
                                  <label htmlFor="email" className="text-xs font-medium">Email Address</label>
                                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="glow-input text-sm" />
                                  {state.errors?.email && <p className="text-xs font-medium text-destructive">{state.errors.email[0]}</p>}
                                </div>
                                <div className="space-y-1 group">
                                  <label htmlFor="phone" className="text-xs font-medium">Phone Number (Optional)</label>
                                  <Input id="phone" name="phone" placeholder="+254 722 659 260" className="glow-input text-sm" />
                                </div>
                                <div className="space-y-1 group">
                                  <label htmlFor="message" className="text-xs font-medium">Your Message</label>
                                  <Textarea id="message" name="message" placeholder="Tell us about your project..." className="min-h-[80px] glow-input text-sm" required />
                                  {state.errors?.message && <p className="text-xs font-medium text-destructive">{state.errors.message[0]}</p>}
                                </div>
                                <SubmitButton />
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-4 flex flex-col">
                        <Card className="bg-card/50 backdrop-blur-lg border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-lg">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 text-muted-foreground">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary text-sm">Office Address</h3>
                                        <p className="text-xs">123 Construction Ave, Nairobi, Kenya</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary text-sm">Phone</h3>
                                        <a href="tel:+254722659260" className="hover:text-accent transition-colors text-xs">+254 722 659 260</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary text-sm">Email</h3>
                                        <a href="mailto:kawadymildsteelconsultants@gmail.com" className="hover:text-accent transition-colors text-xs">kawadymildsteelconsultants@gmail.com</a>
                                    </div>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm" asChild>
                                    <a href="https://wa.me/254722659260" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                          <path d="M16.75 13.96c.25.13.41.2.52.34.11.14.15.31.15.48 0 .44-.13.83-.4 1.15-.27.32-.62.56-1.04.72-.42.16-.91.24-1.46.24-.96 0-1.84-.21-2.65-.63a11.13 11.13 0 01-3.6-3.6c-.42-.81-.63-1.7-.63-2.65 0-.55.08-.96.24-1.28.16-.32.4-.56.72-.72.32-.27.71-.4 1.15-.4.17 0 .34.04.48.15.14.11.21.27.34.52l.44 1.05c.13.25.2.43.2.56 0 .17-.04.32-.12.45l-.48.48c-.08.08-.12.18-.12.28 0 .03.01.07.03.1.02.03.05.07.09.12s.1.1.15.17c.36.48.79.91 1.28 1.28.07.05.12.09.17.15.02.03.05.06.07.08.1.04.2.04.28-.04l.48-.48c.13-.13.28-.2.45-.2.13 0 .3.07.56.2l1.05.44zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-8 3.59 8-8z"></path>
                                        </svg>
                                        Chat on WhatsApp
                                    </a>
                                 </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-lg border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex-grow flex flex-col">
                          <CardHeader className="p-4 sm:p-6">
                              <CardTitle className="text-lg">Our Location</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 flex-grow">
                              <div className="aspect-[4/3] rounded-b-lg overflow-hidden h-full">
                                  <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.3585374492!2d36.70735522776831!3d-1.302861244342533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1627885920361!5m2!1sen!2ske"
                                      width="100%"
                                      height="100%"
                                      style={{ border: 0 }}
                                      allowFullScreen={true}
                                      loading="lazy"
                                      referrerPolicy="no-referrer-when-downgrade"
                                  ></iframe>
                              </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-lg border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-lg">Business Hours</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 text-muted-foreground text-xs">
                                <p><span className="font-semibold text-primary">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                                <p><span className="font-semibold text-primary">Saturday - Sunday:</span> Closed</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}

    