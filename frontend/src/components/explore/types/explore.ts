// src/components/explore/types/explore.ts

/**
 * Har video card ke data ka structure define karta hai.
 * Ismein ab sorting ke liye 'createdAt' aur 'popularity' bhi shaamil hai.
 */
export type VideoCardData = {
  originalVideoUrl: string;
  id: number;
  title: string;
  category: string;
  tags: string[];
  featuresUsed: string[];
  prompt?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  videoUrl: string;
  createdAt: number; // Sorting ke liye (JavaScript timestamp)
  popularity: number; // Sorting ke liye (e.g., views or likes)
  user?: {
    name: string;
    avatar: string;
  };
};
