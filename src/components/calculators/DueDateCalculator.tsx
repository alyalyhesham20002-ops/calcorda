import React, { useState } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';

const DueDateCalculator: React.FC = () => {
  const [calculationMethod, setCalculationMethod] = useState('lmp');
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<{
    dueDate: string;
    weeksPregnant: number;
    daysPregnant: number;
    trimester: number;
    conception: string;
    milestones: { week: number; milestone: string; date: string }[];
  } | null>(null);

  const calculateDueDate = () => {
    let startDate: Date;
    
    if (calculationMethod === 'lmp' && lastPeriodDate) {
      startDate = new Date(lastPeriodDate);
      // Add 280 days (40 weeks) to LMP
      const dueDate = new Date(startDate.getTime() + (280 * 24 * 60 * 60 * 1000));
      const conceptionEstimate = new Date(startDate.getTime() + ((cycleLength - 14) * 24 * 60 * 60 * 1000));
      
      calculateResult(dueDate, conceptionEstimate, startDate);
    } else if (calculationMethod === 'conception' && conceptionDate) {
      startDate = new Date(conceptionDate);
      // Add 266 days (38 weeks) to conception
      const dueDate = new Date(startDate.getTime() + (266 * 24 * 60 * 60 * 1000));
      
      calculateResult(dueDate, startDate, startDate);
    }
  };

  const calculateResult = (dueDate: Date, conception: Date, lmpDate: Date) => {
    const today = new Date();
    const timeDiff = today.getTime() - lmpDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);
    const remainingDays = daysDiff % 7;

    const trimester = weeksDiff < 13 ? 1 : weeksDiff < 27 ? 2 : 3;

    const milestones = [
      { week: 4, milestone: 'Missed period', date: '' },
      { week: 6, milestone: 'Heartbeat detectable', date: '' },
      { week: 12, milestone: 'End of first trimester', date: '' },
      { week: 20, milestone: 'Anatomy scan', date: '' },
      { week: 24, milestone: 'Viability milestone', date: '' },
      { week: 27, milestone: 'Start of third trimester', date: '' },
      { week: 36, milestone: 'Baby considered full-term soon', date: '' },
      { week: 40, milestone: 'Due date', date: '' }
    ].map(milestone => {
      const milestoneDate = new Date(lmpDate.getTime() + (milestone.week * 7 * 24 * 60 * 60 * 1000));
      return {
        ...milestone,
        date: milestoneDate.toLocaleDateString()
      };
    });

    setResult({
      dueDate: dueDate.toLocaleDateString(),
      weeksPregnant: Math.max(0, weeksDiff),
      daysPregnant: Math.max(0, remainingDays),
      trimester: Math.max(1, trimester),
      conception: conception.toLocaleDateString(),
      milestones
    });
  };

  const clearForm = () => {
    setLastPeriodDate('');
    setConceptionDate('');
    setCycleLength(28);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Calculation Method</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Calculation Method
            </label>
            <select
              value={calculationMethod}
              onChange={(e) => setCalculationMethod(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lmp">Last Menstrual Period (LMP)</option>
              <option value="conception">Conception Date</option>
            </select>
          </div>

          {calculationMethod === 'lmp' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Day of Last Menstrual Period
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Cycle Length (days)
                </label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  min="21"
                  max="35"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Typical range: 21-35 days</p>
              </div>
            </>
          )}

          {calculationMethod === 'conception' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conception Date
              </label>
              <input
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={calculateDueDate}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Calculate Due Date</span>
            </button>
            <button
              onClick={clearForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Results</h3>
          
          {result ? (
            <div className="space-y-4">
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-pink-900 mb-2">
                    Due Date: {result.dueDate}
                  </div>
                  <div className="text-lg text-pink-800">
                    {result.weeksPregnant} weeks, {result.daysPregnant} days pregnant
                  </div>
                  <div className="text-sm text-pink-700 mt-2">
                    Currently in Trimester {result.trimester}
                  </div>
                </div>

                <div className="border-t border-pink-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-pink-900">Estimated Conception:</span>
                      <div className="text-pink-800">{result.conception}</div>
                    </div>
                    <div>
                      <span className="font-medium text-pink-900">Pregnancy Progress:</span>
                      <div className="text-pink-800">{Math.round((result.weeksPregnant / 40) * 100)}% complete</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Pregnancy Milestones</h4>
                <div className="space-y-3">
                  {result.milestones.map((milestone, index) => {
                    const isUpcoming = result.weeksPregnant < milestone.week;
                    const isCurrent = result.weeksPregnant === milestone.week;
                    return (
                      <div 
                        key={index}
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          isCurrent ? 'bg-blue-100 border border-blue-300' :
                          !isUpcoming ? 'bg-green-50 border border-green-200' :
                          'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            Week {milestone.week}: {milestone.milestone}
                          </div>
                          <div className="text-sm text-gray-600">{milestone.date}</div>
                        </div>
                        <div className="text-xs font-medium">
                          {isCurrent ? (
                            <span className="text-blue-600">This Week</span>
                          ) : !isUpcoming ? (
                            <span className="text-green-600">Completed</span>
                          ) : (
                            <span className="text-gray-500">Upcoming</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500">Enter your information to calculate your due date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DueDateCalculator;
