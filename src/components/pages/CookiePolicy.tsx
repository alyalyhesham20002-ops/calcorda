import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie } from 'lucide-react';
import Meta from '../Meta';

const CookiePolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Meta
        title={t('page_cookie_policy_title')}
        description={t('cookie_policy_p1')}
        canonicalUrl="/cookie-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <Cookie className="h-8 w-8 text-blue-600 dark:text-blue-400 me-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('page_cookie_policy_title')}</h1>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{t('cookie_policy_p1')}</p>
            <h3>{t('cookie_policy_h1')}</h3>
            <p>{t('cookie_policy_p2')}</p>
            <h3>{t('cookie_policy_h2')}</h3>
            <p>{t('cookie_policy_p3')}</p>
            <ul>
              <li><strong>{t('cookie_policy_l1_strong')}</strong> {t('cookie_policy_l1_text')}</li>
              <li><strong>{t('cookie_policy_l2_strong')}</strong> {t('cookie_policy_l2_text')}</li>
            </ul>
            <h3>{t('cookie_policy_h3')}</h3>
            <p>{t('cookie_policy_p4')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
