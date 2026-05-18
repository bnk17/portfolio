import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALES } from '@/lib/i18n';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher({
  className = '',
}: {
  className?: string;
}) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale =
    LOCALES.find((l) => i18n.language.startsWith(l.code)) || LOCALES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-white/50 px-3 py-1.5 text-[13px] font-medium transition-all hover:border-zinc-200 hover:bg-white hover:text-blue-600 active:scale-95"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Languages size={14} />
        <span className="text-zinc-600 uppercase">{currentLocale.code}</span>
        <ChevronDown
          size={12}
          className={`text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="absolute right-0 z-50 mt-2 min-w-[140px] origin-top-right overflow-hidden rounded-xl border border-zinc-100 bg-white p-1 shadow-lg ring-1 ring-black/5"
          >
            {LOCALES.map((locale) => {
              const isActive = i18n.language.startsWith(locale.code);
              return (
                <button
                  key={locale.code}
                  onClick={() => {
                    i18n.changeLanguage(locale.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors ${
                    isActive
                      ? 'bg-zinc-50 font-semibold text-black'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                  }`}
                >
                  <span>{locale.label}</span>
                  {isActive && <Check size={14} className="text-blue-500" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
