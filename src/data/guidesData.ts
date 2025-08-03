// Guide data ke liye TypeScript type
export type Guide = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
};

// Placeholder guide data
export const guides: Guide[] = [
  {
    id: 1,
    title: "5 Prompts to Make Your Travel Videos Stunning",
    description: "Learn how to use simple prompts to transform your travel footage from bland to breathtaking. We cover everything from sunsets to cityscapes.",
    thumbnailUrl: "https://placehold.co/600x400/1a1a1a/22c55e?text=Travel+Guide",
    tags: ["Prompts", "Beginner"],
  },
  {
    id: 2,
    title: "How to Get the 'Blade Runner' Neon Look",
    description: "A step-by-step guide to achieving the iconic, moody, neon-drenched aesthetic of Blade Runner using our advanced color grading tools.",
    thumbnailUrl: "https://placehold.co/600x400/1a1a1a/d946ef?text=Blade+Runner",
    tags: ["Cinematic", "Advanced"],
  },
  {
    id: 3,
    title: "Mastering AI Noise Reduction",
    description: "Don't let grainy footage ruin your shot. This guide explains the nuances of our AI noise reduction feature for crystal clear results.",
    thumbnailUrl: "https://placehold.co/600x400/1a1a1a/64748b?text=Noise+Reduction",
    tags: ["Technical", "Intermediate"],
  },
  {
    id: 4,
    title: "Creating the Perfect Wedding Video Vibe",
    description: "Learn the secrets to soft, romantic, and timeless color grades that will make any wedding video feel like a fairytale.",
    thumbnailUrl: "https://placehold.co/600x400/1a1a1a/fbcfe8?text=Wedding+Guide",
    tags: ["Wedding", "Prompts"],
  },
];
