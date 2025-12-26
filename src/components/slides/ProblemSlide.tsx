'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/lib/language-context';
import type { ProblemSlideData } from '@/lib/types';

interface Props {
  data: ProblemSlideData;
  isActive: boolean;
}

export default function ProblemSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Main content: 2 columns */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Headline + 3 bullets */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-pr-white leading-[1.1]">
                <span className="text-red-500">80%</span> {content.headline.replace('80%', '').replace('80% ', '')}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {content.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-red-500" />
                  <p className="text-pr-white/90 text-lg leading-relaxed">{bullet}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Pie Chart */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-pr-dark/60 border border-pr-gray/30 rounded-2xl p-6">
              <h3 className="text-pr-white font-semibold text-lg mb-4 text-center">
                {content.chart_title}
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.chart_data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                      labelLine={false}
                    >
                      {data.chart_data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value: string) => (
                        <span className="text-pr-white/80 text-sm">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Caption under chart */}
              <p className="text-pr-muted text-xs text-center mt-4 italic">
                {content.chart_caption}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
