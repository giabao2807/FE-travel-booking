export const convertionType = () => {
  const formatCurrency = (item: number) => {
    return item.toLocaleString('vi', { style : 'currency', currency : 'VND' })
  }
  const deCodeHtml = (html: string) => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  return {
    formatCurrency,
    deCodeHtml
  }
}