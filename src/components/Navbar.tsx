import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full border-b border-zinc-100/50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-8 min-[990px]:px-16">
        {/* Optional Logo/Name */}
        <NavLink
          to="/"
          className="font-display text-xl font-bold tracking-tight"
        >
          Boris.
        </NavLink>

        {/* Navigation Items */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[13px] font-medium transition-colors hover:text-black ${
                isActive ? 'font-semibold text-black' : 'text-zinc-400'
              }`
            }
          >
            {t('nav.home')}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-[13px] font-medium transition-colors hover:text-black ${
                isActive ? 'font-semibold text-black' : 'text-zinc-400'
              }`
            }
          >
            {t('nav.about')}
          </NavLink>

          <div className="ml-4 border-l border-zinc-100 pl-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
