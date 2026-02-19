import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">

      {/* Background Glow (Local to Hero) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          v1.0 Now Public
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Build your resume <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
            like an engineer.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The professional AI resume builder for developers. <br className="hidden md:block" />
          ATS-friendly templates, Markdown support, and instant PDF export.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
          >
            Build for Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-medium rounded-md border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center justify-center"
          >
            View Templates
          </a>
        </motion.div>

        {/* Features List (Mini) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-500"
        >
          {["No Credit Card Required", "ATS-Optimized PDF", "Open Source"].map((feat) => (
            <div key={feat} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-700" />
              {feat}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero