import { locations, tags, titles } from './constants'

function generateCardData({ count = 300 }: { count?: number }) {
  return Array.from({ length: count }, (_, i) => {
    const sleeps = 10 + Math.floor(Math.random() * 10)
    const beds = Math.ceil(sleeps / 2.5)
    const baths = Math.ceil(sleeps / 4)
    const price = 150 + Math.floor(Math.random() * 200)
    const title = `${titles[i % titles.length]} - Sleeps ${sleeps}`

    return {
      title,
      price,
      altText: title,
      images: Array.from(
        { length: 10 },
        (_, j) => `https://picsum.photos/seed/location-${j}${i}/400/300`
      ),
      tag: tags[Math.floor(Math.random() * tags.length)],
      location: locations[i % locations.length],

      map: {
        id: i + 1,
        title: 'The Grand Hideaway - Sleeps 18',
        location: 'Eagle Mountain',
        lat: 33.3 + Math.random() * 0.3,
        lng: -112.15 + Math.random() * 0.3,
        image: `https://picsum.photos/seed/location-${i}/400/300`,
        price: `$${(100 + Math.random() * 900).toFixed(0)}`,
      },

      features: {
        sleeps,
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
