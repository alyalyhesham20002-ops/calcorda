import React, { useEffect, Suspense, lazy, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { calculators as calculatorData } from '../data/calculators';
import { getArticleContent } from '../data/articles';
import { Calculator } from '../types';
import AdSenseAd from './AdSenseAd';
import ArticleSection from './ArticleSection';
import DisclaimerSection from './DisclaimerSection';
import LoadingSpinner from './LoadingSpinner';
import SchemaInjector from './SchemaInjector';
import Meta from './Meta';
import Breadcrumbs from './Breadcrumbs';
import RelatedCalculators from './RelatedCalculators';

const calculatorComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'bmi': lazy(() => import('./calculators/BMICalculator')),
  'calories': lazy(() => import('./calculators/CalorieCalculator')),
  'bmr': lazy(() => import('./calculators/BMRCalculator')),
  'body-fat': lazy(() => import('./calculators/BodyFatCalculator')),
  'macro': lazy(() => import('./calculators/MacroCalculator')),
  'water-intake': lazy(() => import('./calculators/WaterIntakeCalculator')),
  'ideal-weight': lazy(() => import('./calculators/IdealWeightCalculator')),
  'heart-rate': lazy(() => import('./calculators/HeartRateCalculator')),
  'blood-pressure': lazy(() => import('./calculators/BloodPressureCalculator')),
  'sleep': lazy(() => import('./calculators/SleepCalculator')),
  'pregnancy': lazy(() => import('./calculators/PregnancyCalculator')),
  'due-date': lazy(() => import('./calculators/DueDateCalculator')),
  'ovulation': lazy(() => import('./calculators/OvulationCalculator')),
  'menstrual-cycle': lazy(() => import('./calculators/MenstrualCycleCalculator')),
  'baby-growth': lazy(() => import('./calculators/BabyGrowthCalculator')),
  'age': lazy(() => import('./calculators/AgeCalculator')),
  'date-difference': lazy(() => import('./calculators/DateDifferenceCalculator')),
  'baby-name-generator': lazy(() => import('./calculators/BabyNameGenerator')),
  'password-generator': lazy(() => import('./calculators/PasswordGenerator')),
  'random-number': lazy(() => import('./calculators/RandomNumberGenerator')),
  'text-case-converter': lazy(() => import('./calculators/TextCaseConverter')),
  'word-counter': lazy(() => import('./calculators/WordCounter')),
  'character-counter': lazy(() => import('./calculators/CharacterCounter')),
  'currency-converter': lazy(() => import('./calculators/CurrencyConverter')),
};

const CalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  const { calculatorId } = useParams<{ calculatorId: string }>();

  const calculator: (Calculator & { seoTitle: string; seoDescription: string }) | undefined = useMemo(() => {
    const calcData = calculatorData.find(c => c.id === calculatorId);
    if (!calcData) return undefined;
    const idKey = calcData.id.replace(/-/g, '_');
    return {
      ...calcData,
      name: t(`calculator_${idKey}_name`),
      description: t(`calculator_${idKey}_desc`),
      category: t(calcData.categoryKey),
      seoTitle: t(`calculator_${idKey}_seo_title`),
      seoDescription: t(`calculator_${idKey}_seo_desc`),
    };
  }, [calculatorId, t]);

  const article = useMemo(() => {
    if (!calculatorId) return null;
    return getArticleContent(calculatorId, t);
  }, [calculatorId, t]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [calculatorId]);

  const CalculatorComponent = useMemo(() => {
    if (!calculatorId || !calculatorComponents[calculatorId]) {
      return null;
    }
    return calculatorComponents[calculatorId];
  }, [calculatorId]);

  if (!calculator || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Meta title={t('calculator_not_found')} description="The calculator you are looking for could not be found." />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('calculator_not_found')}</h1>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center">
          <ArrowLeft className="h-4 w-4 me-2" />
          {t('back_to_dashboard')}
        </Link>
      </div>
    );
  }

  const isMedicalTool = calculator.categoryKey === 'header_health' || calculator.categoryKey === 'header_pregnancy';
  const articleBodyForSchema = article.sections.map(s => s.content.join(' ')).join(' ');

  const breadcrumbItems = [
    { name: t('header_home'), path: '/' },
    { name: calculator.category, path: `/#${calculator.categoryKey.replace('header_', '')}` },
    { name: calculator.name, path: `/calculator/${calculator.id}` },
  ];

  return (
    <>
      <Meta
        title={calculator.seoTitle}
        description={calculator.seoDescription}
        canonicalUrl={`/calculator/${calculator.id}`}
      />
      <SchemaInjector 
        calculatorName={calculator.name}
        calculatorDescription={calculator.seoDescription}
        faq={article.faq}
        articleBody={articleBodyForSchema}
        breadcrumbs={breadcrumbItems}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <AdSenseAd slot="top-banner" className="mb-8" />
            <Breadcrumbs items={breadcrumbItems} />
            <header className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="flex items-center mb-4">
                <calculator.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 me-4" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{calculator.name} {t('calculator_suffix')}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{calculator.description}</p>
                </div>
              </div>
            </header>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 sr-only">Interactive Calculator</h2>
              <Suspense fallback={<LoadingSpinner />}>
                {CalculatorComponent ? <CalculatorComponent /> : <p className="text-red-500">{t('error_loading_calculator')}</p>}
              </Suspense>
            </section>
            {isMedicalTool && <DisclaimerSection />}
            <ArticleSection calculator={calculator} />
            <RelatedCalculators currentCalculatorId={calculator.id} categoryKey={calculator.categoryKey} />
          </div>
          <aside className="lg:col-span-1">
            <AdSenseAd slot="sidebar" className="sticky top-24" />
          </aside>
        </div>
        <AdSenseAd slot="footer-banner" className="mt-12" />
      </div>
    </>
  );
};

export default CalculatorPage;
