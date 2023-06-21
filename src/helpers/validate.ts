/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

export const validations = () => {
  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const regexPhone = /^0\d{9}$/
  const nameRules = [
    (v: string) => !!v || 'Tên không được để trống.',
    (v: string) => (v && v.length >= 3) || 'Tên phải lớn hoặc bằng 3 kí tự.'
  ]
  const ruleRequired = (name: string) => (v: string | boolean) => !!v || `${name} không được để trống.`
  const ruleEmail = (email: string) => regexEmail.test(email) || 'Email không đúng cú pháp.'
  const ruleConfirmPassword = (pass: string, confirmPass?: string) => pass === confirmPass || 'Confirm password không giống password.'
  const ruleBirthDay = [
    (v: string) => (v && new Date().getFullYear() - new Date(v).getFullYear() >= 5) || 'Ngày sinh không phù hợp.'
  ]
  const rulePhone = [
    (v: string) => (v && regexPhone.test(v)) || 'Số điện thoại không phù hợp.'
  ]
  const ruleLength = (name: string, length: number) => (v: string) => (!!v && v.length >= length) || `${name} không được bé hơn ${length} kí tự.`
  const ruleQuantity = [
    (v: number) => (v && v >= 1) || 'Số lượng không được bé hơn 1.'
  ]
  const ruleMaxQuantity = (quantity: number) => (v: number) => (!!v && v <= quantity) || `Số lượng không được lớn hơn ${quantity}.`
  const checkMultiTours = (rule: any, value: number, callback: any) => {
    return _.isEmpty(value) ?
      callback(new Error('Danh sách tours không được bỏ trống.'))
      :
      callback()
  }
  const checkMultiHotels = (rule: any, value: number, callback: any) => {
    return _.isEmpty(value) ?
      callback(new Error('Danh sách hotels không được bỏ trống.'))
      :
      callback()
  }
  const checkQuantity = (rule: any, value: number, callback: any) => {
    return value < 1 ?
      callback(new Error('Số lượng phải lớn hơn bằng 1.'))
      :
      callback()
  }
  const checkPhone = (rule: any, value: string, callback: any) => {
    return regexPhone.test(value) ?
      callback()
      :
      callback(new Error('Số điện thoại không đúng.'))
  }
  const checkEmail = (rule: any, value: string, callback: any) => {
    return regexEmail.test(value) ?
      callback()
      :
      callback(new Error('Email không đúng cú pháp.'))
  }
  const checkBed = (rule: any, value: number, callback: any) => {
    return value < 1 ?
      callback(new Error('Số lượng giường phải lớn hơn bằng 1.'))
      :
      callback()
  }
  const checkAdult = (rule: any, value: number, callback: any) => {
    return value < 1 ?
      callback(new Error('Số lượng người phải lớn hơn bằng 1.'))
      :
      callback()
  }
  const checkChildren = (rule: any, value: number, callback: any) => {
    return value < 1 ?
      callback(new Error('Số lượng trẻ phải lớn hơn bằng 1.'))
      :
      callback()
  }
  const checkSquare = (rule: any, value: number, callback: any) => {
    return value < 1 ?
      callback(new Error('Diện tích phải lớn hơn bằng 1.'))
      :
      callback()
  }
  const checkTimes = (rule: any, value: number, callback: any) => {
    return _.isEmpty(value) ?
      callback(new Error('Thời gian không được bỏ trống.'))
      :
      callback()
  }
  const checkListImage = (rule: any, value: number, callback: any) => {
    return _.isEmpty(value) ?
      callback(new Error('Hình ảnh không được bỏ trống.'))
      :
      callback()
  }
  const checkPercent = (rule: any, value: number, callback: any) => {
    return value < 1 ?
      callback(new Error('Phần trăm giảm phải lớn hơn bằng 1%.'))
      :
      callback()
  }
  const checkCash = (rule: any, value: number, callback: any) => {
    return value < 1000 ?
      callback(new Error('Giá tiền không được thấp hơn 1.000.'))
      :
      callback()
  }
  const checkLength = (rule: any, value: string, callback: any) => {
    return value.length < 10 ?
      callback(new Error('Nội dung phải lớn hơn 10 kí tự.'))
      :
      callback()
  }
  const checkName = (rule: any, value: string, callback: any) => {
    if (!value) {
      return callback(new Error('Tên không được bỏ trống.'))
    }
    if (value.length <= 3) {
      return callback(new Error('Độ dài tên lớn hơn 3 ký tự'))
    } else {
      return callback()
    }
  }
  const checkCoverImage = (rule: any, value: string, callback: any) => {
    !value ? callback(new Error('Ảnh đại diện không được bỏ trống.')) : callback()
  }
  const checkAddress = (rule: any, value: string, callback: any) => {
    !value ? callback(new Error('Địa chỉ không được bỏ trống.')) : callback()
  }
  const checkCity = (rule: any, value: string, callback: any) => {
    !value ? callback(new Error('Điểm đến không được bỏ trống.')) : callback()
  }
  const checkDeparture = (rule: any, value: string, callback: any) => {
    !value ? callback(new Error('Điểm khởi hành không được bỏ trống.')) : callback()
  }
  const checkTraffics = (rule: any, value: string, callback: any) => {
    !value ? callback(new Error('Phương tiện di chuyển không được bỏ trống.')) : callback()
  }
  const checkDay = (rule: any, value: number, callback: any) => {
    if (!value) {
      return callback(new Error('Ngày không được bỏ trống.'))
    }
    else {
      if (value < 1) {
        return callback(new Error('Ngày chọn không phù hợp.'))
      } else {
        return callback()
      }
    }
  }
  return {
    nameRules,
    ruleRequired,
    ruleEmail,
    ruleBirthDay,
    rulePhone,
    ruleLength,
    ruleQuantity,
    ruleConfirmPassword,
    ruleMaxQuantity,
    checkQuantity,
    checkListImage,
    checkTimes,
    checkMultiTours,
    checkMultiHotels,
    checkPercent,
    checkBed,
    checkSquare,
    checkAdult,
    checkChildren,
    checkCash,
    checkAddress,
    checkLength,
    checkName,
    checkCoverImage,
    checkCity,
    checkDeparture,
    checkTraffics,
    checkDay,
    checkEmail,
    checkPhone
  }
}
