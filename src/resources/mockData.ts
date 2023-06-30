export const GENDER_DATA = [{ value: 1, name: 'Male' }, { value: 2, name: 'FeMale' }, { value: 3, name: 'Other' }]
export const TRAFFICS = [
  { value: 'o_to', icon: 'mdi-car', name: 'Ô tô' },
  { value: 'tau_thuy', icon: 'mdi-ferry', name: 'Tàu thuỷ' },
  { value: 'may_bay', icon: 'mdi-airplane', name: 'Máy bay' }
]
export const COMMENTRATE = [
  { icon: 'mdi-heart-multiple-outline', name: 'Tuyệt vời' },
  { icon: 'mdi-heart-plus-outline', name:  'Ấn Tượng' },
  { icon: 'mdi-like-outline', name:  'Bình Thường' },
  { icon: 'mdi-star-outline', name:  'Chưa được vote' },
  { icon: 'mdi-emoticon-sad-outline', name:  'Tệ' }
]
export const PANEL_IMAGE = [
  { col: 8 },
  { col: 4 },
  { col: 4 },
  { col: 4 },
  { col: 4 }
]

export const SEARCH_FOR = ['Tours', 'Hotels']
export const HEADER_TAB = [
  { value: 0, name: 'Tours' },
  { value: 1, name: 'Hotels' },
  { value: 2, name: 'Booking' },
  { value: 3, name: 'Favorite' }
]

export const BANK = [
  { value: 'NCB', name: 'NCB', image: require('@/assets/img/banks/ncb.png') },
  { value: 'AGRIBANK', name: 'Agribank', image: require('@/assets/img/banks/agribank.png') },
  { value: 'SCB', name: 'SCB', image: require('@/assets/img/banks/scb.png') },
  { value: 'SACOMBANK', name: 'SacomBank', image: require('@/assets/img/banks/sacombank.png') },
  { value: 'EXIMBANK', name: 'EximBank', image: require('@/assets/img/banks/eximbank.png') },
  { value: 'MSBANK', name: 'MSBANK', image: require('@/assets/img/banks/msb.png') },
  { value: 'NAMABANK', name: 'NamABank', image: require('@/assets/img/banks/namabank.png') },
  { value: 'VNMART', name: 'VnMart', image: require('@/assets/img/banks/vnmart.png') },
  { value: 'VIETINBANK', name: 'Vietinbank', image: require('@/assets/img/banks/vietinbank.png') },
  { value: 'VIETCOMBANK', name: 'VCB', image: require('@/assets/img/banks/vietcombank.png') },
  { value: 'HDBANK', name: 'HDBank', image: require('@/assets/img/banks/hdbank.png') },
  { value: 'DONGABANK', name: 'Dong A', image: require('@/assets/img/banks/dongabank.png') },
  { value: 'TPBANK', name: 'TPBank', image: require('@/assets/img/banks/tpb.png') },
  { value: 'OJB', name: 'OceanBank', image: require('@/assets/img/banks/oceanbank.png') },
  { value: 'BIDV', name: 'BIDV', image: require('@/assets/img/banks/bidv.png') },
  { value: 'TECHCOMBANK', name: 'Techcombank', image: require('@/assets/img/banks/techcombank.png') },
  { value: 'VPBANK', name: 'VPBank', image: require('@/assets/img/banks/vpbank.png') },
  { value: 'MBBANK', name: 'MBBank', image: require('@/assets/img/banks/mbbank.png') },
  { value: 'ACB', name: 'ACB', image: require('@/assets/img/banks/acb.png') },
  { value: 'OCB', name: 'OCB', image: require('@/assets/img/banks/ocb.png') },
  { value: 'IVB', name: 'IVB', image: require('@/assets/img/banks/indovinabank.png') },
  { value: 'VISA', name:  'VISA/MASTER', image: require('@/assets/img/banks/visa.jpg') }
]

export const STEP_BOOK = ['mdi-cube-scan', 'mdi-credit-card-outline', 'mdi-cloud-check-variant']
export const STATUS_ICON = [
  { color: 'warning', icon: 'mdi-map-marker-alert-outline', value: 'unpaid', name: 'Unpaid' },
  { color: 'info', icon: 'mdi-cash-check', value: 'paid', name: 'Paid' },
  { color: 'error', icon: 'mdi-close-box-multiple-outline', value: 'canceled', name: 'Canceled' },
  { color: 'success', icon: 'mdi-bookmark-check-outline', value: 'completed', name: 'Completed' }
]
export const MENU_PARTNER = [
  { name: 'Dashboard', icon: 'mdi-view-dashboard-outline', value: 'partner' },
  { name: 'Quản Lý Tours', icon: 'mdi-compass-rose', value: 'toursPartner' },
  { name: 'Quản Lý Hotels', icon: 'mdi-shield-home-outline', value: 'hotelsPartner' },
  { name: 'Quản lí Coupons', icon: 'mdi-ticket-percent-outline', value: 'couponsPartner' },
  { name: 'Quản lí Booking', icon: 'mdi-archive-check-outline', value: 'bookingPartner' }
]
export const MENU_ADMIN = [
  { name: 'Dashboard', icon: 'mdi-view-dashboard-outline', value: 'admin' },
  { name: 'Quản Lý Users', icon: 'mdi-card-account-details-outline', value: 'users' },
  { name: 'Quản Lý Tours', icon: 'mdi-compass-rose', value: 'adminTours' },
  { name: 'Quản Lý Hotels', icon: 'mdi-shield-home-outline', value: 'adminHotels' },
  { name: 'Quản lí Coupons', icon: 'mdi-ticket-percent-outline', value: 'couponsAdmin' },
  { name: 'Quản lí Booking', icon: 'mdi-archive-check-outline', value: 'adminBooking' }
]
export const FOOTER_DATA = [
  { name: 'Home', value: 'homepage' },
  { name: 'About Us', value: 'homepage' },
  { name: 'Team', value: 'homepage' },
  { name: 'Services', value: 'homepage' },
  { name: 'Blog', value: 'homepage' },
  { name: 'Contact Us', value: 'homepage' }
]