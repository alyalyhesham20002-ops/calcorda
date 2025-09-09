import React from 'react';
import { useTranslation } from 'react-i18next';
import { LifeBuoy, HelpCircle } from 'lucide-react';

const Help: React.FC = () => {
  const { t } = useTranslation();

  const faqs = [
    { q: t('help_q1'), a: t('help_a1') },
    { q: t('help_q2'), a: t('help_a2') },
    { q: t('help_q3'), a: t('help_a3') },
    { q: t('help_q4'), a: t('help_a4') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <LifeBuoy className="h-10 w-10 text-blue-600 dark:text-blue-400 me-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('page_help_title')}</h1>
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>{t('help_intro')}</p>
        </div>

        <div className="mt-10 space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="flex items-start">
              <HelpCircle className="h-6 w-6 text-blue-500 dark:text-blue-400 me-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{faq.q}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
