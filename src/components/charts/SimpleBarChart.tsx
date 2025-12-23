'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
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
  showLegend?: boolean;
  maxValue?: number;
}

export default function SimpleBarChart({ 
  data, 
  series, 
  xKey, 
  height = 200,
  showLegend = true,
  maxValue = 100 
}: Props) {
  const barWidth = 24;
  const groupGap = 40;
  const barGap = 4;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const chartHeight = height - paddingBottom;
  
  const totalGroupWidth = series.length * barWidth + (series.length - 1) * barGap;
  const chartWidth = paddingLeft + data.length * (totalGroupWidth + groupGap);

  return (
    <div className="w-full">
      <svg 
        viewBox={`0 0 ${chartWidth} ${height}`} 
        className="w-full" 
        style={{ height }}
        role="img"
        aria-label="Bar chart comparing metrics"
      >
        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((val) => (
          <g key={val}>
            <text
              x={paddingLeft - 8}
              y={chartHeight - (val / maxValue) * chartHeight + 4}
              fill="#6B7280"
              fontSize={10}
              textAnchor="end"
            >
              {val}
            </text>
            <line
              x1={paddingLeft}
              y1={chartHeight - (val / maxValue) * chartHeight}
              x2={chartWidth}
              y2={chartHeight - (val / maxValue) * chartHeight}
              stroke="#2D2D2D"
              strokeDasharray="3 3"
            />
          </g>
        ))}

        {/* Bars */}
        {data.map((item, groupIndex) => {
          const groupX = paddingLeft + groupIndex * (totalGroupWidth + groupGap) + groupGap / 2;
          
          return (
            <g key={item[xKey] as string}>
              {series.map((s, seriesIndex) => {
                const value = item[s.key] as number;
                const barHeight = (value / maxValue) * chartHeight;
                const barX = groupX + seriesIndex * (barWidth + barGap);
                const barY = chartHeight - barHeight;

                return (
                  <motion.rect
                    key={s.key}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill={s.color}
                    rx={4}
                    initial={{ height: 0, y: chartHeight }}
                    animate={{ height: barHeight, y: barY }}
                    transition={{ duration: 0.6, delay: groupIndex * 0.1 + seriesIndex * 0.05, ease: 'easeOut' }}
                  />
                );
              })}
              
              {/* X-axis label */}
              <text
                x={groupX + totalGroupWidth / 2}
                y={height - 8}
                fill="#6B7280"
                fontSize={11}
                textAnchor="middle"
              >
                {item[xKey] as string}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className="flex justify-center gap-6 mt-4">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: s.color }}
              />
              <span className="text-pr-muted text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

