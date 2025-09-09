import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('privacy_policy_title')}</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>{t('privacy_policy_p1')}</p>
          {/* Add more sections as needed */}
          <h3>Information We Collect</h3>
          <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.</p>
          <h3>How We Use Collected Information</h3>
          <p>Calcorda may collect and use Users personal information for the following purposes: To improve customer service, to personalize user experience, and to send periodic emails.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
