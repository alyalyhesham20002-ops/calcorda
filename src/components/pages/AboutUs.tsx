import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('about_us_title')}</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>{t('about_us_p1')}</p>
          <p>{t('about_us_p2')}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
