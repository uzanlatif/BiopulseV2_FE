import React from 'react';

interface StatusCardsProps {
  counts: {
    all: number;
    critical: number;
    warning: number;
    normal: number;
  };
}

const StatusCards: React.FC<StatusCardsProps> = ({ counts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {/* All Sensors */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-sm p-6">
        <h3 className="text-gray-300 text-sm font-medium mb-2">Selected Sensors</h3>
        <p className="text-3xl font-bold text-white">{counts.all}</p>
      </div>

      {/* Critical */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-sm p-6">
        <h3 className="text-gray-300 text-sm font-medium mb-2">Critical</h3>
        <p className="text-3xl font-bold text-red-500">{counts.critical}</p>
      </div>

      {/* Warning */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-sm p-6">
        <h3 className="text-gray-300 text-sm font-medium mb-2">Warning</h3>
        <p className="text-3xl font-bold text-yellow-500">{counts.warning}</p>
      </div>

      {/* Normal */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-sm p-6">
        <h3 className="text-gray-300 text-sm font-medium mb-2">Normal</h3>
        <p className="text-3xl font-bold text-green-500">{counts.normal}</p>
      </div>
    </div>
  );
};

export default StatusCards;
