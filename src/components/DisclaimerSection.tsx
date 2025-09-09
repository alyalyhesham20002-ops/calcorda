import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DisclaimerSection: React.FC = () => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-6 mb-8">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 me-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Medical Disclaimer</h3>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
            This calculator is for informational and educational purposes only. The results should not be used as 
            a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified 
            healthcare provider regarding any medical condition or before making any healthcare decisions. Individual 
            results may vary, and this tool does not guarantee accuracy for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerSection;
