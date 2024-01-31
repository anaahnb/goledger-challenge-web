import React from 'react';

interface ButtonProps {
  onClick?: () => void; 
  text: string; 
  type?: 'primary' | 'secondary'; 
}

export default function Button({ onClick, text, type = 'primary' }: ButtonProps) {
  const buttonClasses = `rounded-sm px-5 py-4 text-lg font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${type === 'primary' ? 'orange' : 'black'}-600`;

  return (
    <div className="mt-10">
      <button
        onClick={onClick}
        className={`${type === 'primary' ? 'bg-orange-700' : 'bg-zinc-900'} text-center text-white ${buttonClasses} hover:bg-${type === 'primary' ? 'orange' : 'black'}-600`}
      >
        {text}
      </button>
    </div>
  );
}
