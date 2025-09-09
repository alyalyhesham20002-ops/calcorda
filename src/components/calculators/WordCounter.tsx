import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const words = text.match(/\b\w+\b/g)?.length || 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0;
  const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={10} className="w-full p-3 border rounded-lg" placeholder="Type or paste your text here..."></textarea>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div className="bg-gray-100 p-3 rounded-lg"><div className="font-bold text-xl">{words}</div><div className="text-sm">Words</div></div>
        <div className="bg-gray-100 p-3 rounded-lg"><div className="font-bold text-xl">{chars}</div><div className="text-sm">Characters</div></div>
        <div className="bg-gray-100 p-3 rounded-lg"><div className="font-bold text-xl">{charsNoSpace}</div><div className="text-sm">Chars (no space)</div></div>
        <div className="bg-gray-100 p-3 rounded-lg"><div className="font-bold text-xl">{sentences}</div><div className="text-sm">Sentences</div></div>
        <div className="bg-gray-100 p-3 rounded-lg"><div className="font-bold text-xl">{paragraphs}</div><div className="text-sm">Paragraphs</div></div>
      </div>
    </div>
  );
};

export default WordCounter;
