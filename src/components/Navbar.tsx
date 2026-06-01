import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Combine } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full border-b border-zinc-100/50 bg-zinc-50/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-8 min-[990px]:px-16">
        {/* Optional Logo/Name */}
        <NavLink
          to="/"
          className="group flex items-center gap-2 transition-all active:scale-95"
          aria-label="Home"
        >
          <Combine className="size-6 text-zinc-900 transition-transform duration-300 group-hover:rotate-12 group-hover:text-blue-600" />
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
