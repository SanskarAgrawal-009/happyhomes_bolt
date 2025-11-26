import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold uppercase tracking-luxury transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 rounded-lg';

  const variants = {
    primary: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-0.5',
    outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-0.5',
    ghost: 'bg-transparent text-gray-600 border-transparent hover:border-gray-200 hover:text-gray-800',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
