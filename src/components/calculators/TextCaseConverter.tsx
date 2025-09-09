import React, { useState } from 'react';
import { Copy, Trash2, Check, CaseUpper, CaseLower, Pilcrow, Type } from 'lucide-react';

const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const toSentenceCase = () => {
    if (!text) return;
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
  };
  const toTitleCase = () => {
    if (!text) return;
    setText(text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
  };

  const copyToClipboard = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard API failed, falling back to execCommand.', err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (execErr) {
        console.error('Fallback copy command failed.', execErr);
        alert('Failed to copy text. Please copy it manually.');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={10}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition"
        placeholder="Type or paste your text here..."
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button onClick={() => setText(text.toUpperCase())} className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50" disabled={!text}>
          <CaseUpper className="h-5 w-5" />
          <span>UPPER CASE</span>
        </button>
        <button onClick={() => setText(text.toLowerCase())} className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50" disabled={!text}>
          <CaseLower className="h-5 w-5" />
          <span>lower case</span>
        </button>
        <button onClick={toSentenceCase} className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50" disabled={!text}>
          <Pilcrow className="h-5 w-5" />
          <span>Sentence case</span>
        </button>
        <button onClick={toTitleCase} className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50" disabled={!text}>
          <Type className="h-5 w-5" />
          <span>Title Case</span>
        </button>
      </div>
      <div className="flex space-x-3 pt-2">
        <button 
          onClick={copyToClipboard} 
          className={`flex-1 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={!text}
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
        </button>
        <button 
          onClick={() => setText('')} 
          className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!text}
        >
          <Trash2 className="h-5 w-5" />
          <span>Clear Text</span>
        </button>
      </div>
    </div>
  );
};

export default TextCaseConverter;
