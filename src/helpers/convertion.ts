import { COMMENTRATE, TRAFFICS, STATUS_ICON } from '@/resources/mockData'
import moment from 'moment'

export const convertionType = () => {
  const formatCurrency = (item = 0) => {
    return item?.toLocaleString('vi', { style : 'currency', currency : 'VND' })
  }
  const deCodeHtml = (tagCut: string, html?: string) => {
    const container = document.createElement('div')
    const arrHtml = []
    container.innerHTML = html ? html : ''
    const decodedHTML = container.querySelector(tagCut)
    const sectionHeader = decodedHTML?.outerHTML
    decodedHTML ? container.removeChild(decodedHTML) : ''
    arrHtml.push(sectionHeader, container.outerHTML)
    return arrHtml
  }
  const deCode = (text: string) => {
    const container = document.createElement('div')
    return container.innerHTML = text ? text : ''
  }
  const voteText = (rate = 0) => {
    if (rate > 4.5) {
      return COMMENTRATE[0]
    }
    else if (rate >= 4) {
      return COMMENTRATE[1]
    }
    else if (rate >= 3) {
      return COMMENTRATE[2]
    }
    else if (rate === null) {
      return COMMENTRATE[3]
    }
    return COMMENTRATE[4]
  }
  const getPriceDiscount = (price = 0, coupon = 0) => {
    return price - (price * (coupon / 100))
  }
  const minDate = (date: Date) => date.toISOString().slice(0, 10)
  const rangePrice = (min: number, max: number, coupon = 0) => {
    const minPriceCoupon = getPriceDiscount(min, coupon)
    const maxPriceCoupon = getPriceDiscount(max, coupon)
    return `${formatCurrency(minPriceCoupon)} - ${formatCurrency(maxPriceCoupon)}`
  }

  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))

  const formatDate = (dateString?: string, type = 'DD/MM/YYYY') => {
    const date = moment(dateString).format(type)
    return date
  }
  const getIconStatus = (status: string) => {
    const item = STATUS_ICON.find(item => item.value === status.toLowerCase())
    return item?.icon
  }

  const getIconHuman = (quantity: number) => {
    return quantity < 2 ? 'mdi-account-outline' : 'mdi-account-multiple-outline'
  }
  const checkColorTag = (status: string) => {
    const item = STATUS_ICON.find(item => item.value === status.toLowerCase())
    return item?.color
  }
  const convertObjectToFormData = (object: Record<string, any>): FormData => {
    const formData = new FormData()
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        formData.append(key, object[key])
      }
    }
    return formData
  }
  return {
    formatCurrency,
    deCode,
    deCodeHtml,
    voteText,
    getPriceDiscount,
    minDate,
    rangePrice,
    getTraffic,
    formatDate,
    getIconStatus,
    getIconHuman,
    checkColorTag,
    convertObjectToFormData
  }
}