'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

const ChartFallback = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center h-[300px] border border-dashed border-gray-300 rounded-lg text-gray-500 px-4 text-center"
    >
      <AlertTriangle className="w-6 h-6 mb-2 text-yellow-500 animate-pulse" />
      <p className="text-sm font-medium">
        3일 이상의 통계가 쌓여야 차트를 확인할 수 있어요.
      </p>
    </motion.div>
  );
};

export default ChartFallback;
