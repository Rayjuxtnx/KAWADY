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
    } else if (!state.success && state.message && !state.errors) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state.message,
      });
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
                                  <Input id="name" name="name" placeholder="Your Name" required className="glow-input text-sm" autoComplete="name" />
                                  {state.errors?.name && <p className="text-xs font-medium text-destructive">{state.errors.name[0]}</p>}
                                </div>
                                <div className="space-y-1 group">
                                  <label htmlFor="email" className="text-xs font-medium">Email Address</label>
                                  <Input id="email" name="email" type="email" placeholder="youremail@example.com" required className="glow-input text-sm" autoComplete="email" />
                                  {state.errors?.email && <p className="text-xs font-medium text-destructive">{state.errors.email[0]}</p>}
                                </div>
                                <div className="space-y-1 group">
                                  <label htmlFor="phone" className="text-xs font-medium">Phone Number (Optional)</label>
                                  <Input id="phone" name="phone" placeholder="+254 722 659 260" className="glow-input text-sm" autoComplete="tel" />
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
                        <Card className="bg-card/30 backdrop-blur-xl border-accent/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-lg">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 text-muted-foreground">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-primary text-sm">Office Address</h3>
                                        <p className="text-xs">Kariobangi Light Industries, Outering Road, Nairobi</p>
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
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm" asChild>
                                    <a href="tel:+254722659260">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call Us Now
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
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.840998394622!2d36.8845233152621!3d-1.267866999052528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f144131558e6d%3A0x1d585a73a7f4553f!2sKariobangi%20Light%20Industries!5e0!3m2!1sen!2ske!4v1627885920361!5m2!1sen!2ske"
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
    
    

    
