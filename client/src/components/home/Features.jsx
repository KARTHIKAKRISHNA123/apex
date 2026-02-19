import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, FileCheck, Maximize2, Download, Layout, GitBranch } from 'lucide-react'
import Title from './Title'

const features = [
  {
    icon: Cpu,
    title: "AI-Powered Writing",
    description: "Generate professional summaries and bullet points instantly using Gemini AI. Tailored to your specific role."
  },
  {
    icon: FileCheck,
    title: "ATS-Optimized",
    description: "Templates designed to pass Applicant Tracking Systems. Clean hierarchy, standard fonts, and machine-readable formats."
  },
  {
    icon: Maximize2,
    title: "Real-time Preview",
    description: "See changes instantly as you type. A split-screen editor that mimics a modern IDE experience."
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Download high-quality, watermark-free PDFs ready for application. No hidden paywalls for basic exports."
  },
  {
    icon: Layout,
    title: "Engineering Templates",
    description: "Minimalist designs inspired by LaTeX and top tech companies. No fluff, just signal."
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Manage multiple versions of your resume for different job applications from a single dashboard."
  }
]

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/5">
      <Icon className="w-6 h-6 text-zinc-100" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
)

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">



      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Title
          title={<>Engineered for <span className="text-zinc-500">Performance</span></>}
          subtitle="Everything you need to build a top-tier resume, minus the distractions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features