import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  const variantClass = variant === 'secondary' ? 'btn btn-secondary' : 'btn';
  return <button className={`${variantClass} ${className}`.trim()} {...rest} />;
}

export default Button;
