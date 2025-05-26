import { Router } from 'express'
import { getAvailabilityData } from './controller/availability.controller'
import { getExploreData } from './controller/explore.controller'

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

router.get('/api/check-price', async (req, res) => {
  const prices = {
    cleaning_fee: 350,
    damage_protection: 149,
    booking_fee: 59.4,
    accommodation_tax: 91.58,
    cleaning_fees_tax: 32.38,
    damage_protection_tax: 13.78,
  }

  const fees = {
    rent: {
      amount: 360,
      label: '3 nights @ $120/night',
    },

    fees: [
      {
        label: 'Booking Fee',
        amount: prices.booking_fee,
      },
      {
        label: 'Damage Protection',
        amount: prices.damage_protection,
      },
    ],

    taxes: [
      {
        label: "Cleaning fee's tax",
        amount: prices.cleaning_fees_tax,
      },
      {
        label: "Damage Protection 's tax",
        amount: prices.damage_protection_tax,
      },
    ],
  }

  res.json({
    result: { fees, prices },
    status: 'ok',
  })
})

export default router
