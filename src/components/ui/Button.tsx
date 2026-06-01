import { ReactNode, ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href?: string } & ComponentPropsWithoutRef<'a'>)
    | ({ href?: never } & ComponentPropsWithoutRef<'button'>)
  );

export function Button({
  children,
  variant = 'outline',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'group inline-flex items-center cursor-pointer justify-center gap-2 rounded-full transition-all duration-200 active:scale-95 font-medium';

  const variants = {
    primary:
      'border border-zinc-200 bg-white px-5 py-2.5 text-sm text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white',
    secondary:
      'border border-zinc-100 bg-white/50 px-4 py-2 text-[13px] text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-black',
    outline:
      'border border-zinc-200 bg-transparent px-4 py-2 text-[13px] text-zinc-500 hover:border-zinc-900 hover:text-zinc-900',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        {...(props as ComponentPropsWithoutRef<'a'>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as ComponentPropsWithoutRef<'button'>)}
    >
      {children}
    </button>
  );
}
