import type { ChangeEvent } from 'react';

type Props = {
  id: string,
  label: string,
  placeholder: string,
  value?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
  containerClassName?: string,
  className?: string,
}

export default function FormInput ({
  id, label, placeholder, value, onChange, required, containerClassName, className,
}: Props) {
  return (
    <label
      htmlFor={id}
      className={`block mb-2 text-sm font-medium text-gray-300 ${containerClassName}`}
    >
      {label}
      <input
        type="text"
        id={id}
        className={`border text-sm rounded-lg block w-full mt-2 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}
