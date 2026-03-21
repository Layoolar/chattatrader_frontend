import React, { useState } from 'react';
import { useField } from 'formik';

interface FormInputProps {
  label: string;
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<FormInputProps> = ({
  label,
  id,
  required = false,
  type = 'text',
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className='mb-4 w-full'>
      <label
        htmlFor={id || props.name}
        className='block text-[#324054] font-[500] text-[18px] mb-2'
      >
        {label}
      </label>
      <div className='relative'>
        <input
          {...props}
          {...field}
          id={id || props.name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          className={`w-full h-[45px] border rounded-[8px] px-3 pr-10 focus:outline-none focus:ring-2 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-[#32405466] focus:ring-[#0487E2]'
          }`}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600'
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default Input;