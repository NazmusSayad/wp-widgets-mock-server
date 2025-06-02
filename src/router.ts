import { Router } from 'express'
import { getAvailabilityData } from './controller/availability.controller'
import { getExploreData } from './controller/explore.controller'
import { randomInRange } from './utils'
import { getPrices } from './controller/prices.controller'

const router = Router()

router.get('/api/explore', async (req, res) => {
  const result = await getExploreData()
  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.limit as string) || 30
  const totalItems = result.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = result.slice(startIndex, endIndex)

  console.log(req.query)
  /*
  {
    pets: 'true',
    adults: '1',
    children: '0',
    sort_by: 'By Name (A-Z)',
    price_range_to: '12180',
    price_range_from: '150',
    search_query: '',
    place_cabin: 'false',
    place_condo: 'false',
    amenity_firePit: 'false',
    amenity_jacuzzi: 'false',
    amenity_poolTable: 'false',
    amenity_familyFriendly: 'false',
    amenity_kitchenIsland: 'false',
    amenity_garden: 'false',
    amenity_allowsChildren: 'false',
    amenity_outdoorKitchen: 'false'
  }
  */

  res.json({
    status: 'ok',
    result: paginatedData,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  })
})

router.get('/api/check-price', async (req, res) => {
  const prices = await getPrices()

  res.json({
    result: prices,
    status: 'ok',
  })
})

router.get('/api/availability', async (req, res) => {
  const result = await getAvailabilityData()
  const resultEntries = Object.entries(result)

  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.limit as string) || 30
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = resultEntries.slice(startIndex, endIndex)

  res.json(Object.fromEntries(paginatedData))
})

export default router
