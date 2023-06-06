export const validations = () => {
  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const regexPhone = /^0\d{9}$/
  const nameRules = [
    (v: string) => !!v || 'Tên không được để trống.',
    (v: string) => (v && v.length >= 5) || 'Tên phải có độ dài lớn hoặc bằng 5 kí tự.'
  ]
  const ruleRequired = (name: string) => (v: string | boolean) => !!v || `${name} không được để trống.`
  const ruleEmail = (email: string) => regexEmail.test(email) || 'Email không đúng cú pháp.'
  const ruleBirthDay = [
    (v: string) => (v && new Date().getFullYear() - new Date(v).getFullYear() >= 5) || 'Ngày sinh không phù hợp.'
  ]
  const rulePhone = [
    (v: string) => (v && regexPhone.test(v)) || 'Số điện thoại không phù hợp.'
  ]
  const ruleLength = (name: string, length: number) => (v: string) => (!!v && v.length >= length) || `${name} không phù hợp.`
  const ruleQuantity = [
    (v: number) => (v && v >= 1) || 'Số lượng không được bằng 0.'
  ]
  return {
    nameRules,
    ruleRequired,
    ruleEmail,
    ruleBirthDay,
    rulePhone,
    ruleLength,
    ruleQuantity
  }
}
