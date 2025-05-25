export async function getAvailabilityData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const data = []
  const startDate = new Date()
  for (let i = 0; i < 500; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    data.push({
      date: date.toISOString().slice(0, 10),
      price: 500 + (i % 10) * 25,
      min_stay: 1 + (i % 3),
      available: i % 2,
      checkin: 1 + (i % 2),
      checkout: 1 + ((i + 1) % 2),
    })
  }
  return data
}
