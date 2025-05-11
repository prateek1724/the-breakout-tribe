'use client';

import React from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
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

const options = [
  "I want to meet people who just get it",
  "I&apos;ve been craving deep, off-script conversations",
  "I want to be surprised by who I connect with",
  "I&apos;m looking for something I&apos;ll still talk about 10 years from now",
  "I&apos;m curious where the right people + the right setting can take me",
  "I want to share energy with others who move the same way I do",
  "I&apos;ve had success — now I want substance",
  "I want to disconnect from noise and reconnect with what matters",
  "I want to be in a room (or on a cliff) with people who challenge and inspire me",
];

const formSchema = z.object({
  expectations: z.array(z.string())
    .min(2, { message: 'Please select at least 2 options.' })
    .max(3, { message: 'Please select no more than 3 options.' })
});

/**
 * Props for the EscapeExpectationsSection component
 */
interface EscapeExpectationsSectionProps {
  /**
   * Callback function triggered when user clicks the NEXT button
   * @param {string[]} expectations - Array of selected expectation options
   */
  onNext: (expectations: string[]) => void;
  
  /**
   * Previously selected expectations to pre-populate the form
   * Used when returning from the application section to maintain state
   */
  initialExpectations?: string[];
}

/**
 * EscapeExpectationsSection component displays a form for users to select what they&apos;re looking for from the escape.
 * Features form validation using Zod schema and allows selecting 2-3 options.
 * Maintains state when navigating back from the application form.
 * 
 * @param {object} props - Component props
 * @param {function} props.onNext - Function called when user submits the form
 * @param {string[]} props.initialExpectations - Previously selected options to restore state
 * @returns {JSX.Element} The rendered EscapeExpectationsSection component
 */
const EscapeExpectationsSection: React.FC<EscapeExpectationsSectionProps> = ({ onNext, initialExpectations = [] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expectations: initialExpectations,
    },
  });

  /**
   * Handles form submission
   * Passes the selected expectations to the parent component
   * 
   * @param {object} values - Form values containing the selected expectations
   */
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Selected expectations:', values);
    onNext(values.expectations);
  };

  // Get current selected values
  const selectedValues = form.watch('expectations') || [];
  /**
   * Flag indicating whether the maximum number of selections (3) has been reached
   * Used to disable unselected checkboxes when the limit is reached
   */
  const maxSelectionsReached = selectedValues.length >= 3;

  return (
    <section id="expectations" className="py-20 bg-charcoal">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-gold text-center">
            What Are You Really Looking For From This Escape?
          </h2>
          <p className="text-lg text-softwhite text-center mb-10">
            (Pick any 2-3)
          </p>
          
          <div className="bg-charcoal border border-gold/30 rounded-lg p-8 md:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="expectations"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 gap-4">
                        {options.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="expectations"
                            render={({ field }) => {
                              /**
                               * Determines if this option is currently selected in the form
                               * Used to control the checked state of the checkbox
                               */
                              const isSelected = field.value?.includes(option);
                              
                              /**
                               * Determines if this checkbox should be disabled
                               * Disables unselected checkboxes when maximum selections (3) is reached
                               */
                              const isDisabled = maxSelectionsReached && !isSelected;
                              
                              return (
                                <FormItem
                                  key={option}
                                  className={`flex flex-row items-start space-x-3 space-y-0 border border-gold/30 rounded-md p-4 transition-colors ${
                                    isDisabled 
                                      ? 'opacity-50 cursor-not-allowed' 
                                      : 'hover:border-gold cursor-pointer'
                                  }`}
                                >
                                  <FormControl>
                                    {/**
                                     * Checkbox component for selecting expectation options
                                     * - Checked state reflects whether the option is currently selected
                                     * - Disabled when max selections (3) is reached and this option is not selected
                                     * - When checked, adds the option to the expectations array
                                     * - When unchecked, removes the option from the expectations array
                                     */}
                                    <Checkbox
                                      checked={isSelected}
                                      disabled={isDisabled}
                                      onCheckedChange={
                                        /**
                                         * Handler for checkbox state changes
                                         * @param {boolean | 'indeterminate'} checked - The new checked state
                                         * @returns {void} Updates the form field value
                                         */
                                        (checked: boolean | 'indeterminate') => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className={`font-normal cursor-pointer ${isDisabled ? 'text-softwhite/50' : 'text-softwhite'}`}>
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 flex justify-center">
                  <Button type="submit" variant="goldFilled" className="w-full md:w-auto">
                    NEXT
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EscapeExpectationsSection; 