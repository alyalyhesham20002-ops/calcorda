import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react';

const SendFeedback: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-4">
          <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400 me-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('page_feedback_title')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{t('feedback_intro')}</p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('feedback_type')}</label>
            <select id="feedback-type" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>{t('feedback_type_suggestion')}</option>
              <option>{t('feedback_type_bug')}</option>
              <option>{t('feedback_type_praise')}</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact_form_email')} ({t('optional')})</label>
            <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact_form_message')}</label>
            <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {t('feedback_submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendFeedback;
