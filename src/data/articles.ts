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

const articles: Record<string, ArticleContent> = {
  bmi: {
    introduction: "Body Mass Index (BMI) is a crucial, universally accepted measurement for determining if your weight is healthy in proportion to your height. It serves as a preliminary screening tool for weight categories that may lead to health problems. Our free online BMI calculator offers a quick, reliable way to check your BMI and understand where you stand on the health spectrum, providing immediate results for adults, men, and women.",
    sections: [
      {
        title: "How is BMI Calculated and What Does It Mean?",
        content: [
          "The formula for BMI is simple: weight in kilograms divided by the square of height in meters (kg/m²). For those using imperial units, the calculation is weight in pounds divided by the square of height in inches, then multiplied by 703. This standardized value allows healthcare professionals to assess weight status across diverse populations. Understanding your BMI is the first step toward achieving a healthy weight.",
          "While it's a powerful indicator, BMI does not directly measure body fat. Consequently, it can sometimes be misleading. For instance, muscular athletes may have a high BMI without being over-fat. Conversely, an older person with low muscle mass might have a normal BMI but a high percentage of body fat. Therefore, it's a starting point for a health assessment, not the final word."
        ]
      },
      {
        title: "Deep Dive into BMI Categories and Health Risks",
        content: [
          "A BMI below 18.5 is classified as Underweight. This can be a sign of malnutrition, an underlying medical condition, or an eating disorder. Health risks associated with being underweight include osteoporosis, a weakened immune system, and fertility problems.",
          "A BMI between 18.5 and 24.9 falls into the Normal or Healthy Weight range. This range is associated with the lowest risk of developing weight-related diseases and is considered optimal for long-term health.",
          "A BMI from 25.0 to 29.9 is categorized as Overweight. Being in this range indicates an increased risk for developing conditions like heart disease, high blood pressure, and type 2 diabetes. Lifestyle changes, such as improved diet and regular exercise, are often recommended.",
          "A BMI of 30.0 or higher is classified as Obese. Obesity is further divided into classes (Class I, II, and III) and is linked to a significantly higher risk of serious health issues, including certain types of cancer, severe heart disease, and stroke. Medical intervention is often necessary."
        ]
      },
      {
        title: "How to Improve Your BMI and Achieve a Healthy Weight",
        content: [
          "If your BMI falls outside the 'Normal' range, there are several steps you can take. For a high BMI, focus on creating a sustainable calorie deficit through a balanced diet rich in whole foods like fruits, vegetables, lean proteins, and whole grains. Incorporating regular physical activity, including both cardiovascular exercise (like walking or cycling) and strength training, is crucial for burning fat and building muscle.",
          "If your BMI is in the underweight category, focus on nutrient-dense foods to ensure you're gaining weight in a healthy manner. Consult with a registered dietitian or healthcare provider to create a personalized plan that suits your body's needs. Remember, gradual changes are more sustainable and effective in the long run."
        ]
      },
      {
        title: "Beyond BMI: A Holistic View of Health",
        content: [
          "Because BMI doesn't tell the whole story, it's vital to consider other health markers. Waist circumference is an important indicator of abdominal fat, which is a key risk factor for heart disease. Other factors include blood pressure, cholesterol levels, blood sugar, and family medical history.",
          "A healthy lifestyle, encompassing a balanced diet, regular physical activity, adequate sleep, and stress management, is far more indicative of overall health than a single number. Use your BMI result as a catalyst to have a more in-depth conversation with your healthcare provider about your personal health."
        ]
      }
    ],
    faq: [
      {
        question: "Is BMI an accurate measure of health for everyone?",
        answer: "BMI is a useful population-level screening tool but has limitations for individuals. It doesn't distinguish between fat and muscle mass, meaning very muscular individuals may be classified as overweight. It's also not the primary tool for children, pregnant women, and the elderly. Always use it as one part of a larger health assessment with a professional."
      },
      {
        question: "How can I calculate my BMI without a calculator?",
        answer: "You can calculate BMI using the formula: BMI = weight (kg) / [height (m)]². For imperial units, it's BMI = (weight (lbs) / [height (in)]²) * 703. Our online tool simplifies this process for you."
      },
      {
        question: "What is a healthy BMI for a woman?",
        answer: "The healthy BMI range of 18.5 to 24.9 is the same for both men and women. Body composition (fat vs. muscle) can differ, but the BMI categories are standardized."
      },
      {
        question: "How often should I check my BMI?",
        answer: "If you are not actively trying to change your weight, checking your BMI every 6 to 12 months is sufficient. If you are on a weight management journey, you might check it monthly to track progress, but focus more on lifestyle changes and how you feel rather than just the number."
      }
    ]
  },
  'due-date': {
    introduction: "Estimating your baby's due date is one of the first and most exciting steps in your pregnancy journey. Our Due Date Calculator uses established methods to provide a reliable estimate, helping you plan for the big arrival. Understanding your timeline is key to scheduling prenatal care and preparing for your new family member.",
    sections: [
        {
            title: "How is a Due Date Calculated?",
            content: [
                "The most common method for calculating a due date is based on the first day of your Last Menstrual Period (LMP). Known as Naegele's rule, this method adds 280 days (or 40 weeks) to your LMP. This assumes a standard 28-day menstrual cycle, with ovulation occurring on day 14.",
                "If you know the exact date of conception (for example, through IVF or ovulation tracking), a more accurate due date can be calculated by adding 266 days (38 weeks). Our calculator supports both methods to provide the best possible estimate for your unique situation."
            ]
        },
        {
            title: "Understanding Pregnancy Trimesters",
            content: [
                "Your pregnancy is divided into three trimesters, each with unique developmental milestones. The First Trimester (Week 1-12) is a period of rapid development where the baby's major organs and body structure form. The Second Trimester (Week 13-26) is often called the 'honeymoon' phase, as many early pregnancy symptoms subside, and you may start to feel the baby move. The Third Trimester (Week 27-40+) is focused on rapid growth and weight gain for the baby as they prepare for birth."
            ]
        },
        {
            title: "What if My Due Date Changes?",
            content: [
                "It's very common for a due date to be adjusted, especially after your first ultrasound. An early ultrasound (typically between 8 and 14 weeks) can measure the baby's size (crown-rump length) and provide a more accurate gestational age. This ultrasound-based due date is often considered the most reliable.",
                "Remember, only about 5% of babies are born on their exact due date. It's more of a 'due week.' A full-term pregnancy can last anywhere from 37 to 42 weeks, so think of your due date as a guideline, not a deadline."
            ]
        }
    ],
    faq: [
        {
            question: "Why is the due date based on my last period, not conception?",
            answer: "Most women know the date of their last period, but the exact date of conception is often unknown. The LMP method provides a standardized starting point for calculating gestational age, even though pregnancy technically begins at conception, about two weeks later."
        },
        {
            question: "How accurate is this due date calculator?",
            answer: "Our calculator provides a reliable estimate based on the information you provide. However, the most accurate dating is typically confirmed by an early ultrasound scan performed by your healthcare provider."
        },
        {
            question: "What does 'weeks pregnant' mean?",
            answer: "Pregnancy is measured in 'gestational weeks' from the first day of your last menstrual period. So, at conception, you are already considered '2 weeks pregnant.' This standardized system helps healthcare providers track development consistently."
        }
    ]
  },
};

