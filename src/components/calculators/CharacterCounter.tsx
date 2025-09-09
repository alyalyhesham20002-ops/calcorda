import React, { useState } from 'react';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const twitterLimit = 280;
  const chars = text.length;
  const remaining = twitterLimit - chars;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={10} className="w-full p-3 border rounded-lg" placeholder="Type or paste your text here..."></textarea>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-100 p-3 rounded-lg"><div className="font-bold text-xl">{chars}</div><div className="text-sm">Characters</div></div>
        <div className={`p-3 rounded-lg ${remaining < 0 ? 'bg-red-100' : 'bg-blue-100'}`}>
          <div className={`font-bold text-xl ${remaining < 0 ? 'text-red-700' : 'text-blue-700'}`}>{remaining}</div>
          <div className={`text-sm ${remaining < 0 ? 'text-red-600' : 'text-blue-600'}`}>Remaining for Twitter</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCounter;
