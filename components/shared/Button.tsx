import React from 'react';
import Loading from './Loading';

type Props = {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  error?: boolean;
  color?: 'primary' | 'danger';
  isLoading?: boolean;
}

export default function Button ({
  children,
  type = 'button',
  onClick,
  disabled,
  error,
  color = 'primary',
  isLoading = false,
}: Props) {
  const colors = {
    primary: ['bg-gray-600', 'hover:bg-gray-700', 'focus:bg-gray-700', 'text-white', 'focus:ring-gray-800'],
    danger: ['bg-red-500', 'hover:bg-red-600', 'focus:bg-red-700', 'text-white', 'focus:ring-red-900'],
  };

  const selectedColor = {
    bg: colors[color][0],
    hoverBg: colors[color][1],
    focus: colors[color][2],
    text: colors[color][3],
    ring: colors[color][4],
  };

  return (
    <button
      type={type}
      className={`block w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ${disabled ? 'opacity-40' : ''} ${selectedColor.bg} ${selectedColor.hoverBg} ${selectedColor.text} ${selectedColor.focus} ${selectedColor.ring} focus:outline-none`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {
        isLoading
          ? <Loading className='w-full h-auto' iconSize={20} />
          : children
      }
    </button>
  );
}
