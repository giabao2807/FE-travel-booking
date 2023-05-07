export const validations = () => {
  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const nameRules = [
    (v: string) => !!v || 'Tên không được để trống.',
    (v: string) => (v && v.length <= 5) || 'Tên phải có độ dài lớn hoặc bằng 5 kí tự.'
  ]
  const ruleRequired = (name: string) => (v: string | boolean) => !!v || `${name} không được để trống.`
  const ruleEmail = (email: string) => regexEmail.test(email) || 'Email không đúng cú pháp.'
  return {
    nameRules,
    ruleRequired,
    ruleEmail
  }
}
