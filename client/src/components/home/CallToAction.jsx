import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Title from "./Title";

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-white/5 rounded-[100%] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <Title
          title={
            <>
              Your next job starts{" "}
              <span className="text-zinc-500">here.</span>
            </>
          }
          subtitle="Build an ATS-friendly resume in minutes. No design skills needed, no credit card required."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/[0.02] rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/[0.02] rounded-tl-full" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-400 mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Free to get started
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Stop sending resumes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
              that get ignored.
            </span>
          </motion.h3>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/app"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Build for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-medium rounded-md border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center justify-center active:scale-[0.98]"
            >
              View Templates
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-8 text-xs text-zinc-600"
          >
            Trusted by 10,000+ developers at Google, Meta, Amazon & more.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
