import { randomInRange } from '@/utils'
import { exitCode } from 'node:process'

export function checkCoupon(input: string) {
  if (input === 'SAVE20') {
    return {
      valid: true,
      discount: 20,
      message: 'Coupon applied successfully! You saved $20.',
    }
  }

  return {
    valid: false,
    discount: 0,
    message: 'Invalid coupon code. Please try again.',
  }
}

export function getPrices() {
  return {
    booking_fee: randomInRange(500, 100),
    cleaning_fee: randomInRange(300, 500),
    damage_protection: 149,
    accommodation_tax: 91.58,
    cleaning_fees_tax: 32.38,
    damage_protection_tax: 13.78,
  }
}
