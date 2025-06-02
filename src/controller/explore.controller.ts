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
