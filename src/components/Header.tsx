import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calculator, Settings, Sun, Moon, Globe, BarChart2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeProvider';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: 'en' | 'ar') => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setIsMenuOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Calcorda</span>
          </Link>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('header_home')}
              </Link>
              <a href="/#health" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('header_health')}
              </a>
              <a href="/#pregnancy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('header_pregnancy')}
              </a>
              <a href="/#tools" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('header_tools')}
              </a>
            </nav>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="h-6 w-6" />
              </button>
              {isMenuOpen && (
                <div className="absolute end-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  <Link to="/analytics" className="w-full text-start flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BarChart2 className="h-4 w-4" />
                    <span>{t('header_analytics')}</span>
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{t('settings_theme')}</div>
                  <button onClick={toggleTheme} className="w-full text-start flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span>{theme === 'light' ? t('theme_dark') : t('theme_light')}</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{t('settings_language')}</div>
                  <button onClick={() => changeLanguage('en')} className="w-full text-start flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Globe className="h-4 w-4" />
                    <span>English</span>
                  </button>
                  <button onClick={() => changeLanguage('ar')} className="w-full text-start flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Globe className="h-4 w-4" />
                    <span>العربية</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
