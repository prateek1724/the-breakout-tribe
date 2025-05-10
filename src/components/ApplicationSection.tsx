import React, { useState } from 'react';
import Button from './Button';

const ApplicationSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    profession: '',
    whyJoin: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-softwhite mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-charcoal border border-gold/30 text-softwhite focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-softwhite mb-2">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-charcoal border border-gold/30 text-softwhite focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-softwhite mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-charcoal border border-gold/30 text-softwhite focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-softwhite mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-charcoal border border-gold/30 text-softwhite focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="profession" className="block text-softwhite mb-2">What Do You Do?</label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-charcoal border border-gold/30 text-softwhite focus:outline-none focus:border-gold"
                    placeholder="Your profession or passion"
                  />
                </div>
                
                <div>
                  <label htmlFor="whyJoin" className="block text-softwhite mb-2">Why do you want to join The Breakout Tribe? (In one line)</label>
                  <input
                    type="text"
                    id="whyJoin"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-charcoal border border-gold/30 text-softwhite focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">
                    Submit Application
                  </Button>
                </div>
              </form>
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

export default ApplicationSection