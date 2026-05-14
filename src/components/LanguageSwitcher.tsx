import { useTranslation } from 'react-i18next';
import { LOCALES } from '@/lib/i18n';

export default function LanguageSwitcher({
  className = '',
}: {
  className?: string;
}) {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      aria-label="Language switcher"
    >
      {LOCALES.map((locale, idx) => (
        <span key={locale.code} className="flex items-center">
          {idx > 0 && (
            <span className="mx-1 text-xs" style={{ color: '#d6d3d1' }}>
              |
            </span>
          )}
          <button
            onClick={() => i18n.changeLanguage(locale.code)}
            className="rounded px-1.5 py-0.5 text-sm font-bold transition-all active:scale-95"
            style={{
              color: i18n.language.startsWith(locale.code)
                ? 'var(--color-brand)'
                : '#a8a29e',
            }}
            aria-current={
              i18n.language.startsWith(locale.code) ? 'true' : undefined
            }
          >
            {locale.code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
