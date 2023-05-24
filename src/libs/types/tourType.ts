import { ICoupon } from './commonType'

export type ITour = {
  id: string,
  name: string,
  descriptions: string,
  coverPicture: string,
  totalDays: string,
  languageTour: string,
  price: number,
  rate: number,
  numReview: number,
  city: number,
  departure: string,
  traffics: string[],
  couponData: ICoupon
}

export type IResponseTour = {
  pageSize: number,
  pageNumber: number,
  count: number,
  results: ITour[]
}

export type IDetailTour = ITour & {
  createdAt: string,
  updatedAt: string,
  isActive: boolean,
  groupSize: number,
  scheduleContent: string,
  note: string,
  owner: string,
  listImages: string[]
}