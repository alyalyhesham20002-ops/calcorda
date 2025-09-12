import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator } from '../types';
import { getArticleContent } from '../data/articles';

interface ArticleSectionProps {
  calculator: Calculator;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ calculator }) => {
  const { t } = useTranslation();
  const article = getArticleContent(calculator.id, t);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Complete Guide to the {calculator.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {article.introduction}
        </p>
      </header>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-h3:text-gray-900 dark:prose-h3:text-white prose-h4:text-gray-900 dark:prose-h4:text-white prose-strong:text-gray-900 dark:prose-strong:text-white">
        {article.sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            <div className="leading-relaxed space-y-4">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions (FAQ)</h3>
          <div className="space-y-6">
            {article.faq.map((item, index) => (
              <div key={index} className="border-s-4 border-blue-500 dark:border-blue-400 ps-6">
                <h4 className="font-semibold mb-2">{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export default ArticleSection;
