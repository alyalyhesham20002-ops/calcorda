import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, CheckCircle } from 'lucide-react';
import Meta from '../Meta';

const CookieSettings: React.FC = () => {
  const { t } = useTranslation();
  const [cleared, setCleared] = useState(false);

  const handleClearSettings = () => {
    localStorage.removeItem('theme');
    localStorage.removeItem('i18nextLng');
    setCleared(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <Meta
        title={t('page_cookie_settings_title')}
        description={t('cookie_settings_intro')}
        canonicalUrl="/cookie-settings"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <SlidersHorizontal className="h-8 w-8 text-blue-600 dark:text-blue-400 me-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('page_cookie_settings_title')}</h1>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{t('cookie_settings_intro')}</p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('cookie_settings_h1')}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{t('cookie_settings_p1')}</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>{t('cookie_settings_l1')}</li>
                <li>{t('cookie_settings_l2')}</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t('cookie_settings_note')}</p>
              
              <div className="mt-6">
                <button 
                  onClick={handleClearSettings}
                  disabled={cleared}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {t('cookie_settings_button')}
                </button>
                {cleared && (
                  <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 me-2" />
                    <span>{t('cookie_settings_cleared')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieSettings;
