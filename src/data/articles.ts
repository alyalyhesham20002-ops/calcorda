import { TFunction } from 'i18next';

interface ArticleContent {
  introduction: string;
  sections: {
    title: string;
    content: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const getArticleContent = (calculatorId: string, t: TFunction): ArticleContent => {
  // In a real application, these would be translated via i18next keys
  // For this example, we'll keep them in English as placeholders.
  const articles: Record<string, ArticleContent> = {
    bmi: {
      introduction: "Body Mass Index (BMI) is a widely used metric to assess whether a person has a healthy body weight for their height. Our BMI calculator provides instant results and comprehensive interpretation of your BMI score.",
      sections: [
        {
          title: "Understanding BMI",
          content: [
            "BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters. This simple calculation provides a standardized way to categorize weight status across different populations.",
            "The World Health Organization (WHO) has established BMI categories that help identify potential health risks associated with being underweight, normal weight, overweight, or obese.",
            "While BMI is a useful screening tool, it's important to understand its limitations and consider other factors when assessing overall health."
          ]
        },
        {
          title: "BMI Categories and Health Implications",
          content: [
            "Underweight (BMI < 18.5): May indicate malnutrition, eating disorders, or other health conditions. Being underweight can increase the risk of osteoporosis, decreased immune function, and fertility issues.",
            "Normal weight (BMI 18.5-24.9): Associated with the lowest risk of weight-related health problems. This range is considered optimal for most adults.",
            "Overweight (BMI 25-29.9): Indicates excess weight that may increase the risk of health problems. People in this category may benefit from lifestyle modifications.",
            "Obese (BMI ≥ 30): Associated with increased risk of serious health conditions including heart disease, diabetes, high blood pressure, and certain cancers."
          ]
        }
      ],
      faq: [
        {
          question: "Is BMI accurate for everyone?",
          answer: "BMI is a useful screening tool for most adults, but it has limitations. It may not be accurate for athletes, pregnant women, elderly individuals, or people with certain medical conditions. Always consult healthcare professionals for personalized health assessment."
        },
        {
          question: "How often should I calculate my BMI?",
          answer: "For most people, calculating BMI once every few months is sufficient unless you're actively trying to lose or gain weight. If you're working with a healthcare provider on weight management, they may recommend more frequent monitoring."
        }
      ]
    },
  };

  const defaultArticle: ArticleContent = {
    introduction: `This comprehensive calculator provides accurate results and helpful insights for your calculations. Our tool is designed to be user-friendly while maintaining professional accuracy and reliability.`,
    sections: [
      {
        title: "How to Use This Calculator",
        content: [
          "Enter the required information in the input fields provided. Make sure all measurements are accurate for the best results.",
          "Review your inputs before clicking the calculate button to ensure accuracy.",
          "The results will be displayed clearly with explanations to help you understand what the numbers mean."
        ]
      },
      {
        title: "Understanding Your Results",
        content: [
          "The calculator provides detailed results with interpretations when applicable.",
          "Results are based on established formulas and scientific research.",
          "Remember that calculators provide estimates and should not replace professional advice when applicable."
        ]
      }
    ],
    faq: [
      {
        question: "How accurate are the calculator results?",
        answer: "Our calculators use established formulas and are designed to provide accurate estimates. However, individual results may vary, and these tools should not replace professional advice when applicable."
      },
      {
        question: "Is it safe to use this calculator?",
        answer: "Yes, our calculators are designed for informational purposes and are safe to use. For medical calculators, always consult with a healthcare professional for advice."
      }
    ]
  };

  return articles[calculatorId] || defaultArticle;
};
