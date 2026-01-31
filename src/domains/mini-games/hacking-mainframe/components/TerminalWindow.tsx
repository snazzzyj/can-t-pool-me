import React from 'react';

interface TerminalWindowProps {
  commandText: string;
  typedIndex: number;
  errorIndex: number | null;
  shake: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ 
  commandText, 
  typedIndex, 
  errorIndex, 
  shake 
}) => {
  return (
    <div className={`relative w-full max-w-2xl mx-auto transition-transform duration-100 ${shake ? 'animate-shake' : ''}`}>
      {/* Laptop Frame Mockup */}
      <div className="bg-gray-800 p-4 rounded-t-xl border-t-8 border-x-8 border-gray-700 shadow-2xl">
        <div className="bg-black p-6 rounded border-2 border-gray-900 h-64 font-mono text-xl overflow-hidden shadow-inner relative">
          {/* Scan lines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_0%,rgba(18,16,16,1)_50%,transparent_100%)] bg-[length:100%_4px]" />
          
          <div className="text-green-500 mb-2 font-bold tracking-tight">hackerman@mainframe:~$</div>
          
          <div className="relative break-all leading-relaxed tracking-wider">
            {commandText.split('').map((char, i) => {
              let color = 'text-green-900'; // Untyped
              if (i < typedIndex) {
                color = 'text-white'; // Correctly typed
              } else if (i === errorIndex) {
                color = 'text-red-500 animate-pulse font-bold'; // Error
              } else if (i === typedIndex) {
                color = 'text-green-500'; // Next character
              }
              
              return (
                <span key={i} className={color}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
            
            {/* Blinking Cursor */}
            <span className="inline-block w-3 h-6 bg-green-500 animate-pulse ml-1 align-middle" />
          </div>
        </div>
      </div>
      {/* Laptop Base Stand */}
      <div className="bg-gray-700 h-4 w-full rounded-b-xl border-b-4 border-gray-600 shadow-xl" />
      <div className="w-1/2 h-2 bg-gray-800 mx-auto rounded-b-full opacity-50" />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TerminalWindow;