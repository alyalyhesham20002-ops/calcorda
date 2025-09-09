import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('terms_of_service_title')}</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>{t('terms_of_service_p1')}</p>
          {/* Add more sections as needed */}
          <h3>Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials on Calcorda's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          <h3>Disclaimer</h3>
          <p>The materials on Calcorda's website are provided on an 'as is' basis. Calcorda makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
