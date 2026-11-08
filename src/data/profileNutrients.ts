/** Density points and grams per 100 g, used only for the five-axis profile. */
export interface ProfileDensity {
  fiber: number;
  healthyFat: number;
  vitamin: number;
  mineral: number;
}

export const PROFILE_PER_100G: Record<string, ProfileDensity> = {
  rice: { fiber: 0.4, healthyFat: 0.2, vitamin: 2, mineral: 4 },
  grains: { fiber: 3.2, healthyFat: 0.3, vitamin: 8, mineral: 12 },
  bread: { fiber: 7, healthyFat: 2, vitamin: 6, mineral: 18 },
  "red-meat": { fiber: 0, healthyFat: 3, vitamin: 6, mineral: 12 },
  poultry: { fiber: 0, healthyFat: 2, vitamin: 4, mineral: 8 },
  fish: { fiber: 0, healthyFat: 1.6, vitamin: 14, mineral: 16 },
  eggs: { fiber: 0, healthyFat: 5, vitamin: 18, mineral: 10 },
  soy: { fiber: 2, healthyFat: 2.5, vitamin: 5, mineral: 14 },
  greens: { fiber: 2.8, healthyFat: 0.1, vitamin: 40, mineral: 22 },
  fruit: { fiber: 2.4, healthyFat: 0.1, vitamin: 18, mineral: 8 },
  oil: { fiber: 0, healthyFat: 85, vitamin: 8, mineral: 0 },
  nuts: { fiber: 8, healthyFat: 42, vitamin: 6, mineral: 20 },
  chips: { fiber: 3, healthyFat: 6, vitamin: 1, mineral: 4 },
  cola: { fiber: 0, healthyFat: 0, vitamin: 0, mineral: 1 },
  bubble: { fiber: 0.4, healthyFat: 1, vitamin: 1, mineral: 2 },
  cake: { fiber: 1, healthyFat: 4, vitamin: 2, mineral: 4 },
  chocolate: { fiber: 6, healthyFat: 12, vitamin: 2, mineral: 8 },
  fried: { fiber: 1.5, healthyFat: 4, vitamin: 2, mineral: 6 },
};
