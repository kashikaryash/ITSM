import React, { useState } from 'react';
import { Plus, Trash2, Eye, Edit3, Save, X, ChevronDown, ChevronRight } from 'lucide-react';

// FormBuilder.jsx - Visual form builder
const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [formTitle, setFormTitle] = useState('Untitled Form');

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: '📝' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'password', label: 'Password', icon: '🔒' },
    { type: 'number', label: 'Number', icon: '🔢' },
    { type: 'textarea', label: 'Text Area', icon: '📄' },
    { type: 'select', label: 'Select Dropdown', icon: '⬇️' },
    { type: 'radio', label: 'Radio Buttons', icon: '⚪' },
    { type: 'checkbox', label: 'Checkboxes', icon: '☑️' },
    { type: 'date', label: 'Date', icon: '📅' },
    { type: 'file', label: 'File Upload', icon: '📎' }
  ];

  const validationTypes = [
    { type: 'required', label: 'Required', hasValue: false },
    { type: 'minLength', label: 'Min Length', hasValue: true },
    { type: 'maxLength', label: 'Max Length', hasValue: true },
    { type: 'email', label: 'Email Format', hasValue: false },
    { type: 'pattern', label: 'Pattern (Regex)', hasValue: true },
    { type: 'min', label: 'Min Value', hasValue: true },
    { type: 'max', label: 'Max Value', hasValue: true },
    { type: 'phone', label: 'Phone Format', hasValue: false },
    { type: 'url', label: 'URL Format', hasValue: false }
  ];

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      name: `field_${fields.length + 1}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: '',
      required: false,
      validations: [],
      options: type === 'select' || type === 'radio' || (type === 'checkbox' && type !== 'single') 
        ? [{ label: 'Option 1', value: 'option1' }] 
        : undefined
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
  };

  const updateField = (updates) => {
    setFields(fields.map(field => 
      field.id === selectedField.id 
        ? { ...field, ...updates }
        : field
    ));
    setSelectedField({ ...selectedField, ...updates });
  };

  const deleteField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (selectedField && selectedField.id === fieldId) {
      setSelectedField(null);
    }
  };

  const addOption = () => {
    const newOptions = [...(selectedField.options || []), {
      label: `Option ${(selectedField.options?.length || 0) + 1}`,
      value: `option${(selectedField.options?.length || 0) + 1}`
    }];
    updateField({ options: newOptions });
  };

  const updateOption = (index, key, value) => {
    const newOptions = [...selectedField.options];
    newOptions[index] = { ...newOptions[index], [key]: value };
    updateField({ options: newOptions });
  };

  const deleteOption = (index) => {
    const newOptions = selectedField.options.filter((_, i) => i !== index);
    updateField({ options: newOptions });
  };

  const addValidation = (type, hasValue) => {
    const newValidation = { type, value: hasValue ? '' : undefined };
    updateField({ 
      validations: [...(selectedField.validations || []), newValidation] 
    });
  };

  const updateValidation = (index, key, value) => {
    const newValidations = [...selectedField.validations];
    newValidations[index] = { ...newValidations[index], [key]: value };
    updateField({ validations: newValidations });
  };

  const deleteValidation = (index) => {
    const newValidations = selectedField.validations.filter((_, i) => i !== index);
    updateField({ validations: newValidations });
  };

  const generateSchema = () => {
    const schema = {};
    fields.forEach(field => {
      schema[field.name] = field;
    });
    return schema;
  };

  const handlePreviewSubmit = (data) => {
    alert('Form submitted! Check console for data.');
    console.log('Form Data:', data);
  };

  if (previewMode) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{formTitle}</h2>
          <button
            onClick={() => setPreviewMode(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center space-x-2"
          >
            <Edit3 size={16} />
            <span>Edit Form</span>
          </button>
        </div>
        
        {fields.length > 0 ? (
          <DynamicForm
            schema={generateSchema()}
            onSubmit={handlePreviewSubmit}
            submitText="Submit Form"
          />
        ) : (
          <p className="text-gray-500 text-center py-8">No fields added to form yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Field Types */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Field Types</h3>
        <div className="space-y-2">
          {fieldTypes.map((fieldType) => (
            <button
              key={fieldType.type}
              onClick={() => addField(fieldType.type)}
              className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center space-x-2"
            >
              <span>{fieldType.icon}</span>
              <span className="text-sm">{fieldType.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Center Panel - Form Builder */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:bg-white focus:border focus:border-gray-300 focus:rounded px-2 py-1"
              placeholder="Form Title"
            />
            <button
              onClick={() => setPreviewMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 min-h-96">
            {fields.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg mb-2">Start building your form</p>
                <p>Click on field types from the left panel to add them</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={`p-4 border rounded-md cursor-pointer transition-all ${
                      selectedField && selectedField.id === field.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedField(field)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{field.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteField(field.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <FormField
                      field={field}
                      value=""
                      onChange={() => {}}
                      disabled={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Field Properties */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        {selectedField ? (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Field Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field Name
                </label>
                <input
                  type="text"
                  value={selectedField.name}
                  onChange={(e) => updateField({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) => updateField({ label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={selectedField.placeholder || ''}
                  onChange={(e) => updateField({ placeholder: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Options for select, radio, checkbox */}
              {(selectedField.type === 'select' || selectedField.type === 'radio' || (selectedField.type === 'checkbox' && selectedField.options)) && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <button
                      onClick={addOption}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedField.options?.map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => updateOption(index, 'label', e.target.value)}
                          placeholder="Label"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) => updateOption(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => deleteOption(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Validations */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Validations
                  </label>
                  <select
                    onChange={(e) => {
                      const validationType = validationTypes.find(v => v.type === e.target.value);
                      if (validationType) {
                        addValidation(validationType.type, validationType.hasValue);
                      }
                      e.target.value = '';
                    }}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                    defaultValue=""
                  >
                    <option value="">Add validation</option>
                    {validationTypes.map((validation) => (
                      <option key={validation.type} value={validation.type}>
                        {validation.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  {selectedField.validations?.map((validation, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium flex-1">
                        {validationTypes.find(v => v.type === validation.type)?.label}
                      </span>
                      {validation.value !== undefined && (
                        <input
                          type="text"
                          value={validation.value}
                          onChange={(e) => updateValidation(index, 'value', e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                      <button
                        onClick={() => deleteValidation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 pt-12">
            <p>Select a field to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default FormBuilder;