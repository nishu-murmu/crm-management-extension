import React, { useState } from 'react';
import useContent from '../hooks/use-content';
import { translate } from '../translation/translation';

const Generate = () => {
  // Define static options for dropdown
  const promptOptions = [
    { id: 1, name: 'Generate Blog Post' },
    { id: 2, name: 'Create Social Media Caption' },
    { id: 3, name: 'Write Product Description' },
    { id: 4, name: 'Draft Email Template' },
  ];

  // State management
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedOption, setSelectedOption] = useState(promptOptions[0].id);
  const [generatedResponse, setGeneratedResponse] = useState('');
  const { generateBlackBoxReport } = useContent();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await generateBlackBoxReport();
    setGeneratedResponse(response);
  };

  return (
    <div className="cp-container cp-mx-auto cp-p-6 cp-flex cp-flex-col cp-h-screen">
      <form onSubmit={handleSubmit} className="cp-space-y-6 cp-flex-1">
        {/* Custom Prompt Textarea */}
        <div>
          <label
            htmlFor="customPrompt"
            className="cp-block cp-text-sm cp-font-medium cp-mb-2"
          >
            {translate('customPrompt')}
          </label>
          <textarea
            id="customPrompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="cp-w-full cp-p-3 cp-border cp-rounded-lg cp-min-h-[120px]"
            placeholder={translate('enterCustomPrompt')}
          />
        </div>

        {/* Dropdown */}
        <div>
          <label
            htmlFor="promptType"
            className="cp-block cp-text-sm cp-font-medium cp-mb-2"
          >
            {translate('selectPromptType')}
          </label>
          <select
            id="promptType"
            value={selectedOption}
            onChange={(e) => setSelectedOption(Number(e.target.value))}
            className="cp-w-full cp-p-3 cp-border cp-rounded-lg"
          >
            {promptOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cp-bg-blue-500 cp-text-white cp-px-6 cp-py-2 cp-rounded-lg cp-hover:cp-bg-blue-600"
        >
          {translate('generate')}
        </button>
      </form>

      {/* Preview Section - Fixed at bottom */}
      <div className="cp-mt-4 cp-border-t cp-pt-4">
        <h2 className="cp-text-lg cp-font-medium cp-mb-3">
          {translate('preview')}
        </h2>
        <div className="cp-p-4 cp-border cp-rounded-lg cp-h-[200px] cp-overflow-y-auto">
          {generatedResponse || translate('generatedContentWillAppear')}
        </div>
      </div>
    </div>
  );
};

export default Generate;
