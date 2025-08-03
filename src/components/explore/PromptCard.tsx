import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Prompt } from '../../data/promptLibraryData';

type PromptCardProps = {
  prompt: Prompt;
};

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const navigate = useNavigate();

  // "Use This Prompt" button ka handler
  const handleUsePrompt = () => {
    // User ko /upscale page par bhej rahe hain
    // Real application mein, hum is prompt ko state management (Context/Zustand)
    // ke zariye UpscalePage tak pahunchayenge.
    navigate('/upscale');
    alert(`Prompt copied and ready to use on the Upscale page:\n\n"${prompt.promptText}"`);
  };

  return (
    <div className="bg-container-dark rounded-lg overflow-hidden flex flex-col">
      <img 
        src={prompt.previewImageUrl} 
        alt={`Preview for prompt: ${prompt.promptText}`}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-text-secondary-dark text-sm flex-grow">
          {prompt.promptText}
        </p>
        <div className="flex flex-wrap gap-2 my-4">
          {prompt.tags.map(tag => (
            <span key={tag} className="bg-primary-color/20 text-primary-color text-xs font-semibold px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <button 
          onClick={handleUsePrompt}
          className="w-full mt-auto bg-primary-color/80 backdrop-blur-sm text-white font-bold py-2 rounded-lg hover:bg-primary-color transition"
        >
          Use This Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
