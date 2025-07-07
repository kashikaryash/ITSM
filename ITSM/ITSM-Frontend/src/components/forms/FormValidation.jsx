// FormValidation.jsx - Validation utilities and rules
const FormValidation = {
  rules: {
    required: (value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== '';
    },
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    minLength: (min) => (value) => value && value.length >= min,
    maxLength: (max) => (value) => value && value.length <= max,
    pattern: (regex) => (value) => regex.test(value),
    min: (min) => (value) => Number(value) >= min,
    max: (max) => (value) => Number(value) <= max,
    phone: (value) => /^\+?[\d\s\-()]+$/.test(value),
    url: (value) => /^https?:\/\/.+\..+/.test(value)
  },

  messages: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: (min) => `Minimum ${min} characters required`,
    maxLength: (max) => `Maximum ${max} characters allowed`,
    pattern: 'Invalid format',
    min: (min) => `Value must be at least ${min}`,
    max: (max) => `Value must be at most ${max}`,
    phone: 'Please enter a valid phone number',
    url: 'Please enter a valid URL'
  },

  validate: (value, validations = []) => {
    const errors = [];
    
    validations.forEach(validation => {
      const { type, value: ruleValue, message } = validation;
      const rule = FormValidation.rules[type];
      
      if (rule) {
        const isValid = ruleValue !== undefined 
          ? rule(ruleValue)(value)
          : rule(value);
          
        if (!isValid) {
          const defaultMessage = typeof FormValidation.messages[type] === 'function'
            ? FormValidation.messages[type](ruleValue)
            : FormValidation.messages[type];
          errors.push(message || defaultMessage);
        }
      }
    });
    
    return errors;
  },

  validateForm: (formData, schema) => {
    const errors = {};
    let isValid = true;

    Object.keys(schema).forEach(fieldName => {
      const field = schema[fieldName];
      const value = formData[fieldName];
      const fieldErrors = FormValidation.validate(value, field.validations);
      
      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
        isValid = false;
      }
    });

    return { isValid, errors };
  }
};
export default FormValidation;