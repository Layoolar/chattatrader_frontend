import React, { useState } from 'react';
import { useField } from 'formik';

interface FormInputProps {
  label: string;
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<FormInputProps> = ({ label, id, value, onChange, onBlur, required = false,  type = 'text', ...props }) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e); 
    if (onChange) onChange(e); 
  };

   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e); 
    if (onBlur) onBlur(e); 
  };

  return (
    <div className="mb-4 w-full">
      <label htmlFor={id || props.name} className="block text-[#324054] font-[500] text-[18px] mb-2">
        {label}
      </label>
       <div className="relative">
         <input
        {...field}
        {...props}
        id={id || props.name}
        type={inputType}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={`w-full h-[45px] border rounded-[8px] px-3 pr-10 focus:outline-none focus:ring-2 ${
          meta.touched && meta.error
            ? 'border-red-500 focus:ring-red-400'
            : 'border-[#32405466] focus:ring-[#0487E2]'
        }`}
      />
      {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
      )}
    </div>
      
    </div>
  );
};

export default Input;
