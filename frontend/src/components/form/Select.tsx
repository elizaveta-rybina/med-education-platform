import { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  label?: string;
  id?: string;
  error?: string;
  loading?: boolean;
  register?: UseFormRegisterReturn;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Выберите...",
  onChange,
  className = "",
  defaultValue = "",
  label,
  id,
  error,
  loading = false,
  register,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    
    if (onChange) {
      onChange(value);
    }
    
    if (register?.onChange) {
      register.onChange(e);
    }
  };

  const selectProps = {
    ...(register || {}),
    onChange: handleChange,
    value: selectedValue,
    id,
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/90"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          disabled={loading}
          className={`h-11 w-full appearance-none rounded-lg border ${
            error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
            selectedValue
              ? "text-gray-800 dark:text-white/90"
              : "text-gray-400 dark:text-gray-400"
          } ${className}`}
          {...selectProps}
        >
          <option
            value=""
            disabled
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {loading ? "Загрузка..." : placeholder}
          </option>
          
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Select;