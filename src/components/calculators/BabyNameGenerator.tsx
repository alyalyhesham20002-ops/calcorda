import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { RefreshCw } from 'lucide-react';

const BabyNameGenerator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female' | undefined>(undefined);
  const [names, setNames] = useState<string[]>([]);

  const generateNames = () => {
    const newNames = Array.from({ length: 10 }, () => faker.person.firstName(gender));
    setNames(newNames);
  };
  
  React.useEffect(generateNames, [gender]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select value={gender || ''} onChange={(e) => setGender(e.target.value as 'male' | 'female' || undefined)} className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg">
          <option value="">Any Gender</option>
          <option value="male">Boy</option>
          <option value="female">Girl</option>
        </select>
        <button onClick={generateNames} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><RefreshCw className="h-5 w-5" /><span>Generate New Names</span></button>
      </div>
      {names.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {names.map((name, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <p className="font-semibold text-gray-800">{name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Select a gender and generate names.</p></div>
      )}
    </div>
  );
};

export default BabyNameGenerator;
