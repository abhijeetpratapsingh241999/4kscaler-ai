// Prompt data ke liye TypeScript type
export type Prompt = {
  id: number;
  promptText: string;
  tags: ('Cinematic' | 'Vintage' | 'Sci-Fi' | 'Wedding' | 'Travel')[];
  previewImageUrl: string;
};

// Placeholder prompt data
export const prompts: Prompt[] = [
  {
    id: 1,
    promptText: 'A moody, cinematic teal and orange look, high contrast, subtle film grain.',
    tags: ['Cinematic', 'Travel'],
    previewImageUrl: 'https://placehold.co/600x400/1a1a1a/f97316?text=Teal+%26+Orange',
  },
  {
    id: 2,
    promptText: 'Classic 1970s film look, warm sepia tones, soft focus, visible film grain, and light leaks.',
    tags: ['Vintage'],
    previewImageUrl: 'https://placehold.co/600x400/1a1a1a/a16207?text=Vintage+Look',
  },
  {
    id: 3,
    promptText: 'Futuristic Blade Runner aesthetic, neon blues and pinks, high contrast, reflective surfaces, atmospheric haze.',
    tags: ['Sci-Fi', 'Cinematic'],
    previewImageUrl: 'https://placehold.co/600x400/1a1a1a/d946ef?text=Sci-Fi+Neon',
  },
  {
    id: 4,
    promptText: 'Light and airy wedding video look, soft pastels, slightly overexposed, creamy skin tones, romantic feel.',
    tags: ['Wedding'],
    previewImageUrl: 'https://placehold.co/600x400/1a1a1a/fbcfe8?text=Wedding+Pastel',
  },
  {
    id: 5,
    promptText: 'Vibrant and saturated travel vlog style, deep blue skies, lush greens, sharp and clean look.',
    tags: ['Travel'],
    previewImageUrl: 'https://placehold.co/600x400/1a1a1a/22c55e?text=Travel+Vlog',
  },
  {
    id: 6,
    promptText: 'Desaturated, gritty look with high contrast, cool tones, perfect for dramatic or action scenes.',
    tags: ['Cinematic'],
    previewImageUrl: 'https://placehold.co/600x400/1a1a1a/64748b?text=Gritty+Action',
  },
];
