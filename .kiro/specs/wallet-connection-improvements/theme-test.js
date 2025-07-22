// Theme Switching Test Script
// This script can be run in the browser console to test theme switching functionality

function testThemeSwitching() {
  console.log('Starting theme switching test...');
  
  // Test 1: Check if theme is properly initialized from localStorage
  const initialTheme = localStorage.getItem('theme') || 'dark';
  console.log(`Initial theme from localStorage: ${initialTheme}`);
  const isDarkClass = document.documentElement.classList.contains('dark');
  console.log(`Document has 'dark' class: ${isDarkClass}`);
  console.assert(
    (initialTheme === 'dark' && isDarkClass) || (initialTheme === 'light' && !isDarkClass),
    'Theme initialization test failed: localStorage theme does not match document class'
  );
  
  // Test 2: Find the theme switcher button
  const themeSwitcherButton = document.querySelector('[aria-label^="Switch to"]');
  console.log(`Theme switcher button found: ${!!themeSwitcherButton}`);
  console.assert(themeSwitcherButton, 'Theme switcher button not found');
  
  if (themeSwitcherButton) {
    // Test 3: Click the theme switcher button and check if theme changes
    const initialIsDark = document.documentElement.classList.contains('dark');
    console.log(`Before click - Dark mode: ${initialIsDark}`);
    
    // Click the button
    themeSwitcherButton.click();
    
    // Check if theme changed
    const afterClickIsDark = document.documentElement.classList.contains('dark');
    console.log(`After click - Dark mode: ${afterClickIsDark}`);
    console.assert(
      initialIsDark !== afterClickIsDark,
      'Theme did not toggle after clicking the theme switcher button'
    );
    
    // Test 4: Check if localStorage was updated
    const newTheme = localStorage.getItem('theme');
    console.log(`New theme in localStorage: ${newTheme}`);
    console.assert(
      (newTheme === 'dark' && afterClickIsDark) || (newTheme === 'light' && !afterClickIsDark),
      'localStorage theme does not match document class after toggle'
    );
    
    // Test 5: Check if Connect Wallet button styling updated
    const connectWalletButton = document.querySelector('button:contains("Connect Wallet")');
    if (connectWalletButton) {
      console.log('Connect Wallet button found, checking styling...');
      const computedStyle = window.getComputedStyle(connectWalletButton);
      console.log(`Button background color: ${computedStyle.backgroundColor}`);
      console.log(`Button text color: ${computedStyle.color}`);
    } else {
      console.log('Connect Wallet button not found or user is already connected');
    }
    
    // Reset to original theme for convenience
    themeSwitcherButton.click();
    console.log(`Reset to original theme: ${initialIsDark ? 'dark' : 'light'}`);
  }
  
  console.log('Theme switching test completed');
}

// Run the test
testThemeSwitching();