
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
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            <BlueprintBackground />
            <div className="container max-w-7xl relative">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Get In Touch</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                    Have a project in mind or need expert advice? We're here to help. Reach out to us through the form below or contact us directly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <CardHeader>
                            <CardTitle className="text-primary">Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} action={formAction} className="space-y-6">
                                <div className="space-y-2 group">
                                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                                  <Input id="name" name="name" placeholder="John Doe" required className="glow-input" />
                                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                                </div>
                                <div className="space-y-2 group">
                                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="glow-input" />
                                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                                </div>
                                <div className="space-y-2 group">
                                  <label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</label>
                                  <Input id="phone" name="phone" placeholder="+254 722 659 260" className="glow-input" />
                                </div>
                                <div className="space-y-2 group">
                                  <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                                  <Textarea id="message" name="message" placeholder="Tell us about your project..." className="min-h-[120px] glow-input" required />
                                  {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
                                </div>
                                <SubmitButton />
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-card/80 backdrop-blur-sm border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <CardHeader>
                                <CardTitle className="text-primary">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary">Office Address</h3>
                                        <p>123 Construction Ave, Metropolis, USA 12345</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary">Phone</h3>
                                        <p>+254 722 659 260</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary">Email</h3>
                                        <p>contact@kawady.com</p>
                                    </div>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
                                    <a href="https://wa.me/254722659260" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                          <path d="M16.75 13.96c.25.13.41.2.52.34.11.14.15.31.15.48 0 .44-.13.83-.4 1.15-.27.32-.62.56-1.04.72-.42.16-.91.24-1.46.24-.96 0-1.84-.21-2.65-.63a11.13 11.13 0 01-3.6-3.6c-.42-.81-.63-1.7-.63-2.65 0-.55.08-.96.24-1.28.16-.32.4-.56.72-.72.32-.27.71-.4 1.15-.4.17 0 .34.04.48.15.14.11.21.27.34.52l.44 1.05c.13.25.2.43.2.56 0 .17-.04.32-.12.45l-.48.48c-.08.08-.12.18-.12.28 0 .03.01.07.03.1.02.03.05.07.09.12s.1.1.15.17c.36.48.79.91 1.28 1.28.07.05.12.09.17.15.02.03.05.06.07.08.1.04.2.04.28-.04l.48-.48c.13-.13.28-.2.45-.2.13 0 .3.07.56.2l1.05.44zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-8 3.59 8-8z"></path>
                                        </svg>
                                        Chat on WhatsApp
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/80 backdrop-blur-sm border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                          <CardHeader>
                              <CardTitle className="text-primary">Our Location</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="aspect-video rounded-lg overflow-hidden">
                                  <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.628876435343!2d-74.00834228459424!3d40.74819297932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf3c3937c3%3A0x59f5b24b75957e2a!2sMetropolis%2C%20IL%2C%20USA!5e0!3m2!1sen!2s!4v1627885920361!5m2!1sen!2s"
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
                        <Card className="bg-card/80 backdrop-blur-sm border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <CardHeader>
                                <CardTitle className="text-primary">Business Hours</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
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
