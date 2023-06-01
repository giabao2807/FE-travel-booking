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
    return COMMENTRATE[3]
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

  const formatDate = (dateString: string) => {
    const date = moment(dateString).format('DD/MM/YYYY')
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
  return {
    formatCurrency,
    deCodeHtml,
    voteText,
    getPriceDiscount,
    minDate,
    rangePrice,
    getTraffic,
    formatDate,
    getIconStatus,
    getIconHuman,
    checkColorTag
  }
}