// वीडियो डेटा के लिए TypeScript टाइप
export type ShowcaseVideo = {
  [x: string]: any;
  id: number;
  creatorName: string;
  creatorAvatarUrl: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  prompt: string;
  likes: number;
  tags: ('Most Liked' | 'Most Recent' | 'Staff Picks')[];
};

// प्लेसहोल्डर वीडियो डेटा
export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: 1,
    creatorName: '@pixelmaster',
    creatorAvatarUrl: 'https://placehold.co/40x40/8b5cf6/ffffff?text=P',
    beforeImageUrl: 'https://placehold.co/600x400/333/666?text=Before',
    afterImageUrl: 'https://placehold.co/600x400/1a1a1a/f472b6?text=Cyberpunk+After',
    prompt: 'A moody, cinematic teal and orange look, high contrast, subtle film grain, inspired by Blade Runner aesthetics.',
    likes: 12500,
    tags: ['Most Liked', 'Staff Picks'],
  },
  {
    id: 2,
    creatorName: '@naturelens',
    creatorAvatarUrl: 'https://placehold.co/40x40/16a34a/ffffff?text=N',
    beforeImageUrl: 'https://placehold.co/600x400/333/666?text=Before',
    afterImageUrl: 'https://placehold.co/600x400/1a1a1a/3b82f6?text=Nature+After',
    prompt: 'Vibrant and lush greens, deep blue skies, high saturation, sharp focus on details, perfect for nature documentaries.',
    likes: 9800,
    tags: ['Most Liked'],
  },
  {
    id: 3,
    creatorName: '@retroreviver',
    creatorAvatarUrl: 'https://placehold.co/40x40/a16207/ffffff?text=R',
    beforeImageUrl: 'https://placehold.co/600x400/333/666?text=Before',
    afterImageUrl: 'https://placehold.co/600x400/1a1a1a/a16207?text=Vintage+After',
    prompt: 'Classic 1970s film look, warm sepia tones, soft focus, visible film grain, and light leaks for a nostalgic feel.',
    likes: 7500,
    tags: ['Most Recent'],
  },
  {
    id: 4,
    creatorName: '@animemaster',
    creatorAvatarUrl: 'https://placehold.co/40x40/ec4899/ffffff?text=A',
    beforeImageUrl: 'https://placehold.co/600x400/333/666?text=Before',
    afterImageUrl: 'https://placehold.co/600x400/1a1a1a/ec4899?text=Anime+After',
    prompt: 'Bright and punchy anime colors, sharp cel-shaded lines, high contrast, dynamic lighting for action sequences.',
    likes: 21000,
    tags: ['Most Liked', 'Most Recent', 'Staff Picks'],
  },
];
