'use client';

import React from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroHeadline } from './HeroHeadline';
import { HeroScrollSequence } from './HeroScrollSequence';
import { HeroCTA } from './HeroCTA';
import { HeroIndicators } from './HeroIndicators';
import { AppConfig } from '@/config/app';
import { motion } from 'framer-motion';
import { staggerChildren, fadeUp } from '@/lib/motion/variants';

interface HeroProps {
  onExploreProjects: () => void;
  onContact: () => void;
}

export function Hero({ onExploreProjects, onContact }: HeroProps) {
  return (
    <section 
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-16 px-4 overflow-hidden border-b border-zinc-900"
      aria-label="Welcome Hero Section"
    >
      <HeroBackground />

      <motion.div 
        className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-8 z-10"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="w-full text-center">
          <HeroScrollSequence />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full">
          <HeroHeadline 
            title={AppConfig.legalName}
            subtitle="COMPUTER SCIENCE ENGINEERING STUDENT"
            description={AppConfig.tagline}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full text-center">
          <HeroCTA 
            onExploreProjects={onExploreProjects} 
            onContact={onContact} 
          />
        </motion.div>
      </motion.div>

      <HeroIndicators />
    </section>
  );
}
