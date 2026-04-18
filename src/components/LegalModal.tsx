import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  onClose: () => void;
}

export function LegalModal({ onClose }: LegalModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1a1a2e] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10"
        >
          <div className="sticky top-0 bg-[#1a1a2e] border-b border-white/10 px-8 py-5 flex items-center justify-between z-10">
            <h2 className="text-2xl font-semibold text-[#f5ebe0]">Mentions Légales & Confidentialité</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} className="text-[#94a3b8]" />
            </button>
          </div>

          <div className="p-8 lg:p-12 prose prose-invert max-w-none text-[#94a3b8]">
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">1. Édition du site</h3>
            <p>Tojo Nambinina – Développeur Full-Stack & Motion Designer</p>
            <p>Madagascar</p>
            <p>Contact : tojo.devpro@gmail.com</p>

            <h3 className="text-xl font-semibold text-white mt-10 mb-4">2. Hébergement</h3>
            <p>Ce site est hébergé par Vercel Inc.</p>

            <h3 className="text-xl font-semibold text-white mt-10 mb-4">3. Propriété intellectuelle</h3>
            <p>Tous les contenus (textes, images, vidéos, code, design) présents sur ce site sont la propriété exclusive de Tojo Nambinina.</p>
            <p>Toute reproduction ou utilisation sans autorisation est interdite.</p>

            <h3 className="text-xl font-semibold text-white mt-10 mb-4">4. Politique de Confidentialité</h3>
            <p>Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à vos demandes.</p>
            <p>Elles ne sont ni vendues, ni partagées avec des tiers.</p>

            <p className="text-sm text-[#64748b] mt-12">
              Dernière mise à jour : Avril 2025
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}