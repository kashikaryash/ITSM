import React, { useState } from 'react';

const FormField = ({ field, value, onChange, onBlur, error, disabled = false }) => {
  const [, setFocused] = useState(false);

  const handleChange = (newValue) => {
    onChange(field.name, newValue);
  };

  const handleFocus = () => setFocused(true);
  
  const handleBlur = () => {
    setFocused(false);
    if (onBlur) onBlur(field.name);
  };

  const baseClasses = `w-full px-3 py-2 border rounded-md transition-colors ${
    error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
  } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-200`;

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'url':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            disabled={disabled}
            className={baseClasses}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            disabled={disabled}
            className={baseClasses}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            disabled={disabled}
            className={`${baseClasses} resize-vertical`}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={baseClasses}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={disabled}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className={disabled ? 'text-gray-400' : 'text-gray-700'}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        if (field.options) {
          return (
            <div className="space-y-2">
              {field.options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={Array.isArray(value) ? value.includes(option.value) : false}
                    onChange={(e) => {
                      const currentValue = Array.isArray(value) ? value : [];
                      const newValue = e.target.checked
                        ? [...currentValue, option.value]
                        : currentValue.filter(v => v !== option.value);
                      handleChange(newValue);
                    }}
                    disabled={disabled}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className={disabled ? 'text-gray-400' : 'text-gray-700'}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          );
        } else {
          return (
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => handleChange(e.target.checked)}
                disabled={disabled}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className={disabled ? 'text-gray-400' : 'text-gray-700'}>
                {field.label}
              </span>
            </label>
          );
        }

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={baseClasses}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => handleChange(e.target.files[0])}
            onFocus={handleFocus}
            onBlur={handleBlur}
            accept={field.accept}
            disabled={disabled}
            className={`${baseClasses} file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            disabled={disabled}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      {field.type !== 'checkbox' || field.options ? (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      ) : null}
      
      {renderField()}
      
      {field.helpText && (
        <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{Array.isArray(error) ? error[0] : error}</p>
      )}
    </div>
  );
};
export default FormField;