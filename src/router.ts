import { Router } from 'express'
import { getAvailabilityData } from './controller/availability.controller'
import { getExploreData } from './controller/explore.controller'

const router = Router()

router.use('/api/explore', async (req, res) => {
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

router.use('/api/availability', async (req, res) => {
  const result = await getAvailabilityData()
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

export default router
