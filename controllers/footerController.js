const Footer = require('../models/Footer');

let cachedFooter = null;
let lastCacheTime = 0;

exports.getFooterData = async () => {
  const now = Date.now();
  const cacheDuration = 15 * 60 * 1000; // 15 minutes cache

  if (cachedFooter && (now - lastCacheTime) < cacheDuration) {
    return cachedFooter;
  }

  try {
    cachedFooter = await Footer.findOne().lean() || {
      foundationName: 'Default Foundation',
      logoUrl: '/images/logo.png',
      address: '123 Default Street, City',
      phone: '+1 (234) 567-8900',
      email: 'contact@foundation.org',
      copyrightText: '© 2023 All Rights Reserved'
    };
    
    lastCacheTime = now;
    return cachedFooter;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return {
      foundationName: 'Foundation',
      logoUrl: '/images/logo.png',
      address: 'Address not available',
      phone: 'Phone not available',
      email: 'Email not available',
      copyrightText: '© 2023 All Rights Reserved'
    };
  }
};