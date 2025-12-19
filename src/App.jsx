import { useState } from 'react';
import { supabase } from './supabase';
import backgroundImage from './assets/background.png';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    if (supabase) {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);
      if (error) console.error('Supabase error:', error);
    } else {
      // Fallback for when Supabase is not configured
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-gray-100 selection:bg-white/30">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay - slightly darker for better text contrast on split layout */}
      <div className="absolute inset-0 z-0 bg-black/70" />

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Column: Content & Manifesto */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div>
              <span className="inline-block  px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase text-gray-300 backdrop-blur-sm">
                OpenWorldMBA.com
              </span>
            </div>

            <h1 className="font-instrument text-5xl font-normal leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              MBA thinking, <br className="hidden lg:block" />
              learned in the open.
            </h1>

            <div className="space-y-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
              <p>
                A public knowledge project for <span className="text-white">engineers, founders, and operators</span>. 
                We break down core business concepts and apply them to tech and media through clear analysis.
              </p>
              <p className="hidden sm:block">
                No credentials. No academic theater. Just practical thinking on how decisions are made, how money flows, and how incentives shape outcomes.
              </p>
            </div>

            {/* Social Links (Desktop placement) */}
            <div className="hidden items-center justify-center space-x-6 lg:justify-start lg:flex">
              <SocialLink href="https://www.linkedin.com/company/openworldmba/" icon={<LinkedInIcon />} label="LinkedIn" />
              <SocialLink href="https://twitter.com/openworldmba" icon={<TwitterIcon />} label="Twitter" />
            </div>
          </div>

          {/* Right Column: Signup Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:scale-[1.01] sm:p-10">
              
              <div className="mb-6">
                <h2 className="font-instrument text-2xl text-white">Subscribe to our newsletter</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Get notified when we start.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="group relative">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-white/30 focus:bg-white/10 focus:ring-0 group-hover:border-white/20"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Notify me
                  </button>
                  
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Signal, not noise. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="animate-fade-in flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 p-8 text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <CheckIcon />
                  </div>
                  <h3 className="mb-1 font-instrument text-xl text-white">You're on the list.</h3>
                  <p className="text-sm text-gray-400">
                    We'll be in touch soon. In the meantime, <a href="https://www.linkedin.com/company/openworldmba/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-gray-200 hover:decoration-white">check our LinkedIn</a>.
                  </p>
                </div>
              )}

              {/* Social Links (Mobile placement) */}
              <div className="mt-8 flex items-center justify-center space-x-6 border-t border-white/5 pt-6 lg:hidden">
                <SocialLink href="https://www.linkedin.com/company/openworldmba/" icon={<LinkedInIcon />} label="LinkedIn" />
                <SocialLink href="https://twitter.com/openworldmba" icon={<TwitterIcon />} label="Twitter" />
                <SocialLink href="https://openworldmba.substack.com/" icon={<SubstackIcon />} label="Substack" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code

function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 transition-colors hover:text-white hover:scale-110 transform duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

// Icons (SVGs)

function LinkedInIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default App;
