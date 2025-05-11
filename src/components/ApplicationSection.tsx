'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  dob: z.string().min(1, { message: 'Date of birth is required.' }),
  phone: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits.' })
    .regex(/^\+?[0-9\s\-()]+$/, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  profession: z.string().min(1, { message: 'Profession is required.' }),
  whyJoin: z.string().min(1, { message: 'Please tell us why you want to join.' }),
});

interface ApplicationSectionProps {
  onBack?: () => void;
}

/**
 * ApplicationSection component displays a form for users to apply to join The Breakout Tribe.
 * Features form validation using Zod schema and displays a success message after submission.
 * 
 * @returns {JSX.Element} The rendered ApplicationSection component
 */
const ApplicationSection: React.FC<ApplicationSectionProps> = ({ onBack }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dob: '',
      phone: '',
      email: '',
      profession: '',
      whyJoin: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', values);
    setFormSubmitted(true);
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback to scrolling if no onBack handler is provided
      const expectationsSection = document.getElementById('expectations');
      if (expectationsSection) {
        expectationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="apply" className="py-20 bg-charcoal">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {!formSubmitted ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-gold text-center">
              Request to Join
            </h2>
            <p className="text-lg text-softwhite text-center mb-10">
              Only a few join each escape — not because it's closed, but because it's carefully opened. If it feels right, don't wait
            </p>
            
            <div className="bg-charcoal border border-gold/30 rounded-lg p-8 md:p-10">
              <h3 className="text-xl font-display font-medium mb-6 text-gold">
                Are you ready to Breakout?
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            pattern="[0-9\s\-+()]+"
                            placeholder="+1 (555) 123-4567"
                            {...field}
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            inputMode="email"
                            placeholder="your.email@example.com"
                            {...field}
                            onBlur={(e) => {
                              field.onBlur();
                              if (e.target.value && !e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                                form.setError('email', { 
                                  type: 'manual', 
                                  message: 'Please enter a valid email address' 
                                });
                              } else if (e.target.value) {
                                form.clearErrors('email');
                              }
                            }}
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                                form.clearErrors('email');
                              }
                            }}
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">What Do You Do?</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your profession or passion"
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="whyJoin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">Why do you want to join The Breakout Tribe? (In one line)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex justify-center gap-4">
                    <Button 
                      variant="ghost" 
                      className="text-gold hover:text-gold/80 hover:bg-transparent flex items-center gap-1"
                      onClick={handleBackClick}
                      type="button"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to expectations</span>
                    </Button>
                    <Button type="submit" variant="goldFilled">
                      SUBMIT APPLICATION
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="flex justify-start mb-6">
              <Button 
                variant="ghost" 
                className="text-gold hover:text-gold/80 hover:bg-transparent p-0 flex items-center gap-1"
                onClick={handleBackClick}
              >
                <ArrowLeft size={16} />
                <span>Back to Escape</span>
              </Button>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-gold">
              Thank you - The Adventure Awaits You.
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationSection;