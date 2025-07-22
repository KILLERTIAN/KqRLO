'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => setShowConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowConsent(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowConsent(false);
    setShowSettings(false);
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: 'Necessary Cookies',
      description: 'Essential for the website to function properly. Cannot be disabled.',
      required: true
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      required: false
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website (Privacy-first analytics only).',
      required: false
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites for marketing purposes. (We don\'t use these)',
      required: false
    }
  ];

  return (
    <AnimatePresence>
      {showConsent && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cookie Consent Banner */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
                {!showSettings ? (
                  // Main consent banner
                  <div>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 p-2 bg-purple-500/20 rounded-lg">
                        <Cookie className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          We Respect Your Privacy
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          We use privacy-first cookies to enhance your experience. Unlike most websites, 
                          we don't track you across the internet or sell your data. You have full control 
                          over what data we collect.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowConsent(false)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleAcceptAll}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                      >
                        Accept All
                      </Button>
                      <Button
                        onClick={handleRejectAll}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Reject All
                      </Button>
                      <Button
                        onClick={() => setShowSettings(true)}
                        variant="ghost"
                        className="text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>

                    {/* Privacy Guarantee */}
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-300 font-medium">
                          Privacy Guarantee: We never sell your data or track you across websites
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Settings panel
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {cookieTypes.map((type) => (
                        <div key={type.id} className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-white mb-1">{type.title}</h4>
                            <p className="text-sm text-gray-300">{type.description}</p>
                          </div>
                          <div className="ml-4">
                            {type.required ? (
                              <div className="px-3 py-1 bg-gray-600 rounded-full text-xs text-gray-300">
                                Required
                              </div>
                            ) : (
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferences[type.id as keyof typeof preferences]}
                                  onChange={(e) => setPreferences(prev => ({
                                    ...prev,
                                    [type.id]: e.target.checked
                                  }))}
                                  className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleSavePreferences}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                      >
                        Save Preferences
                      </Button>
                      <Button
                        onClick={() => setShowSettings(false)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}