import { Router } from 'express'
import { getAvailabilityData } from './controller/availability.controller'
import { getExploreData } from './controller/explore.controller'
import { randomInRange } from './utils'

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

router.get('/api/availability', async (req, res) => {
  const result = await getAvailabilityData()
  const resultEntries = Object.entries(result)

  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.limit as string) || 30
  const totalItems = resultEntries.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = resultEntries.slice(startIndex, endIndex)

  const resultObject = Object.fromEntries(paginatedData)

  res.json({
    status: 'ok',
    result: resultObject,
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
  const prices = {
    booking_fee: randomInRange(500, 100),
    cleaning_fee: randomInRange(300, 500),
    damage_protection: 149,
    accommodation_tax: 91.58,
    cleaning_fees_tax: 32.38,
    damage_protection_tax: 13.78,
  }

  res.json({
    result: prices,
    status: 'ok',
  })
})

export default router
