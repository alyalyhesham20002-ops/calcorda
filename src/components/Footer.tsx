import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calculator } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: t('page_help'), href: '/help' },
    { name: t('page_feedback'), href: '/feedback' },
    { name: t('page_privacy'), href: '/privacy' },
    { name: t('page_terms'), href: '/terms' },
    { name: t('page_about'), href: '/about' },
    { name: t('page_contact'), href: '/contact' },
    { name: t('page_cookie_policy'), href: '/cookie-policy' },
    { name: t('page_cookie_settings'), href: '/cookie-settings' }
  ];

  return (
    <footer className="bg-gray-800 text-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Calcorda</span>
            </Link>
            <p className="text-gray-400 text-sm">
              {t('dashboard_subtitle')}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">{t('footer_quick_links')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('footer_copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
