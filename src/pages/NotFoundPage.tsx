import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '@/core/seo/SeoHead';
import { Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="404 — Page Not Found"
        description="The requested page route does not exist."
        slug="/404"
      />

      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center px-6">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center max-w-lg">
          {/* Giant 404 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold leading-none select-none mb-6"
            style={{ fontSize: 'clamp(7rem, 20vw, 14rem)', color: 'rgba(99,102,241,0.12)' }}
            aria-hidden="true"
          >
            404
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 -mt-8"
          >
            <h1 className="font-display font-extrabold text-content-primary" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              Page Not Found
            </h1>
            <p className="font-body text-content-secondary text-sm leading-relaxed max-w-sm mx-auto">
              The route you're looking for doesn't exist or has been moved. Try navigating back home.
            </p>

            <div className="flex items-center justify-center gap-4 pt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-body font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-content-secondary hover:text-content-primary hover:border-white/20 font-body text-sm transition-all group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
