import React, { useState } from 'react';
import { useField } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  isPasswordToggle?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, type = 'text', isPasswordToggle = false, ...props }) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4 w-full">
      <label className="block text-[#324054] font-[500] text-[18px] mb-2">{label}</label>

      <div className="relative">
        <input
          {...field}
          {...props}
          type={inputType}
          className={`w-full h-[45px] border rounded-[8px] px-3 pr-10 focus:outline-none focus:ring-2 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-[#32405466] focus:ring-[#0487E2]'
          }`}
        />

        {isPasswordToggle && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </span>
        )}
      </div>

      {meta.touched && meta.error && (
        <div className="text-sm text-red-600 mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormInput;
