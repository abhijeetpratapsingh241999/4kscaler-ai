import React, { useState } from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';

// उपलब्ध स्टाइल टैग्स
const styleTags = ['Cinematic', 'Sad', '80s', 'Neon', 'Warm', 'Cool', 'Vintage', 'Rainy', 'Happy', 'Futuristic'];

const PromptMixer: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag].slice(0, 3) // यूज़र को अधिकतम 3 टैग चुनने की अनुमति दें
    );
  };

  const handleGenerate = () => {
    if (selectedTags.length === 0) {
      alert('Please select at least one tag.');
      return;
    }
    setIsGenerating(true);
    setGeneratedPrompts([]);

    // AI (LLM) कॉल को सिमुलेट कर रहे हैं
    setTimeout(() => {
      const examplePrompts = [
        `A ${selectedTags.join(', ')} look, focusing on deep shadows and high contrast to evoke a powerful emotion.`,
        `Evoke a sense of nostalgia with a ${selectedTags.join(', ')} color palette, soft focus, and subtle film grain.`,
        `Create a vibrant, energetic scene using ${selectedTags.join(', ')} tones, sharp details, and dynamic lighting.`,
      ];
      setGeneratedPrompts(examplePrompts);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bubble-button text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2"
      >
        <SparklesIcon className="w-5 h-5" />
        AI Prompt Mixer
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-container-dark p-6 rounded-lg shadow-2xl w-full max-w-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">AI Prompt Mixer</h2>
            <p className="text-text-secondary-dark mb-6">Select up to 3 styles, and let our AI create a unique prompt for you.</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {styleTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-700 text-slate-200 hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || selectedTags.length === 0}
              className="w-full bubble-button text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="gemini-btn-loader"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  <span>Generate Prompts</span>
                </>
              )}
            </button>

            {generatedPrompts.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-white">Generated Prompts:</h3>
                {generatedPrompts.map((prompt, index) => (
                  <div key={index} className="bg-black p-3 rounded-md text-sm text-gray-300">
                    {prompt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PromptMixer;
