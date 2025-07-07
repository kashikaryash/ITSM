import React, { useState, useEffect } from 'react';
import FormValidation from './FormValidation';

// DynamicForm.jsx - Main form component
const DynamicForm = ({ 
  schema, 
  initialData = {}, 
  onSubmit, 
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  disabled = false,
  showCancelButton = false
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Validate field on blur if it's been touched
    const field = schema[fieldName];
    if (field && field.validations) {
      const fieldErrors = FormValidation.validate(formData[fieldName], field.validations);
      if (fieldErrors.length > 0) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: fieldErrors
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const { isValid, errors: validationErrors } = FormValidation.validateForm(formData, schema);
    
    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.values(schema).map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          error={touched[field.name] ? errors[field.name] : null}
          disabled={disabled || isSubmitting}
        />
      ))}

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={disabled || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </button>
        
        {showCancelButton && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
          >
            {cancelText}
          </button>
        )}
      </div>
    </form>
  );
};
export default DynamicForm;