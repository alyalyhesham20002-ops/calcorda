import React from 'react';

interface AdSenseAdProps {
  slot: 'top-banner' | 'sidebar' | 'footer-banner';
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ slot, className = '' }) => {
  const adDimensions = {
    'top-banner': 'h-24',
    'sidebar': 'h-96',
    'footer-banner': 'h-20'
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center ${adDimensions[slot]} ${className}`}>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm font-medium">AdSense Placeholder</p>
        <p className="text-xs">{slot}</p>
      </div>
    </div>
  );
};

export default AdSenseAd;
