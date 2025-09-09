import React, { useState } from 'react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const dob = new Date(birthDate);
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 3600 * 24));
    setResult({ years, months, days, totalDays });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Enter Your Date of Birth</h3>
          <div><input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <button onClick={calculateAge} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg">Calculate Age</button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Age</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center">
                <span className="text-5xl font-bold">{result.years}</span><span className="text-xl"> years</span>
              </div>
              <div className="text-center text-gray-600">{result.months} months, {result.days} days</div>
              <div className="text-center text-sm text-gray-500 mt-4">Or {result.totalDays.toLocaleString()} days old</div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Enter your DOB to find out your age.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
