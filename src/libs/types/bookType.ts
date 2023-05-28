export type IItemTour = {
  tourId: string,
  quantity: number
}
export type IBookingTour = {
  bookingItems: IItemTour[],
  note: string,
  startDate: string,
  type: number,
  bankCode: string
}
export type IItemHotel = {
  roomId: string,
  quantity: number
}
export type IBookingHotel = {
  bookingItems: IItemHotel[],
  note: string,
  startDate: string,
  endDate: string,
  type: number,
  bankCode: string
}