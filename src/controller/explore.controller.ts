import { randomInRange } from '@/utils'
import { locations, tags, titles } from '../constants'
import { randomUUID } from 'node:crypto'

function generateCardData({ count = 300 }: { count?: number }) {
  return Array.from({ length: count }, (_, i) => {
    const guests = 10 + Math.floor(Math.random() * 10)
    const beds = Math.ceil(guests / 2.5)
    const baths = Math.ceil(guests / 4)
    const price = 150 + Math.floor(Math.random() * 200)
    const title = `${titles[i % titles.length]} - Sleeps ${guests}`
    const location = locations[i % locations.length]
    const images = Array.from(
      { length: 10 },
      (_, j) => `https://picsum.photos/seed/location-${j}${i}/400/300`
    )

    return {
      id: randomUUID(),

      title,
      price,
      images,
      altText: title,
      tag: tags[Math.floor(Math.random() * tags.length)],
      location,

      map: {
        id: i + 1,
        title: title,
        location: location,
        price: price,
        image: images[0],
        lat: 33.3 + Math.random() * 0.3,
        lng: -112.15 + Math.random() * 0.3,
      },

      features: {
        guests,
        beds,
        baths,
      },
    }
  })
}

export async function getExploreData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return generateCardData({ count: 1000 })
}

export async function getExploreMetaData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    placeTypes: ['Cabin', 'Condo', 'House', 'Apartment'],
    priceRange: {
      min: randomInRange(50, 1000),
      max: randomInRange(1000, 10000),
    },
    amenities: [
      'Pool',
      'Wi-Fi',
      'Kitchen',
      'Hot Tub',
      'Fireplace',
      'Air Conditioning',
      'Pets Allowed',
      'Family Friendly',
      'Parking',
      'BBQ Grill',
      'Washer',
      'Dryer',
      'Gym',
      'Outdoor Kitchen',
      'Garden',
      'Kitchen Island',
      'Pool Table',
      'Allows Children',
      'Outdoor Dining',
      'Smart TV',
      'Coffee Maker',
      'Heating',
      'Essentials',
      'Hangers',
      'Iron',
      'Hair Dryer',
      'Shampoo',
      'Towels',
      'Toiletries',
      'Microwave',
      'Refrigerator',
      'Oven',
      'Stove',
      'Dishwasher',
      'Cooking Basics',
      'Dishes and Silverware',
      'Free Parking on Premises',
      'Free Street Parking',
      'Long Term Stays Allowed',
      'Self Check-In',
      'Lockbox',
      'Private Entrance',
      'Hot Water',
    ],
    location: {
      cities: [...new Set(locations)].map((city, index) => {
        const generateCityDescription = (cityName: string, index: number) => {
          const descriptors = [
            'charming',
            'picturesque',
            'stunning',
            'beautiful',
            'scenic',
            'peaceful',
            'vibrant',
          ]
          const settings = [
            'mountain retreat',
            'lakeside haven',
            'forest sanctuary',
            'countryside escape',
            'nature paradise',
            'outdoor adventure hub',
            'tranquil getaway',
          ]
          const activities = [
            'hiking trails',
            'fishing spots',
            'scenic views',
            'outdoor adventures',
            'wildlife watching',
            'nature walks',
            'peaceful relaxation',
          ]

          const descriptor = descriptors[index % descriptors.length]
          const setting = settings[index % settings.length]
          const activity = activities[(index + 1) % activities.length]

          return `A ${descriptor} ${setting} offering excellent ${activity} and unforgettable experiences for visitors seeking the perfect retreat.`
        }

        function generateCityTitle(index: number) {
          const titles = [
            'Hidden Mountain Paradise Retreat',
            'Ultimate Nature Adventure Hub',
            'Scenic Wilderness Escape Town',
            'Peaceful Forest Haven Gateway',
            'Mountain Base Adventure Camp',
            'Wild Outdoor Explorer Paradise',
            'Forest Gateway Nature Sanctuary',
            'Creek Side Adventure Village',
            'Pine Valley Mountain Retreat',
            'Lake View Scenic Hideaway',
            'Sky Ridge Mountain Resort',
            'River Point Nature Lodge',
          ]
          return titles[index % titles.length]
        }

        return {
          id: randomUUID(),
          name: city,
          title: generateCityTitle(index),
          description: generateCityDescription(city, index),
          image: `https://picsum.photos/seed/city-${city
            .toLowerCase()
            .replace(/\s+/g, '-')}/300/200`,
        }
      }),

      countries: [
        'Canada',
        'Mexico',
        'France',
        'United States',
        'United Kingdom',
      ].map((country) => ({
        id: randomUUID(),
        name: country,
        image: `https://picsum.photos/seed/country-${country
          .toLowerCase()
          .replace(/\s+/g, '-')}/300/200`,
      })),
    },
  }
}
