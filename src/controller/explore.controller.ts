import { randomInRange } from '@/utils'
import { locations, tags, titles } from '../constants'

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
      title,
      price,
      altText: title,
      images,
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
      cities: [...new Set(locations)],
      countries: [
        'Canada',
        'Mexico',
        'France',
        'United States',
        'United Kingdom',
      ],
    },
  }
}
