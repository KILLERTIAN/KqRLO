# Design Document

## Overview

This design document outlines the approach for improving the wallet connection functionality in the application. The improvements focus on three main areas:

1. Updating the Connect Wallet button to use a blue color scheme
2. Ensuring the Connect Wallet interface uses the application's custom theme
3. Fixing the theme switcher functionality

The design will maintain the existing functionality while enhancing the visual consistency and user experience.

## Architecture

The application uses Next.js with React for the frontend, with the following key components involved in this feature:

- **XConnectButton**: The main component responsible for wallet connection functionality
- **RainbowKit**: The library used for wallet connection UI
- **Theme System**: The application uses a custom theme system with CSS variables and Tailwind CSS

The architecture will remain unchanged, but we will modify the styling and theme integration to meet the requirements.

## Components and Interfaces

### XConnectButton Component

The XConnectButton component will be updated to:

1. Use blue color scheme for the Connect Wallet button
2. Properly integrate with the application's theme system
3. Remove unused variables and functions

```tsx
// Updated XConnectButton.tsx (conceptual)
'use client';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { ethers } from 'ethers';
import { zkIdentityAddress, zkIdentityAbi } from '../app/contracts/zkIdentity';
import { CheckCircle } from 'lucide-react';

export function XConnectButton() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isVerified, setIsVerified] = useState(false);

  const checkVerification = useCallback(async () => {
    // Existing verification check logic
  }, [address, publicClient]);

  useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openChainModal,
          openConnectModal,
          openAccountModal,
          mounted
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <motion.button
                      onClick={openConnectModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40">
                      Connect Wallet
                    </motion.button>
                  );
                }
                // Rest of the component remains the same
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </motion.div>
  );
}
```

### Theme Switcher Component

A new theme switcher component will be created to toggle between light and dark modes:

```tsx
// ThemeSwitcher.tsx (conceptual)
'use client';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
```

## Data Models

No changes to data models are required for this feature.

## Theme Integration

The application uses CSS variables for theming, with light and dark mode variants. The Connect Wallet button will use these variables to ensure consistent styling:

```css
/* Example of theme variables used */
:root {
  --primary: #3B82F6; /* Blue */
  --primary-foreground: #FFFFFF; /* White text on primary */
}

.dark {
  --primary: #58A6FF; /* Soft Blue */
  --primary-foreground: #0D1117; /* Very Dark Navy */
}
```

The Connect Wallet button will use these variables to ensure it matches the application's theme:

```tsx
// Example of using theme variables
<button className="bg-primary text-primary-foreground">Connect Wallet</button>
```

## Error Handling

No changes to error handling are required for this feature.

## Testing Strategy

### Unit Testing

1. Test that the XConnectButton renders correctly with the blue color scheme
2. Test that the ThemeSwitcher correctly toggles between light and dark modes
3. Test that the theme preference is saved to localStorage

### Integration Testing

1. Test that the XConnectButton updates its appearance when the theme is changed
2. Test that all components update consistently when the theme is changed

### Manual Testing

1. Verify that the Connect Wallet button has the correct blue color scheme in both light and dark modes
2. Verify that the theme switcher correctly toggles between light and dark modes
3. Verify that the theme preference is remembered when the page is reloaded