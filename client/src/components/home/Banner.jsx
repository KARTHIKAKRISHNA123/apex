import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Banner = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">

      {/* Background Gradient - transparent so particles show through */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
        >
          Stop sending resumes <br />
          <span className="text-zinc-500">that get ignored.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto"
        >
          Join thousands of engineers building ATS-proof resumes with Apex.
          Free to start, no credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Build My Resume
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default Banner