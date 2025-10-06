export type Destination = {
  id: string;
  title: string;
  region: string;
  heroImage: string;
  summary: string;
  highlights: string[];
  travelTips: string[];
  bestTime: string;
  climate: string;
  gallery: string[];
};

export const destinations: Destination[] = [
  {
    id: 'kyoto',
    title: 'Kyoto, Japan',
    region: 'Asia',
    heroImage:
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1600&q=80',
    summary:
      'Ancient temples, zen gardens, and lantern-lit alleyways meet modern craft coffee and design in Kyoto.',
    highlights: [
      'Catch the first light over the 10,000 vermilion gates of Fushimi Inari Shrine.',
      'Float down the Katsura River on a boat cruise beneath autumn foliage in Arashiyama.',
      'Sip matcha alongside artisans in the traditional teahouses of the Gion district.',
    ],
    travelTips: [
      'Reserve kaiseki dining spots weeks ahead—intimate counters seat only a handful each evening.',
      'Purchase a daily bus pass; Kyoto’s network is dense and more convenient than subways.',
      'Carry a light shawl or cardigan—temple interiors can feel cool even in summer.',
    ],
    bestTime: 'Late March–April for cherry blossoms or October–November for fiery foliage.',
    climate: 'Humid subtropical; warm summers, cool winters with occasional snowfall.',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1479705879471-5afa17c6806c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'santorini',
    title: 'Santorini, Greece',
    region: 'Europe',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    summary:
      'Sunset-drenched cliffside villages, cobalt-domed chapels, and volcanic beaches define this Cycladic gem.',
    highlights: [
      'Toast the sunset in Oia from a rooftop terrace overlooking the caldera.',
      'Explore the Bronze Age ruins of Akrotiri, preserved in volcanic ash.',
      'Sail to the crater’s hot springs for a therapeutic dip in mineral-rich waters.',
    ],
    travelTips: [
      'Stay in Imerovigli for panoramic views without Oia’s crowds.',
      'Book winery tastings by noon to avoid the afternoon winds.',
      'Pack reef-safe sunscreen—the island is committed to marine conservation.',
    ],
    bestTime: 'May–June and September–October for mild weather and fewer cruise ships.',
    climate: 'Mediterranean; dry, warm summers and mild winters with occasional rain.',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'patagonia',
    title: 'Patagonia, Chile & Argentina',
    region: 'South America',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    summary:
      'Glacier-fed lakes, jagged peaks, and endless steppe meet in one of the planet’s wildest frontiers.',
    highlights: [
      'Trek the famed W Circuit in Torres del Paine National Park.',
      'Cruise past calving walls of the Perito Moreno Glacier.',
      'Ride horseback with gauchos across windswept estancias.',
    ],
    travelTips: [
      'Pack for four seasons—even summer days can swing from sun to sleet.',
      'Pre-book refugio huts months in advance; they sell out fast in peak season.',
      'Carry cash for remote fuel stations and park entrances.',
    ],
    bestTime: 'November–March for long daylight hours and accessible trails.',
    climate: 'Cool temperate; expect powerful winds and rapid weather shifts year-round.',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549640376-1955c0fbea0d?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

