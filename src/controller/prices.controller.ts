import { randomInRange } from '@/utils'

export async function getPrices() {
  return {
    booking_fee: randomInRange(500, 100),
    cleaning_fee: randomInRange(300, 500),
    damage_protection: 149,
    accommodation_tax: 91.58,
    cleaning_fees_tax: 32.38,
    damage_protection_tax: 13.78,
  }
}
