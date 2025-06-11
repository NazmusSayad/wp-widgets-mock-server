import { Router } from 'express'
import { getAvailabilityData } from './controller/availability.controller'
import {
  getExploreData,
  getExploreMetaData,
} from './controller/explore.controller'
import { randomInRange } from './utils'
import { checkCoupon, getPrices } from './controller/prices.controller'

const router = Router()

router.use(async (_, __, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  next()
})

router.get('/api/explore-meta', async (req, res) => {
  res.json({
    status: 'ok',
    result: await getExploreMetaData(),
  })
})

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
    pets: 'false',
    adults: '1',
    children: '0',
    sort_by: 'By Number of Bedrooms (High to Low)',
    date_range_to: '2025-07-09T18:00:00.000Z',
    date_range_from: '2025-06-10T18:00:00.000Z',
    location: 'United Kingdom',
    search_query: 'query',
    price_range_to: '4183',
    price_range_from: '436',
    'place_type[]': ['Condo', 'House', 'Apartment'],
    'amenity[]': [
      'Kitchen',
      'Pool',
      'Fireplace',
      'Wi-Fi',
      'Hot Tub',
      'Air Conditioning',
      'Family Friendly'
    ]
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

router.get('/api/check-coupon', async (req, res) => {
  const result = checkCoupon(String(req.query.coupon))

  if (result.valid) {
    res.json({
      status: 'ok',
      result,
    })
  } else {
    res.status(400).json({
      status: 'error',
      error: result.message,
    })
  }
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
