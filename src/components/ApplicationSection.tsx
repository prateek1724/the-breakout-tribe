'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Search } from 'lucide-react';
import { countries } from 'countries-list';
import PhoneInput from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { City, ICity } from 'country-state-city';

// Convert country code to flag emoji
const getCountryFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Separate the phone validation into a helper function for clarity
const validatePhoneNumber = (value: string): boolean => {
  // Empty check - validation will be handled by required check separately
  if (!value) return false;
  
  // First check with library's isValidPhoneNumber
  if (!isValidPhoneNumber(value)) return false;
  
  // Remove all non-digit characters except leading +
  const cleaned = value.replace(/^\+/, '').replace(/\D/g, '');
  
  // Check digit count (7-15) following E.164 standards
  return cleaned.length >= 7 && cleaned.length <= 15;
};

// Update the schema with clearer validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
  dob: z.string().min(1, { message: 'Date of birth is required.' }),
  phone: z.string()
    .min(1, { message: 'Phone number is required.' })
    .refine(validatePhoneNumber, {
      message: 'Please enter a valid phone number with country code (7-15 digits).'
    }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  linkedin: z.string().url({ message: 'Please enter a valid LinkedIn profile URL.' }),
});

/**
 * ApplicationSection component displays a form for users to apply to join The Breakout Tribe.
 * Features form validation using Zod schema and displays a success message after submission.
 * 
 * @returns {JSX.Element} The rendered ApplicationSection component
 */
const ApplicationSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [cities, setCities] = useState<ICity[]>([]);
  const [countryFilterInput, setCountryFilterInput] = useState("");
  const [cityFilterInput, setCityFilterInput] = useState("");
  const [countryPage, setCountryPage] = useState(0);
  const [cityPage, setCityPage] = useState(0);
  const ITEMS_PER_PAGE = 50;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: '',
      city: '',
      country: '',
      dob: '',
      phone: '',
      email: '',
      linkedin: '',
    },
  });

  // Load cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      const citiesData = City.getCitiesOfCountry(selectedCountry) || [];
      setCities(citiesData);
      
      // Log for debugging
      console.log(`Loading cities for country: ${selectedCountry}`, citiesData);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  // Add memoized filtered data
  const filteredCountries = useMemo(() => {
    return Object.entries(countries).filter(([, country]) => 
      country.name.toLowerCase().includes(countryFilterInput.toLowerCase())
    );
  }, [countryFilterInput]);

  const filteredCities = useMemo(() => {
    return cities.filter(city => 
      city.name.toLowerCase().includes(cityFilterInput.toLowerCase())
    );
  }, [cities, cityFilterInput]);

  // Reset filter values when country changes
  useEffect(() => {
    setCityFilterInput("");
  }, [selectedCountry]);

  // Reset pagination when filters change
  useEffect(() => {
    setCountryPage(0);
  }, [countryFilterInput]);

  useEffect(() => {
    setCityPage(0);
  }, [cityFilterInput]);

  // Reset city page when country changes
  useEffect(() => {
    setCityPage(0);
    setCityFilterInput("");
  }, [selectedCountry]);

  // Create paginated data with memoization
  const paginatedCountries = useMemo(() => {
    const startIndex = countryPage * ITEMS_PER_PAGE;
    return filteredCountries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCountries, countryPage]);

  // Just use the direct filteredCities and pagination
  const paginatedCities = useMemo(() => {
    const startIndex = cityPage * ITEMS_PER_PAGE;
    return filteredCities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCities, cityPage]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submission values:", values);
    try {
      // Format phone with extension if provided
      const formattedValues = {
        ...values,
        phone: values.phone
      };
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        // You can also display an error message to the user here
        return;
      }
  
      // Success path
      console.log('Form submitted successfully');
      setFormSubmitted(true);
    } catch (error) {
      console.error('An error occurred during submission:', error);
      // Optionally show a user-facing error
    }
  };

  // Add ref for search input
  const countrySearchInputRef = useRef<HTMLInputElement>(null);
  const citySearchInputRef = useRef<HTMLInputElement>(null);
  const citySelectTriggerRef = useRef<HTMLButtonElement>(null);

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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-charcoal border border-gold/30">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-softwhite">Country</FormLabel>
                        <Select 
                          value={field.value || ""}
                          onOpenChange={(open) => {
                            // When dropdown opens, focus search input
                            if (open) {
                              setTimeout(() => {
                                if (countrySearchInputRef.current) {
                                  countrySearchInputRef.current.focus();
                                }
                              }, 10);
                            }
                          }}
                          onValueChange={(value) => {
                            console.log("Country selected:", value);
                            field.onChange(value);
                            setSelectedCountry(value as Country);
                            // Reset city when country changes
                            form.setValue('city', '');
                            
                            // Automatically focus city dropdown after country selection
                            setTimeout(() => {
                              if (citySelectTriggerRef.current) {
                                citySelectTriggerRef.current.click();
                              }
                            }, 100);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0">
                              <SelectValue placeholder={field.value ? "" : "Select country"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-charcoal border border-gold/30 max-h-[300px]">
                            <div className="sticky top-0 p-2 bg-charcoal z-10 border-b border-gold/30">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-softwhite/70" />
                                <input 
                                  ref={countrySearchInputRef}
                                  className="w-full bg-charcoal border border-gold/30 py-2 pl-8 pr-3 rounded-md text-softwhite text-sm focus:outline-none focus:border-gold"
                                  placeholder="Search countries..."
                                  value={countryFilterInput}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setCountryFilterInput(e.target.value);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => {
                                    // Prevent the dropdown from capturing these events
                                    e.stopPropagation();
                                  }}
                                  // Fix focus issue by not allowing select component to manage focus
                                  onFocus={(e) => e.stopPropagation()}
                                  onBlur={(e) => e.stopPropagation()}
                                />
                              </div>
                            </div>
                            <div className="overflow-y-auto max-h-[200px]">
                              {filteredCountries.length > 0 ? (
                                <>
                                  {paginatedCountries.map(([code, country]) => (
                                    <SelectItem 
                                      key={code}
                                      value={code}
                                      className="py-1"
                                    >
                                      {getCountryFlagEmoji(code)} {country.name}
                                    </SelectItem>
                                  ))}
                                  {filteredCountries.length > ITEMS_PER_PAGE && (
                                    <div className="flex justify-between items-center p-2 border-t border-gold/30">
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (countryPage > 0) setCountryPage(countryPage - 1);
                                        }}
                                        disabled={countryPage === 0}
                                        className={`text-xs px-2 py-1 rounded ${countryPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold/10'}`}
                                      >
                                        Previous
                                      </button>
                                      <span className="text-xs text-softwhite/70">
                                        Page {countryPage + 1} of {Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)}
                                      </span>
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if ((countryPage + 1) * ITEMS_PER_PAGE < filteredCountries.length) {
                                            setCountryPage(countryPage + 1);
                                          }
                                        }}
                                        disabled={(countryPage + 1) * ITEMS_PER_PAGE >= filteredCountries.length}
                                        className={`text-xs px-2 py-1 rounded ${(countryPage + 1) * ITEMS_PER_PAGE >= filteredCountries.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold/10'}`}
                                      >
                                        Next
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="p-3 text-center text-softwhite/70">
                                  No countries match your search
                                </div>
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-softwhite">City</FormLabel>
                        <Select 
                          value={field.value || ""}
                          onOpenChange={(open) => {
                            // When dropdown opens, focus search input
                            if (open && cities.length > 0) {
                              setTimeout(() => {
                                if (citySearchInputRef.current) {
                                  citySearchInputRef.current.focus();
                                }
                              }, 10);
                            }
                          }}
                          onValueChange={(value) => {
                            console.log("City selected:", value);
                            field.onChange(value);
                          }}
                          disabled={!selectedCountry || cities.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger 
                              ref={citySelectTriggerRef}
                              className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0">
                              <SelectValue placeholder={field.value ? "" : !selectedCountry ? "Select a country first" : cities.length === 0 ? "No cities available" : "Select city"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-charcoal border border-gold/30 max-h-[300px]">
                            {cities.length > 0 && (
                              <>
                                <div className="sticky top-0 p-2 bg-charcoal z-10 border-b border-gold/30">
                                  <div className="relative">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-softwhite/70" />
                                    <input 
                                      ref={citySearchInputRef}
                                      className="w-full bg-charcoal border border-gold/30 py-2 pl-8 pr-3 rounded-md text-softwhite text-sm focus:outline-none focus:border-gold"
                                      placeholder="Search cities..."
                                      value={cityFilterInput}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        setCityFilterInput(e.target.value);
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      onKeyDown={(e) => {
                                        // Prevent the dropdown from capturing these events
                                        e.stopPropagation();
                                      }}
                                      // Fix focus issue by not allowing select component to manage focus
                                      onFocus={(e) => e.stopPropagation()}
                                      onBlur={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                </div>
                                <div className="overflow-y-auto max-h-[200px]">
                                  {filteredCities.length > 0 ? (
                                    <>
                                      {paginatedCities.map((city, index) => {
                                        // Create a guaranteed unique key using page number and index
                                        const absoluteIndex = cityPage * ITEMS_PER_PAGE + index;
                                        
                                        // Create a unique display value that includes state code if available
                                        const displayValue = city.name + (city.stateCode ? `, ${city.stateCode}` : '');
                                        
                                        return (
                                          <SelectItem 
                                            key={`city-item-${absoluteIndex}`}
                                            value={displayValue} // Use the combined name+state as the value
                                            className="py-1"
                                          >
                                            {displayValue}
                                          </SelectItem>
                                        );
                                      })}
                                      {filteredCities.length > ITEMS_PER_PAGE && (
                                        <div className="flex justify-between items-center p-2 border-t border-gold/30">
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (cityPage > 0) setCityPage(cityPage - 1);
                                            }}
                                            disabled={cityPage === 0}
                                            className={`text-xs px-2 py-1 rounded ${cityPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold/10'}`}
                                          >
                                            Previous
                                          </button>
                                          <span className="text-xs text-softwhite/70">
                                            Page {cityPage + 1} of {Math.ceil(filteredCities.length / ITEMS_PER_PAGE)}
                                          </span>
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if ((cityPage + 1) * ITEMS_PER_PAGE < filteredCities.length) {
                                                setCityPage(cityPage + 1);
                                              }
                                            }}
                                            disabled={(cityPage + 1) * ITEMS_PER_PAGE >= filteredCities.length}
                                            className={`text-xs px-2 py-1 rounded ${(cityPage + 1) * ITEMS_PER_PAGE >= filteredCities.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold/10'}`}
                                          >
                                            Next
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="p-3 text-center text-softwhite/70">
                                      No cities match your search
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                            {cities.length === 0 && selectedCountry && (
                              <div className="p-3 text-center text-softwhite/70">
                                No cities available for this country
                              </div>
                            )}
                          </SelectContent>
                        </Select>
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
                          <div className="flex flex-col gap-2">
                            <PhoneInput
                              international
                              countryCallingCodeEditable={true}
                              defaultCountry={selectedCountry}
                              value={field.value}
                              onChange={(value) => {
                                // Set the value
                                const newValue = value || '';
                                field.onChange(newValue);
                                // Don't trigger validation on change
                              }}
                              onBlur={() => {
                                field.onBlur();
                                // Ensure validation on blur
                                form.trigger('phone');
                              }}
                              className={`bg-charcoal border ${form.formState.errors.phone ? 'border-red-500' : 'border-gold/30'} text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md p-2`}
                              placeholder="Enter phone number with country code"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
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
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-softwhite">LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://linkedin.com/in/your-profile"
                            {...field}
                            className="bg-charcoal border border-gold/30 text-softwhite focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex justify-center gap-4">
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