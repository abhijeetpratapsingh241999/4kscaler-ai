import React, { useState } from 'react';
import { DocumentDuplicateIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import PageContainer from '../components/layout/PageContainer';

// Code snippets ke liye ek reusable component (isi file mein)
const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="code-block no-scrollbar">
    <code>{children}</code>
  </pre>
);

const ApiAccessPage: React.FC = () => {
  // Component ki states with TypeScript types
  const [apiKey, setApiKey] = useState<string>('sk-***************************');
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Nayi API key generate karne wala function
  const handleGenerateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newKey = 'live_' + Array.from({ length: 32 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('');
      setApiKey(newKey);
      setCopyStatus('New key generated!');
      setIsGenerating(false);
      setTimeout(() => setCopyStatus(''), 2000);
    }, 1000);
  };

  // API key ko clipboard par copy karne wala function
  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopyStatus('Copied to clipboard!');
      setTimeout(() => setCopyStatus(''), 2000);
    }, () => {
      setCopyStatus('Failed to copy.');
      setTimeout(() => setCopyStatus(''), 2000);
    });
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex-shrink-0 mb-8">
        <h1 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-2">API Access & Documentation</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Integrate 4kscaler-ai power into your own applications. 
          <a href="#" className="text-primary-color hover:underline ml-1">Read full documentation</a>
        </p>
      </div>

      {/* API Key Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Your API Key</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input 
            id="api-key-input" 
            type="text" 
            readOnly 
            value={apiKey} 
            className="w-full p-3 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-color outline-none font-mono" 
            aria-label="Your API key"
          />
          <div className="flex w-full sm:w-auto gap-2">
            <button 
              onClick={handleGenerateKey} 
              disabled={isGenerating}
              className="bubble-button text-white font-semibold py-3 px-5 rounded-lg text-sm w-full flex items-center justify-center gap-2 disabled:opacity-70" 
              aria-label="Generate new API key"
            >
              {isGenerating ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : 'Generate'}
            </button>
            <button 
              onClick={handleCopyKey} 
              className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" 
              aria-label="Copy API key to clipboard"
            >
              <DocumentDuplicateIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-sm text-green-500 mt-2 h-4 transition-opacity duration-300" aria-live="polite">
          {copyStatus}
        </p>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">Keep your API key secure. Do not share it publicly.</p>
      </div>

      {/* Usage Statistics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Usage Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-500/10"><p className="text-sm text-blue-400">Requests This Month</p><p className="text-2xl font-bold">1,250</p></div>
          <div className="p-4 rounded-lg bg-green-500/10"><p className="text-sm text-green-400">Quota Remaining</p><p className="text-2xl font-bold">8,750</p></div>
          <div className="p-4 rounded-lg bg-gray-500/10"><p className="text-sm text-gray-400">Plan</p><p className="text-2xl font-bold">Pro</p></div>
        </div>
      </div>

      {/* Code Examples Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Code Examples</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">cURL</h3>
            <CodeBlock>
{`curl -X POST https://api.4kscaler.ai/v1/upscale \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-F "video=@/path/to/your/video.mp4" \\
-F "resolution=4k"`}
            </CodeBlock>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Python</h3>
            <CodeBlock>
{`import requests

api_key = "YOUR_API_KEY"
video_path = "/path/to/your/video.mp4"
url = "https://api.4kscaler.ai/v1/upscale"

headers = {"Authorization": f"Bearer {api_key}"}
files = {"video": open(video_path, "rb")}
data = {"resolution": "4k"}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.json())`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ApiAccessPage;