export const getArticleContent = (calculatorId: string, t: TFunction): ArticleContent => {
  const defaultArticle: ArticleContent = {
    introduction: t(`calculator_${calculatorId.replace(/-/g, '_')}_desc`, `This comprehensive calculator provides accurate results and helpful insights for your calculations. Our tool is designed to be user-friendly while maintaining professional accuracy and reliability.`),
    sections: [
      {
        title: "How to Use This Calculator",
        content: [
          "Using this tool is straightforward. First, gather the required information, such as your measurements or relevant dates. Enter these values into the designated input fields on the calculator.",
          "Double-check your inputs to ensure they are correct, as accuracy is key to a reliable result. Once you're ready, click the 'Calculate' button.",
          "Your results will be displayed instantly, often accompanied by charts or interpretations to help you understand the figures and what they mean for you."
        ]
      },
      {
        title: "Understanding Your Results",
        content: [
          "The output from our calculators is based on widely accepted formulas and data. We strive to provide not just a number, but also context to help you make sense of it.",
          "For health and fitness calculators, the results can help you understand where you stand in relation to established health guidelines. For general tools, the results are direct computations based on your input.",
          "Remember that all calculators, especially those related to health, provide estimates and should be used for informational purposes. They are not a substitute for professional medical or financial advice."
        ]
      }
    ],
    faq: [
      {
        question: "How accurate are the results from Calcorda calculators?",
        answer: "Our calculators are built using standard, industry-recognized formulas to ensure high accuracy. However, for any health or financial decisions, we strongly recommend consulting with a qualified professional. These tools are for informational purposes."
      },
      {
        question: "Is my data saved when I use a calculator?",
        answer: "No. Your privacy is paramount. All calculations are performed within your browser, and we do not see, store, or share any of the personal data you enter."
      }
    ]
  };

  return articles[calculatorId] || defaultArticle;
};
