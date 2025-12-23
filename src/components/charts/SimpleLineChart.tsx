'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  [key: string]: string | number;
}

interface Series {
  key: string;
  label: string;
  color: string;
}

interface Props {
  data: DataPoint[];
  series: Series[];
  xKey: string;
  height?: number;
  maxValue?: number;
  showDots?: boolean;
  showArea?: boolean;
}

export default function SimpleLineChart({ 
  data, 
  series, 
  xKey, 
  height = 180,
  maxValue = 100,
  showDots = true,
  showArea = true
}: Props) {
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 10;
  const paddingBottom = 30;
  const chartWidth = 400;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const xStep = (chartWidth - paddingLeft - paddingRight) / (data.length - 1);

  const getPath = (seriesKey: string): string => {
    const points = data.map((item, i) => {
      const x = paddingLeft + i * xStep;
      const y = paddingTop + chartHeight - ((item[seriesKey] as number) / maxValue) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    });
    return points.join(' ');
  };

  const getAreaPath = (seriesKey: string): string => {
    const linePath = getPath(seriesKey);
    const lastX = paddingLeft + (data.length - 1) * xStep;
    const firstX = paddingLeft;
    const bottomY = paddingTop + chartHeight;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  return (
    <div className="w-full">
      <svg 
        viewBox={`0 0 ${chartWidth} ${height}`} 
        className="w-full" 
        style={{ height }}
        role="img"
        aria-label="Line chart showing trend"
      >
        {/* Y-axis grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = paddingTop + chartHeight - (val / maxValue) * chartHeight;
          return (
            <g key={val}>
              <text
                x={paddingLeft - 8}
                y={y + 4}
                fill="#6B7280"
                fontSize={10}
                textAnchor="end"
              >
                {val}
              </text>
              <line
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="#2D2D2D"
                strokeDasharray="3 3"
              />
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, i) => (
          <text
            key={i}
            x={paddingLeft + i * xStep}
            y={height - 8}
            fill="#6B7280"
            fontSize={11}
            textAnchor="middle"
          >
            {item[xKey] as string}
          </text>
        ))}

        {/* Lines and areas */}
        {series.map((s) => (
          <g key={s.key}>
            {/* Area fill */}
            {showArea && (
              <motion.path
                d={getAreaPath(s.key)}
                fill={s.color}
                fillOpacity={0.1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
            
            {/* Line */}
            <motion.path
              d={getPath(s.key)}
              stroke={s.color}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Dots */}
            {showDots && data.map((item, i) => {
              const x = paddingLeft + i * xStep;
              const y = paddingTop + chartHeight - ((item[s.key] as number) / maxValue) * chartHeight;
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={5}
                  fill={s.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-3">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: s.color }}
            />
            <span className="text-pr-muted text-xs">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

