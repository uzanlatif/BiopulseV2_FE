"use client";

import React, { useMemo } from "react";

interface StatusCardsProps {
  counts: {
    all: number;
    critical: number;
    warning: number;
    normal: number;
  };
  compactView: boolean;
  toggleCompactView: () => void;
  elapsedTime: string;
  onRestartServer: () => void;
  bpmValue?: Record<string, number | null>;
}

const cardStyle =
  "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]";
const labelStyle = "text-base text-gray-400 font-semibold";
const valueStyle = "text-5xl font-bold text-white";

const StatusCards: React.FC<StatusCardsProps> = ({
  counts,
  compactView,
  toggleCompactView,
  elapsedTime,
  onRestartServer,
  bpmValue,
}) => {
  // 🧠 Generate list like: ["ECG: 79 bpm", "PPG: 82 bpm"]
  const bpmList = useMemo(() => {
    if (!bpmValue) return [];
    return Object.entries(bpmValue)
      .filter(([_, val]) => typeof val === "number" && val !== null)
      .map(([key, val]) => `${key}: ${val} bpm`);
  }, [bpmValue]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
      {/* Selected Sensors */}
      <div className={cardStyle}>
        <div>
          <p className={labelStyle}>Selected Sensors</p>
          <p className={valueStyle}>{counts.all}</p>
        </div>
      </div>

      {/* Recording Time */}
      <div className={cardStyle}>
        <div>
          <p className={labelStyle}>Recording Time</p>
          <p className="text-2xl text-white font-mono mt-1">
            {elapsedTime !== "00:00:00" ? elapsedTime : "--:--:--"}
          </p>
        </div>
      </div>

      {/* BPM per Channel */}
      <div className={cardStyle}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <p className={labelStyle}>BPM per Channel</p>
            <div className="mt-3 space-y-1 text-sm font-mono text-gray-200">
              {bpmList.length > 0 ? (
                bpmList.map((line, idx) => (
                  <p key={idx} className="truncate">{line}</p>
                ))
              ) : (
                <p className="italic text-gray-400">-- No BPM --</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Mode */}
      <div className={cardStyle}>
        <div className="flex flex-col h-full justify-between">
          <p className={labelStyle}>View Mode</p>
          <button
            className="mt-4 text-base font-semibold px-5 py-2.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 shadow-md hover:shadow-lg ring-1 ring-gray-500 transition-all duration-300"
            onClick={toggleCompactView}
          >
            {compactView ? "🔎 Expand View" : "📊 Compact View"}
          </button>
        </div>
      </div>

      {/* Restart Server */}
      <div className={cardStyle}>
        <div className="flex flex-col h-full justify-between">
          <p className={labelStyle}>Server</p>
          <button
            className="mt-4 text-base font-semibold px-5 py-2.5 rounded-lg bg-blue-800 text-white hover:bg-blue-600 shadow-md hover:shadow-lg ring-1 ring-blue-400 transition-all duration-300"
            onClick={onRestartServer}
          >
            🔁 Restart Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
