'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Phone, MessageSquare, FileText, Database } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { ProblemSlideData } from '@/lib/types';

interface Props {
  data: ProblemSlideData;
  isActive: boolean;
}

const channelIcons = [
  <Phone key="1" className="w-5 h-5" />,
  <MessageSquare key="2" className="w-5 h-5" />,
  <FileText key="3" className="w-5 h-5" />,
  <Database key="4" className="w-5 h-5" />,
];

export default function ProblemSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-pr-charcoal/88" />
      
      {/* Additional effects */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-red-950/20" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-500/10 to-transparent" />
      
      {/* Floating accent */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-6"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="text-red-400 text-sm font-bold tracking-wider uppercase">
            {language === 'es' ? 'El Problema' : 'The Problem'}
          </span>
        </motion.div>

        {/* Main content: 2 columns */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT: Headline + bullets */}
          <div className="space-y-6">
            {/* Big 80% number */}
            <motion.div variants={itemVariants} className="flex items-baseline gap-4">
              <span className="text-8xl md:text-9xl font-display font-black text-red-500 leading-none">
                80%
              </span>
              <div className="text-pr-muted text-sm uppercase tracking-wider leading-tight">
                {language === 'es' ? 'de la data\nse pierde' : 'of data\nis lost'}
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-pr-white leading-tight">
              {content.headline.replace('80%', '').replace('80% ', '').trim()}
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-3 pt-2">
              {content.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-pr-dark/40 border border-pr-gray/20 hover:border-red-500/30 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <p className="text-pr-white/90 text-base leading-relaxed pt-1">{bullet}</p>
                </div>
              ))}
            </motion.div>

            {/* Metaphor callout */}
            <motion.div variants={itemVariants} className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-300 text-sm italic">
                {language === 'es' 
                  ? '"Es como un teléfono descompuesto gigante — pero con millones de pesos en juego."'
                  : '"It\'s like a giant game of telephone — but with millions at stake."'}
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Pie Chart with legend */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-pr-dark/60 border border-pr-gray/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-pr-white font-bold text-lg mb-2 text-center">
                {content.chart_title}
              </h3>
              <p className="text-pr-muted text-sm mb-4 text-center">
                {language === 'es' ? 'Distribución de pérdida de información' : 'Information loss distribution'}
              </p>
              
              <div className="h-[260px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.chart_data}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {data.chart_data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">80%</div>
                    <div className="text-xs text-pr-muted">{language === 'es' ? 'perdido' : 'lost'}</div>
                  </div>
                </div>
              </div>

              {/* Custom legend */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {data.chart_data.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-pr-charcoal/50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      <span style={{ color: item.color }}>{channelIcons[i]}</span>
                    </div>
                    <div>
                      <div className="text-pr-white text-sm font-medium">{item.value}%</div>
                      <div className="text-pr-muted text-xs">{item.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Caption */}
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
